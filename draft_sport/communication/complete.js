/* Draft Sport JS - Challenge Acceptance Class */


class ChallengeCompletion {

    static get _PATH() { return '/communication-method/challenge/complete'; }

    constructor(
        created  // String
    ) {

        this._created = created;

        return;
    }

    get created() { return this._created; }

    static decode(data) {
        return new ChallengeCompletion(
            data['created']
        );
    }

    static create(
        challengeCode,  // String
        callback,  // Function(Error?, ChallengeCompletion?)
        session=null  // Optional[Session]
    ) {

        const Self = ChallengeCompletion;
        const payload = { 'code': challengeCode }

        const _ = new ApiRequest(
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
        )

    }

}