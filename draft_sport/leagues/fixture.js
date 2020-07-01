/* Draft Sport API - Fixture Class */


class Fixture {

    constructor(
        firstParty,   // FixtureParty
        secondParty  // Optional<FixtureParty>    null implies a "bye"
    ) {

        this._firstParty = firstParty;
        this._secondParty = secondParty;

        return;

    }

    get firstParty() { return this._firstParty; }
    get secondParty() { return this._secondParty; }

    static decode(data) {
        return new Fixture(
            FixtureParty.decode(data['first_party']),
            FixtureParty.optionallyDecode(data['second_party'])
        );
    }

    static decodeMany(data) {
        return data.map((d) => { return Fixture.decode(d); });
    }

}
