/* Draft Sport Web - Human Class */


class Human {

    static get _PATH() { return '/human'; }

    constructor(
        publicId,  // String
        handle     // Optional<String>
    ) {

        this._publicId = publicId;
        this._handle = handle;
        return;

    }

    get publicId() { return this._publicId; }
    get handle() { return this._handle; }

    static decode(data) {
        return new Human(
            data['public_id'],
            data['handle']
        );
    }

    static create(
        rawEmail,  // String
        plaintextSecret,  // String
        callback  // Function(Error?, Human?)
    ) {

        const Self = Human;

        const payload = {
            'email': rawEmail,
            'secret': plaintextSecret
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                const human = Self.decode(data);
                callback(null, human);
                return;
            },
            null,
            null,
            false,
            true
        );

        return;

    }

}
