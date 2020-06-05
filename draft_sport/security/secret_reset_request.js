/* Draft Sport API - Secret Reset Request Class */



class SecretResetRequest {

    static get PATH() { return '/human/secret-reset-request'}

    constructor(
        created  // String encoded time
    ) {
        this._created = created;
        return;
    }

    static decode(data) {
        return new SecretResetRequest(data['created']);
    }

    static create(
        emailAddress,      // String
        callback,          // Function(Error?, Self?)
        apiEndpoint=null   // Optional<String>
    ) {

        const Self = SecretResetRequest;
        if (!emailAddress) { throw Error('Missing emailAddress'); }

        ApiRequest.make(
            Self.PATH,
            'POST',
            new UrlParameters([new UrlParameter('email', emailAddress)]),
            null,
            (e, d) => { ApiRequest.decodeResponse(e, d, callback, Self); },
            null,
            apiEndpoint,
            true
        );

    }

    static retrieve(
        resetKey,          // String
        callback,          // Function(Error?, Self?)
        apiEndpoint=null   // Optional<String>
    ) {

        const Self = SecretResetRequest;
        if (!resetKey) { throw Errow('Missing resetKey')}

        ApiRequest.make(
            Self.PATH,
            'GET',
            new UrlParameters([new UrlParameter('reset-key', resetKey)]),
            null,
            (e, d) => { ApiRequest.decodeResponse(e, d, callback, Self); },
            null,
            apiEndpoint,
            true
        );

    }

}
