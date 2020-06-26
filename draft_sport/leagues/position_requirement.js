/* Draft Sport API - Position Requirement Module */


class PositionRequirement extends CompositionRequirement {

    constructor(
        count,        // Integer
        positionName  // String
    ) {

        this._count = count;
        this._positionName = positionName;

        return;

    }

    get count() { return this._count; }
    get positionName() { return this._positionName; }

    get requirementName() { return this._positionName; }
    get typeKey() { return CompositionRequirement.POSITION_KEY; }

    static decode(data) {
        return new PositionRequirement(
            data['count'],
            data['position_name']
        )
    }

    static decodeMany(data) {
        return data.map((d) => { return PositionRequirement.decode(d);} )
    }

}
