/* Draft Sport Web Application - API error class */

const ERROR_INFO_KEY = 'error-information';
const ERROR_CUSTOMER_INFORMATION = {
    400: "Draft Rugby's servers could not understand the information sent by \
    your device. This likely indicates a bug in our application. Our support \
    team has been notified automatically, but please feel free to contact \
    us at support@draftrugby.com",
    500: "Draft Rugby's servers encountered an error when processing \
    information send by your device. There may be a bug in our systems, or \
    they may be experiencing a temporary service disruption. Our support team \
    has been notified automatically.",
    401: "Draft Rugby's servers could not identify you when processing \
    data sent by your device. This likely indicates a bug has crept into \
    our application. Please contact us at support@draftrugby.com.",
    403: "You don't appear to be authorised to perform the action you \
    were attempting.  This likely indicates a bug has crept into \
    our application. Please contact us at support@draftrugby.com.",
    429: "Draft Rugby's servers have noticed unusually high activity levels \
    from your device or the network it is connected to. Please try again in \
    few minutes. If you continue to see this message, please contact \
    support@draftrugby.com",
    404: "Draft Rugby's servers were unable to find a resource needed to \
    serve your request. This likely indicates a bug in our application. Our \
    support team has been notified automatically, but please feel free to \
    contact us at support@draftrugby.com"
}
const ERROR_FALLBACK_INFORMATION = "Draft Sport has encountered an error. \
There may be a bug in our systems, or they may be experiencing a temporary \
disruption. We will attempt to resolve the problem as quickly as possible";

class ApiError extends Error {

    static get genericDescription() { return ERROR_FALLBACK_INFORMATION; }
    static get EVENT_KEY() { return 'draftSportApiError'; }

    constructor(
        code,                     // Integer
        data=null,                // Optional<Object>
        requestSummary=null       // Optional<Object> (Untyped)
    ) {

        const description = ERROR_CUSTOMER_INFORMATION[code];
        let techInfo = description;
        if (data != null && data != undefined && data[ERROR_INFO_KEY]) {
            techInfo = data[ERROR_INFO_KEY];
        }
        const logMessage = 'API error (' + code + '), ' + techInfo;
        super(logMessage);

        const self = this;

        self._code = code;
        self._customerDescription = description || ERROR_FALLBACK_INFORMATION;
        self._technicalDescription = techInfo;
        self._requestSummary = requestSummary;

        return

    }

    get code() { return this._code }
    get customerDescription() { return this._customerDescription }
    get technicalDescription() { return this._technicalDescription }

    dispatchEvent() {
        
        const Self = ApiError; const self = this;

        if (!self._requestSummary) {

            window.dispatchEvent(new CustomEvent(
                Self.EVENT_KEY,
                {
                    detail : {
                        httpErrorCode: self._code,
                        technicalDescription: self._technicalDescription
                    }  
                }
            ));

            return;
            
        }

        const eventDetail = {
            httpErrorCode: self._code,
            technicalDescription: (() => {
                if (!self._technicalDescription) {
                    return 'None'
                }
                return self._technicalDescription
            })(),
            requestData: self._requestSummary.requestData,
            requestParameters: self._requestSummary.requestParameters,
            requestPath: self._requestSummary.requestPath,
            requestMethod: self._requestSummary.requestMethod,
            suppressError: self._requestSummary.suppressError
        }

        const event = new CustomEvent(
            Self.EVENT_KEY,
            { detail: { eventDetail } }
        );

        window.dispatchEvent(event);

        return;

    }

    /* Optionally supply this error instance with an object full of verbose
    error descriptions. Verbose descriptions may be associated with
    particular technical error descriptions supplied by the API. Technical
    descriptions are usually not suitable for presentation to a customer, but
    they may act as a key for an invoking object to insert a verbose and
    useful description. Supply an object of the form:
    {
        `technical-error-code`: `verbose-description`
    }
    */
    applyVerboseDescriptions(descriptions) {
        for (let property in descriptions) {
            if (!descriptions.hasOwnProperty(property)) { continue }
            if (property != this._technicalDescription) { continue }
            this._customerDescription = descriptions[property];
            return;
        }
        return;
    }
}
