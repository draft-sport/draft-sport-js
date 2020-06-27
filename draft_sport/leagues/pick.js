/* Draft Sport JS - League Pick Class */


class LeaguePick {

    static get _PATH() { return '/league/pick'; }

    constructor(
        created,    // String
        managerId,  // String
        scoreCard,  // ScoreCard
        leagueId    // String
    ) {

        this._created = created;
        this._managerId = managerId;
        this._scoreCard = scoreCard;
        this._leagueId = leagueId;

        return;

    }

    get player() { return this._scoreCard; }  // Deprecated
    get scoreCard() { return this._scoreCard; }
    get fullName() { return this._scoreCard.profile.fullName; }
    get positionName() { return this._scoreCard.profile.positionName; }
    get teamName() { return this._scoreCard.profile.teamName; }
    get totalPoints() { return this._scoreCard.points.totalPoints; }

    static create(
        leagueId,  // String
        managerId,  // String
        playerId,  // String
        callback,  // Function(Error?, LeaguePick?)
        session=null  // Optional[Session]
    ) {

        const Self = LeaguePick;
        const payload = {
            'league': leagueId,
            'manager': managerId,
            'player': playerId
        }

        ApiRequest.make(
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

    static delete(
        leagueId,  // String
        managerId,  // String
        playerId,  // String
        callback,  // Function(Error?, LeaguePick?)
        session=null
    ) {

        const Self = LeaguePick;
        const payload = {
            'league': leagueId,
            'manager': managerId,
            'player': playerId
        }

        ApiRequest.make(
            Self._PATH,
            'DELETE',
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

    static decode(data) {
        return new LeaguePick(
            data['created'],
            data['manager_id'],
            ScoreCard.decode(data['score_card']),
            data['league_id']
        );
    }

    static decodeMany(data) {
        return data.map((p) => { return LeaguePick.decode(p); });
    }

}
