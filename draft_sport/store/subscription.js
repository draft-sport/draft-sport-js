/* Draft Sport JS - Subscription Class */


class Subscription {

    static get _PATH() { return '/subscription'; }

    constructor(
        humanId,  // String
        offerId,  // String
        created  // String
    ) {
        this._humanId = humanId;
        this._offerId = offerId;
        this._created = created;

        return;
    }

    static decode(data) {
        return new Subscription(
            data['human_id'],
            data['offer_id'],
            data['created']
        );
    }

    static create(
        token, // String (Stripe token)
        humanId,  // String
        offerId,  // String
        iso_4217,  // String
        contribution,  // Optional[Integer]
        callback,  // Function(Error?, Subscription?)
        session=null,  // Optional[Session]
    ) {

        const Self = Subscription;

        const payload = {
            'token': token,
            'human': humanId,
            'offer': offerId,
            'currency': iso_4217,
            'development_contribution': contribution
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

}