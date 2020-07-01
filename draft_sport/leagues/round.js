/* Draft Sport API - Fantasy Round Draw Class */


class RoundDraw {

    static get _LIST_PATH() { return '/league/round/list'; }

    constructor(
        sequenceNumber,   // Integer
        fixtures          // Array<Fixture>
    ) {

        this._sequenceNumber = sequenceNumber;
        this._fixtures = fixtures;

        return;

    }

    get sequenceNumber() { return this._sequenceNumber; }
    get fixtures() { return this._fixtures; }
    get uniqueParties() {
        const self = this;
        const parties = Array();
        for(let i = 0; i < self._fixtures.length; i++) {
            const fixture = self._fixtures[i];
            parties.push(fixture.firstParty);
            if (fixture.secondParty) { parties.push(fixture.secondParty); }
            continue;
        }
        return parties;
    }

    static decode(data) {
        return new RoundDraw(
            data['round_sequence_number'],
            Fixture.decodeMany(data['fixtures'])
        );
    }

    static retrieveAllInLeague(
        leagueId,     // String
        callback,     // Function(Error?, Array<RoundDraw>?)
        session=null  // Optional<Session>
    ) {

        const Self = RoundDraw;
        const rawParameters = [new UrlParameter('league', leagueId)]

        const parameters = new UrlParameters(rawParameters);
        const c = callback;

        ApiRequest.make(
            Self._LIST_PATH,
            'GET',
            parameters,
            null,
            (e, d) => { ApiRequest.decodeManyInResponse(e, d, c, Self); },
            session,
            null,
            false,
            false
        );

        return;

    }

}
