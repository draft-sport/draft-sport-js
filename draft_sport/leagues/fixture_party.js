/* Draft Sport API - Fixture Party Class */


class FixtureParty {

    constructor(
        teamName,       // String
        managerName,    // String
        managerId,      // String
        points          // Optional<Integer>
    ) {

        this._teamName = teamName;
        this._managerName = managerName;
        this._managerId = managerId;
        this._points = points;

        return;

    }

    get teamName() { return this._teamName; }
    get managerName() { return this._managerName; }
    get managerId() { return this._managerId; }
    get points() { return this._points; }

}
