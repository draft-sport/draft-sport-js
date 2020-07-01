/* Draft Sport API - Fixture Party Class */


class FixtureParty {

    constructor(
        teamName,       // String
        managerName,    // String
        managerId      // String
    ) {

        this._teamName = teamName;
        this._managerName = managerName;
        this._managerId = managerId

        return;

    }

    get teamName() { 
        if (!this._teamName) { return 'Unnamed Team'; }
        return this._teamName; 
    }
    get managerName() { return this._managerName; }
    get managerId() { return this._managerId; }

    static decode(data) {
        return new FixtureParty(
            data['team_name'],
            data['manager_name'],
            data['manager_public_id']
        )
    }
    
    static optionallyDecode(data) {
        if (!data) { return null; }
        return FixtureParty.decode(data);
    }

}
