/* Draft Sport JS - Team Summary Class */


class TeamSummary {

    constructor(
        leagueId,   // String
        teamName,   // String
        managerId,  // String
        managerName // String
    ) {

        this._leagueId = leagueId;
        this._teamName = teamName;
        this._managerId = managerId;
        this._managerName = managerName;

    }

    static decode(data) {
        return new TeamSummary(
            data['league_public_id'],
            data['team_name'],
            data['manager_public_id'],
            data['manager_name']
        );
    }

    static decodeMany(data) {
        return data.map((d) => { return TeamSummary.decode(d); });
    }

}
