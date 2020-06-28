/* Draft Sport JS - Handle Class */


class HumanHandle {

    static get MAX_LENGTH() { return 128; }
    static get MIN_LENGTH() { return 3; }
    
    static get _PATH() { return '/human/handle'; }

    constructor(
        handle,     // String
        created     // String
    ) {

        this._handle = handle;
        this._created = created;

        return;

    }

    get handle() { return this._handle; }

    static decode(data) {
        return new HumanHandle(
            data['handle'],
            data['created']
        );
    }

    static create(
        handle,       // String
        humanId,      // String
        callback,     // Function(Error?, HumanHandle)
        session=null  // Optional<Session>
    ) {

        const Self = HumanHandle;

        if (!handle) { throw Error('Missing handle'); }
        if (!humanId) { throw Error('Missing humanId'); }

        if (handle.length > Self.MAX_LENGTH) {
            throw Error('handle too long');
        }
        if (handle.length < Self.MIN_LENGTH) {
            throw Error('handle too short');
        }

        const payload = {
            'human': humanId,
            'handle': handle
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (e, d) => { ApiRequest.decodeResponse(e, d, callback, Self); }
            ,
            session
        );

    }

}
