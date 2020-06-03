/* Draft Sport JS - Composition Class */


class Composition {

    static get _PATH() { return '/leagues/team/composition' }

    constructor(
        requirements
    ) {
        this._requirements = requirements;
        return;
    }

    get requirements() { return this._requirements; }

    static decode(data) {
        return new Composition(
            Requirement.decodeMany(data['requirements'])
        );
    }

    static retrieve(
        callback,  // Function(Error?, Composition?)
        session=null  // Optional[Session]
    ) {

        const Self = Composition;

        ApiRequest.make(
            Self._PATH,
            'GET',
            null,
            null,
            (error, data) => {
                if (error) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            }
        );

        return;
    }

}
