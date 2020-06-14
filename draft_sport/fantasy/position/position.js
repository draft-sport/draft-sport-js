/* Draft Sport JS - Fantasy Position Class */


class FantasyPosition {

    // Placebo during dev
    constructor(
        indexid,     // Integer
        name,        // Name
        categories   // Array<PositionCategory>
    ) {

        this._indexid = indexid;
        this._name = name;
        this._categories = categories;

        return;

    }

    get name() { return this._name; }
    get indexid() { return this._indexid; }
    get categories() { return this._categories; }

    static optionallyDecode(data) {
        if (!data) { return null; }
        return FantasyPosition.decode(data);
    }

    static decode(data) {  // -> Player
        return new FantasyPosition(
            data['indexid'],
            data['name'],
            PositionCategory.decodeMany(data['categories'])
        );
    }

    static decodeMany(data) {  // -> Array<FantasyPosition>
        const Self = FantasyPosition;
        return data.map((p) => { return Self.decode(p); });
    }
    
}
