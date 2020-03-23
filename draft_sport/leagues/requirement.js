/* Draft Sport JS - Requirement Class */


class Requirement {

    constructor(
        count,  // Integer
        position  // String
    ) {

        this._count = count;
        this._position = position;
        return;
    }

    get count() { return this._count; }
    get position() { return this._position; }

    static decode(data) {
        return new Requirement(
            data['count'],
            data['position']
        );
    }

    static decodeMany(data) {
        return data.map((r) => { return Requirement.decode(r); });
    }

}