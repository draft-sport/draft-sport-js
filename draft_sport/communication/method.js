/* Draft Sport - Communication Method Class */


class CommunicationMethod {

    constructor(
        publicId,  // String
        mode,  // CommunicationMode enumeration
        body,  // String
        confirmed  // Boolean
    ) {

        this._publicId = publicId;
        this._mode = mode;
        this._body = body;
        this._confirmed = confirmed;

        return;

    }

    get publicId() { return this._publicId; }
    get body() { return this._body; }

    static decode(data) {
        return new CommunicationMethod(
            data['public_id'],
            CommunicationMode.decode(data['mode']),
            data['body'],
            data['confirmed']
        );
    }

    static decodeMany(data) {
        return data.map((c) => { return CommunicationMethod.decode(c); });
    }

}
