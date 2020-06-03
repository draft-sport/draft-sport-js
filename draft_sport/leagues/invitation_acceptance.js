/* Draft Sport JS - Invitation Acceptance Class */



class InvitationAcceptance {

    static get _PATH() { return '/league/manager/invitation/accept'; }

    constructor(
        created,  // String
        token,  // String
        managerId,  // String
        leagueId  // String
    ) {

        this._created = created;
        this._token = token;
        this._managerId = managerId;
        this._leagueId = leagueId;

        return;

    }

    get created() { return this._created; }
    get token() { return this._token; }
    get managerId() { return this._managerId; }
    get leagueId() { return this._leagueId; }

    static decode(data) {
        return new InvitationAcceptance(
            data['created'],
            data['token'],
            data['manager_id'],
            data['league_id']
        );
    }

    static create(
        token,  // String
        humanId,  // String
        callback,  // Function(Error?, InvitationAcceptance?)
        session  // Optional[Session]
    ) {

        const Self = InvitationAcceptance;
        const payload = {
            'token': token,
            'human': humanId
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

}
