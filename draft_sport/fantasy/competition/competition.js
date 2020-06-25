/* Draft Sport API - Fantasy Competition Module */


class FantasyCompetition {

    constructor(
        publicId,  // String
        name       // String
    ) {

        this._publicId = publicId;
        this._name = name;

        return;
    }

    get publicId() { return this._publicId; }
    get name() { return this._name; }

    static decode(data) {
        return new FantasyCompetition(
            data['public_id'],
            data['name']
        )
    }

}
