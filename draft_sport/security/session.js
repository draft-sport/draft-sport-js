/* Draft Sport Web - Session Class */


class Session {

    static get _PATH() { return '/session'; }

    constructor(
        sessionId,  //String
        sessionKey,  // String
        apiKey,  // String
        agentId,  // String
        created,  // String
    ) {

        this._apiKey = apiKey;
        this._sessionId = sessionId;
        this._sessionKey = sessionKey;
        this._agentId = agentId;
        this._created = created;

        return;

    }

    get apiKey() { return this._apiKey; }
    get sessionId() { return this._sessionId; }
    get sessionKey() { return this._sessionKey; }
    get agentId() { return this._agentId; }
    get created() { return this._created; }

    delete(
        callback  // Function(Error?, Session?)
    ) {

        const Self = Session;
        const parameters = new UrlParameters([
            new UrlParameter('session_id', this._sessionId),
        ]);

        ApiRequest.make(
            Self._PATH,
            'DELETE',
            parameters,
            null,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            }
        );

    }

    static decode(data) {
        return new Session(
            data['session_id'],
            data['session_key'],
            data['api_key'],
            data['agent_id'],
            data['created']
        )
    }

    static create(
        email,  // String
        secret,  // String
        callback  // Function(Error?, Session?)
    ) {
        
        const Self = Session;

        const payload = {
            'email': email,
            'secret': secret
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            null,
            null,
            true
        );

        return;
    }

    static createFromToken(
        token,  // String
        callback  // Function(Error?, Session?)
    ) {

        const Self = Session;

        const payload = { 'token': token }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            null,
            null,
            true
        );

        return;
    }

    static retrieve(
        sessionId,  // String
        callback  // Function(Error? , Session?)
    ) {

        const Self = Session;
        const parameters = new UrlParameters([
            new UrlParameter('session_id', sessionId),
        ]);

        ApiRequest.make(
            Self._PATH,
            'GET',
            parameters,
            null,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            }
        );

        return;
    }
}