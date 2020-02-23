/* Draft Sport JS - API request class */

if (!GLOBAL_API_ENDPOINT) { throw Error("API endpoint undefined"); }
if (GLOBAL_DEBUG_FLAG !== true && GLOBAL_DEBUG_FLAG !== false) {
     throw Error("Global debug flag undefined"); 
}


class ApiRequest {

    static get _KEY_HEADER() { return 'x-draft-sport-api-key'; }
    static get _SESSION_ID_HEADER() { return 'x-draft-sport-session-id'; }
    static get _API_JSON_HEADER() { return 'application/json;charset=UTF-8'; }

    constructor(
        path, // String e.g. '/humans'
        method, // String e.g. 'GET'
        parameters=null, // UrlParameters (optional)
        data=null, // Object e.g. {'hello': 'world' } (optional)
        callback, // Function(ApiError, Object),
        session=null, // Optional Session to override global API key/session id
    ) {

        if (!path) { throw Error('Cannot make request to falsy path'); }

        const Self = ApiRequest;

        this._complete = false;
        this._responseCode = null;
        this._responseData = null;
        this._callback = callback;

        const request = new XMLHttpRequest();
        if (GLOBAL_DEBUG_FLAG === true) { request.withCredentials = true; }

        this._request = request;
        const self = this;

        request.onreadystatechange = this._parseResponse.bind(self, request)
        let url = null;

        try {
            if (!parameters) { url = GLOBAL_API_ENDPOINT + path } else {
                url = GLOBAL_API_ENDPOINT + path + parameters.query;
            }

            let global_api_key = null;

            if (typeof(GLOBAL_API_KEY) !== 'undefined') {
                global_api_key = GLOBAL_API_KEY;
            }
            let global_session_id = null;
            if (typeof(GLOBAL_SESSION_ID) !== 'undefined') {
                global_session_id = GLOBAL_SESSION_ID;
            }

            request.open(method, url, true);
            if (global_api_key || session != null) { 
                if (!global_session_id && !session) {
                    throw Error('No Session ID available') 
                }
                const chosen_api_key = this._choose_api_key(
                    global_api_key,
                    session
                )
                const chosen_session_id = this._choose_session_id(
                    global_session_id,
                    session
                )
                request.setRequestHeader(
                    Self._KEY_HEADER,
                    chosen_api_key
                );
                request.setRequestHeader(
                    Self._SESSION_ID_HEADER,
                    chosen_session_id
                );
            }

            if (data) {
                request.setRequestHeader('Content-Type', Self._API_JSON_HEADER);
                request.send(JSON.stringify(data));
                return;
            }
    
            request.send();
        } catch (error) {
            console.log('Error when executing API request:')
            console.log(error);
            callback(error, null);
        }

        return

    }

    get isComplete() { return this._complete }
    get experiencedError() { 
        if (this._complete && this._responseCode != 200) { return true }
    }
    get responseCode() { return this._responseCode }

    _choose_api_key(global, override) {
        if (override) { return override.apiKey; }
        return global;
    }

    _choose_session_id(global, override) {
        if (override) { return override.sessionId; }
        return global;
    }

    _parseResponse(request) {
        
        const state = request.readyState;
        const status = request.status;
        if (state === 4) {
            this._responseCode = state;
            this._complete = true;
        }
        if (state === 4 && status === 200) {
            try {
                const rawText = request.responseText;
                const result = JSON.parse(rawText);
                this._responseData = result;
            } catch(error) {
                const decodeError = new ApiResponseDecodingError(
                    request.responseText,
                    error
                )
                this._callback(decodeError, null);
                return;
            }
            this._callback(null, this._responseData);
            return;
        } else if (state === 4 && status != 200 ) {
            let errorContent = null;
            try {
                errorContent = JSON.parse(request.responseText);
            } catch (error) {
                this._callback(errorContent, null);
                return;
            }
            const error = new ApiError(status, errorContent);
            this._callback(error, null);
            return;
        }
        return;
    }

}