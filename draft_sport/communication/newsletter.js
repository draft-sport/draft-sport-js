/* Draft Sport JS - Newsletter Class */


class Newsletter {

    constructor(
        publicId,  // String
        name // String
    ) {

        this._publicId = publicId;
        this._name = name;

        return;

    }

    get publicId() { return this._publicId; }
    get name() { return this._name; }

}
