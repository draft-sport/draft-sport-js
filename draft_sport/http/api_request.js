/* Draft Sport JS - API request class */

if (!GLOBAL_API_ENDPOINT) { throw Error("API endpoint undefined"); }
if (GLOBAL_DEBUG_FLAG !== true && GLOBAL_DEBUG_FLAG !== false) {
     throw Error("Global debug flag undefined"); 
}

class ApiRequest {

    static get _KEY_HEADER() { return 'x-draft-sport-api-key'; }
    static get _SESSION_ID_HEADER() { return 'x-draft-sport-session-id'; }
    static get _JSON_HEADER() { return 'application/json;charset=UTF-8'; }

    static make(
        path,               // String e.g. '/humans'
        method,             // String e.g. 'GET'
        parameters=null,    // Optional<UrlParameters>
        data=null,          // Object e.g. {'hello': 'world' } (optional)
        callback,           // Function(ApiError?, Data?),
        session=null,       // Optional Session (overrides global constants)
        apiEndpoint=null,   // Optional String (overrides GLOBAL_API_ENDPOINT)
        withoutAuth=false,  // Boolean (send request with no authentication)
        optionalAuth=false, // Boolean (send with or without auth)
        suppressError=false // Do not send ErrorReport on failure
    ) {

        const Self = ApiRequest;

        if (!path) { throw Error('Cannot make request to falsy path'); }
        if (['GET', 'UPDATE', 'DELETE', 'POST', 'PUT'].indexOf(method) < 0) {
            throw Error('Method appears invalid: ' + method);
        }

        const request = new XMLHttpRequest();
        if (GLOBAL_DEBUG_FLAG === true) { request.withCredentials = true; }

        const summary = {
            requestData: data ? JSON.stringify(data) : null,
            requestParameters: parameters,
            requestPath: path,
            requestMethod: method,
            suppressError: suppressError
        }

        request.onreadystatechange = () => {
            Self._parseResponse(request, callback, summary);
            return;
        }

        const endpoint = Self._chooseApiEndpoint(apiEndpoint);
        const url = Self._buildUrl(
            path,
            parameters,
            endpoint
        );

        request.open(method, url, true);

        function applyAuth() {
            if (withoutAuth) { return; }
            const apiKey = Self._chooseApiKey(session, optionalAuth);
            const sessionId = Self._chooseSessionId(session, optionalAuth);
            if ((!apiKey || !sessionId) && optionalAuth) { return }
            request.setRequestHeader(Self._SESSION_ID_HEADER, sessionId);
            request.setRequestHeader(Self._KEY_HEADER, apiKey);
            return; 
        }

        applyAuth();

        if (data) {
            request.setRequestHeader('content-type', Self._JSON_HEADER);
            request.send(JSON.stringify(data));
        } else {
            request.send();
        }

        return;

    }

    static _buildUrl(path, parameters, apiEndpoint) {
        const Self = ApiRequest;
        const base = apiEndpoint + path;
        if (parameters) { return base + parameters.query; }
        return base;

    }

    static _parseResponse(request, callback, summary) {

        const state = request.readyState;
        const status = request.status;

        if (state === 4 && status === 200) {
            let result = null;
            try {
                const rawText = request.responseText;
                result = JSON.parse(rawText);
            } catch(error) {
                const decodeError = new ApiResponseDecodingError(
                    request.responseText,
                    error
                );
                callback(decodeError, null);
                return;
            }

            callback(null, result);
            return;

        } else if (state === 4 && status === 404) {

            callback(null, null);

        } else if (state === 4 && status !== 200 ) {

            let errorContent = null;


            try {
                console.log(request.responseText);
                errorContent = JSON.parse(request.responseText);
            } catch (error) {
                const e = new ApiError(
                    status,
                    null,
                    summary
                );
                e.dispatchEvent();
                callback(e, null);
                return
            }

            const error = new ApiError(status, errorContent, summary);
            error.dispatchEvent();
            callback(error, null);
            return;
        }

        return;

    }

    static _chooseApiKey(override, optionalAuth=false) {
        if (override) { return override.apiKey; }
        if (typeof(GLOBAL_API_KEY) !== 'undefined') { return GLOBAL_API_KEY; }
        if (optionalAuth) { return null; }
        throw Error('No API Key available. Define `GLOBAL_API_KEY` in global sc\
ope or supply Session instance to ApiRequest.make()');
    }

    static _chooseSessionId(override, optionalAuth=false) {
        if (override) { return override.sessionId; }
        if (optionalAuth) { return null; }
        if (typeof(GLOBAL_SESSION_ID) !== 'undefined') { 
            return GLOBAL_SESSION_ID;
        }
        throw Error('No Session ID available. Define `GLOBAL_SESSION_ID` in glo\
bal scope or supply Session instance to ApiRequest.make()');
    }

    static _chooseApiEndpoint(override) {
        if (override) { return override; }
        if (typeof(GLOBAL_API_ENDPOINT) !== 'undefined') {
            return GLOBAL_API_ENDPOINT;
        }
        throw Error('No API endpoint available. Define `GLOBAL_API_ENDPOINT in \
global scope or supply String apiEndpoint parameter to ApiRequest.make()');
    }

    static decodeResponse(
        error,      // Error?
        data,       // Object?
        callback,   // Function(Error?, T?)
        outputType  // T<Having .decode(:Object) method>
    ) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        try { result = outputType.decode(data); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
        return;
    }

    static decodeSingle(
        error,      // Error?
        data,       // Object?
        callback,   // Function(Error?, T?)
        outputType  // T<Having .decode(:Object) method>
    ) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        try { result = outputType.decode(data[0]); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
        return;
    }

    static decodeManyInResponse(
        error,      // Error?
        data,       // Array<Object>?
        callback,   // Function(Error?, T?)
        outputType  // T<Having .decode(:Object) method>
    ) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        try { result = data.map((d) => { return outputType.decode(d); }); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
        return;
    }

}
