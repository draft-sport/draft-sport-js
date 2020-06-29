/* Draft Sport API - Fantasy Round Draw Class */


class RoundDraw {

    constructor(
        sequenceNumber,   // Integer
        fixtures         // Array<Fixture>
    ) {

        this._sequenceNumber = sequenceNumber;
        this._fixtures = fixtures;

        return;

    }

    get sequenceNumber() { return this._sequenceNumber; }
    get fixtures() { return this._fixtures; }

    static retrieveAllInLeague(
        leagueId,     // String
        callback,     // Function(Error?, Array<RoundDraw>?)
        session=null  // Optional<Session>
    ) {

        callback(null, _DEBUG_DRAWS);

        return;

    }

}

const _DEBUG_DRAWS = [
    new RoundDraw(1, [
        new Fixture(
            new FixtureParty('Cargie\'s Team', 'Cargie', 1, 20),
            new FixtureParty('Nabung\'s Team', 'Nabung', 2, 12)
        ),
        new Fixture(
            new FixtureParty('Nelson\'s Team', 'Nelson', 1, 20),
            new FixtureParty('Harry\'s Team', 'Harry', 2, 12)
        )
    ]),
    new RoundDraw(2, [
        new Fixture(
            new FixtureParty('Cargie\'s Team', 'Cargie', 1, 20),
            new FixtureParty('Harry\'s Team', 'Harry', 2, 12)
        ),
        new Fixture(
            new FixtureParty('Nelson\'s Team', 'Nelson', 1, 20),
            new FixtureParty('Nabung\'s Team', 'Nabung', 2, 12)
        )
    ])
];
