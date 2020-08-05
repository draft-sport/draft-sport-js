/* Draft Sport API - Fixture Party Class */


class FixtureParty {

    constructor(
        teamName,       // Optional<String>
        managerName,    // String
        managerId,      // String
        totalScore      // Optional<Integer>
    ) {

        this._teamName = teamName;
        this._managerName = managerName;
        this._managerId = managerId
        this._totalScore = totalScore;

        return;

    }

    get teamName() { 
        if (!this._teamName) { return 'Unnamed Team'; }
        return this._teamName; 
    }
    get managerName() { return this._managerName; }
    get managerId() { return this._managerId; }
    get totalScore() { return this._totalScore; }

    static decode(data) {
        return new FixtureParty(
            data['team_name'],
            data['manager_name'],
            data['manager_public_id'],
            data['total_score']
        )
    }
    
    static optionallyDecode(data) {
        if (!data) { return null; }
        return FixtureParty.decode(data);
    }

}
