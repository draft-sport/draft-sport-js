/* Draft Sport JS - Universe Player Class */


class Player {

    // Placebo during dev
    constructor() { return }

    static decode(data) {  // -> Player
        return new Player();
    }

    static decodeMany(data) {  // -> Array<Player>
        return data.map((p) => { return Player.decode(p); });
    }
    
}
