/* Draft Sport JS - League Pick Class */


class LeaguePick {

    static get _PATH() { return '/league/pick'; }

    constructor(
        created,                // String
        asAt,                   // String
        asAtRoundSequence,      // Integer
        managerId,              // String
        player,                 // FantasyPlayer
        leagueId,               // String
        benched                 // Boolean
    ) {

        this._created = created;
        this._asAt = asAt
        this._asAtRoundSequence = asAtRoundSequence;
        this._managerId = managerId;
        this._player = player;
        this._leagueId = leagueId;
        this._benched = benched;

        return;

    }

    get player() { return this._player }
    get fullName() { return this._player.fullName; }
    get positionName() { return this._player.positionName; }
    get teamName() { return this._player.teamName; }
    get created() { return this._created; }
    get asAt() { return this._asAt; }
    get asAtRound() { return this._asAtRoundSequence; }
    get benched() { return this._benched; }

    static create(
        leagueId,     // String
        managerId,    // String
        playerId,     // String
        asAtRound,    // Integer
        benched,      // Boolean
        callback,     // Function(Error?, LeaguePick?)
        session=null  // Optional[Session]
    ) {

        if (!asAtRound) { throw Error('Missing asAtRound'); }
        if (!callback) { throw Error('Missing callback'); }

        const Self = LeaguePick;
        const payload = {
            'league': leagueId,
            'manager': managerId,
            'player': playerId,
            'as_at_round': asAtRound,
            'benched': benched
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
        leagueId,                   // String
        managerId,                  // String
        playerId,                   // String
        asAtRound,                  // Integer
        callback,                   // Function(Error?, LeaguePick?)
        deleteAllPreceding=false,   // Boolean
        session=null
    ) {

        if (!asAtRound) { throw Error('Missing asAtRound'); }
        if (!callback) { throw Error('Missing callback'); }

        const Self = LeaguePick;
        const payload = {
            'league': leagueId,
            'manager': managerId,
            'player': playerId,
            'as_at_round': asAtRound,
            'delete_all_preceding': deleteAllPreceding
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
            data['as_at'],
            data['as_at_round_sequence'],
            data['manager_id'],
            FantasyPlayer.decode(data['player']),
            data['league_id'],
            data['benched']
        );
    }

    static decodeMany(data) {
        return data.map((p) => { return LeaguePick.decode(p); });
    }

}
