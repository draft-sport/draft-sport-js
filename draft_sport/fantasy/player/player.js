/* Draft Sport JS - Fantasy Player Class */


class FantasyPlayer {

    // Placebo during dev
    constructor(
        firstName,   // String
        lastName,    // String
        teamName,    // String
        position,    // Optional<FantasyPosition>
        publicId     // String
    ) {

        this._firstName = firstName;
        this._lastName = lastName;
        this._teamName = teamName ? teamName : 'Unknown';
        this._position = position;
        this._publicId = publicId;

        return;

    }

    get firstName() { return this._firstName; }
    get lastName() { return this._lastName; }
    get teamName() { return this._teamName; }
    get publicId() { return this._publicId; }
    get positionName() {
        return this._position ? this._position.name : 'Unknown';
    }
    get position() { return this._position; }
    get fullName() { return this._firstName + ' ' + this._lastName; }

    static decode(data) {  // -> Player
        return new FantasyPlayer(
            data['first_name'],
            data['last_name'],
            data['team_name'],
            FantasyPosition.optionallyDecode(data['position']),
            data['public_id']
        );
    }

    static decodeMany(data) {  // -> Array<Player>
        return data.map((p) => { return Player.decode(p); });
    }
    
}
