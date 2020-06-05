/* Draft Sport API - Secret Reset Class */


class SecretReset {

    static get PATH() { return '/human/secret-reset' }

    static create(
        resetKey,         // String
        plaintextSecret,  // String
        callback,         // Function(Error?)
        apiEndpoint=null  // Optional<String>
    ) {

        const Self = SecretReset;
        if (!resetKey) { throw Error('resetKey required'); }
        if (!plaintextSecret) { throw Error('plaintextSecret required'); }

        ApiRequest.make(
            Self.PATH,
            'POST',
            null,
            {
                'reset_key': resetKey,
                'secret': plaintextSecret
            },
            (e, o) => {
                if (!o) { callback(new Error('404')); return; }
                callback(e);
                return;
            },
            null,
            apiEndpoint,
            true
        );

    }

}
