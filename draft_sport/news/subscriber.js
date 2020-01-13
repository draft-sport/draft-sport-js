/* Draft Sport JS - Subscriber Class */


class Subscriber {

    static get _PATH() { return '/news/subscriber'; }

    constructor(
        publicId,  // String
        modified,  // String encoded datetime
        newsletters,  // Array<Newsletter>
        communicationMethods,  // Array<CommunicationMethods>
    ) {

        this._publicId = publicId;
        this._modified = modified;
        this._newsletters = newsletters;
        this._communicationMethods = communicationMethods;

        return;
        
    }

    get publicId() { return this._publicId; }
    get modified() { return this._modified; }
    get newsletters() { return this._newsletters; }
    get communicationMethods() { return this._communicationMethods; }

    static decode(data) {
        return new Subscriber(
            data['public_id'],
            data['modified'],
            Newsletter.decodeMany(data['newsletters']),
            CommunicationMethod.decodeMany(data['communication_methods'])
        );
    }

    static create(
        email,  // String
        newsletter,  // Newsletter
        callback  // Function(Error?, Subscriber?)
    ) {

        const Self = Subscriber;

        const payload = {
            'email': email,
            'newsletter_id': newsletter.publidId
        }

        const _ = new ApiRequest(
            Self._PATH,
            'POST',
            null,
            payload,
            (error, data) => {
                if (error != null) { callback(error, null); return; }
                try { callback(null, Self.decode(data)); return; }
                catch (error) { callback(error, null); return; }
            }
        );

        return;

    }

}
