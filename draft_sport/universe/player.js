/* Draft Sport JS - Universe Player Class */


class UniversePlayer {

    constructor(
        firstName,
        lastName,
        teamName,
        positionName,
        publicId
    ) {

        this._firstName = firstName;
        this._lastName = lastName;
        this._teamName = teamName ? teamName : 'Unknown';
        this._positionName = positionName;
        this._publicId = publicId;

        return;

    }

    get firstName() { return this._firstName; }
    get lastName() { return this._lastName; }
    get teamName() { return this._teamName; }
    get publicId() { return this._publicId; }
    get positionName() { return this._positionName; }
    get fullName() { return this._firstName + ' ' + this._lastName; }

    static decode(data) {  // -> Player
        return new Player(
            data['first_name'],
            data['last_name'],
            data['team_name'],
            data['position_name'],
            data['public_id']
        );
    }

    static decodeMany(data) {  // -> Array<Player>
        return data.map((p) => { return Player.decode(p); });
    }
    
}
