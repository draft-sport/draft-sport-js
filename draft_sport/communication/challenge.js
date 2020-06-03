/* Draft Sport JS  - Challenge Class */


class Challenge {

    static get _PATH() { return '/communication-method/challenge'; }

    constructor(
        expiration,  // String
        completed  // Boolean
    ) {

        this._expiration = expiration;
        this._completed = completed;

        return;

    }

    static decode(data) {
        return new Challenge(
            data['expiration'],
            data['completed']
        );
    }

    static create(
        methodId,  // String
        callback,  // Function(Error?, Challenge?)
        session  // Optional[Session]
    ) {

        const Self = Challenge;
        const payload = { 'method': methodId };

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return;} 
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;

    }

}
