/* Draft Sport JS - Position Category Module */


class PositionCategory {

    constructor(
        indexid,   // Integer
        name       // String
    ) {

        this._indexid = indexid;
        this._name = name;

        return;

    }

    get indexid() { return this._indexid; }
    get name() { return this._name; }

    static decode(data) {
        return new PositionCategory(
            data['indexid'],
            data['name']
        );
    }

    static decodeMany(data) {
        const Self = PositionCategory;
        return data.map((p) => { return Self.decode(p); });
    }

}
