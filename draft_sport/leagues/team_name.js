/* Draft Sport JS - Team Name Class */


class TeamName {

    static get _PATH() { return '/league/team/name'; }

    constructor(
        name,  // String
        managerId,  // String
        leagueId  // String
    ) {

        this._name = name;
        this._managerId = managerId;
        this._leagueId = leagueId;

        return;
    }

    get leagueId() { return this._leagueId; }
    get managerId() { return this._managerId; }

    static decode(data) {
        return new TeamName(
            data['name'],
            data['manager_id'],
            data['league_id']
        );
    }

    static create(
        name,  // String
        leagueId,  // String
        managerId,  // String
        callback,  // Function(Error? TeamName?)
        session=null  // Optional[Session]
    ) {

        const Self = TeamName;
        const payload = {
            'name': name,
            'league': leagueId,
            'manager': managerId
        }

        const _ = new ApiRequest(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return;} 
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;
    }

}
