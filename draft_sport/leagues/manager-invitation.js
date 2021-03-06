/* Draft Sport JS - Manager Invitation Class */


class ManagerInvitation {

    static get _PATH() { return '/league/manager/invitation'; }

    constructor(
        leagueId,  // String
        leagueName
    ) {

        this._leagueId = leagueId;
        this._leagueName = leagueName;

        return;
    }

    get email() { return this._email; }

    static create(
        managerEmail,  // String
        leagueId,  // String
        callback,  // Function(Error?, ManagerInvitation?)
        session = null
    ) {

        const Self = ManagerInvitation;
        const payload = {
            'email': managerEmail,
            'league': leagueId,
            'season': '2020' // MVP hardcode
        }

        ApiRequest.make(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;
    }

    static retrieve(
        token,  // String
        callback,  // Function(Error?, ManagerInvitation?)
        session = null
    ) {

        const Self = ManagerInvitation;
        
        const parameters = new UrlParameters([
            new UrlParameter('token', token)
        ])

        ApiRequest.make(
            Self._PATH,
            'GET',
            parameters,
            null,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            },
            session
        );

        return;
    }

    static decode(data) {
        return new ManagerInvitation(
            data['league_id'],
            data['league_name']
        );
    }

}