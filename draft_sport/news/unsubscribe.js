/* Draft Sport JS - Unsubscribe Request Class */


class UnsubscribeRequest {

    static get _PATH() { return '/news/unsubscribe' }

    static create(
        emailBody,
        callback // Function(Error?, Data?)
    ) {

        const Self = UnsubscribeRequest;

        const payload = { 'email': emailBody }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, data); return; }
                catch (error) { callback(error, null); return; }
            }
        );

    }

}
