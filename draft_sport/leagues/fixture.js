/* Draft Sport API - Fixture Class */


class Fixture {

    constructor(
        firstParty,   // FixtureParty
        secondParty,  // Optional<FixtureParty>    null implies a "bye"
        played        // Boolean
    ) {

        this._firstParty = firstParty;
        this._secondParty = secondParty;
        this._played = played;

        return;

    }

    get firstParty() { return this._firstParty; }
    get secondParty() { return this._secondParty; }
    get played() { return this._player; }

}
