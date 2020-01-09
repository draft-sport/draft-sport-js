/* Draft Sport JS - URL Parameters class */

class UrlParameters {

    constructor(url_parameters) { // array of UrlParameter

        if (url_parameters.length === undefined) {
            throw Error('targets do not appear to be an array')
        }
        this._targets = url_parameters;
        return;

    }

    get query() { 
        let query = '?';
        for (let i = 0; i < this._targets.length; i++) {
            if (i === 0) {
                query += this._targets[i].string;
                continue;
            }
            query += '&' + this._targets[i].string;
            continue;
        }
        return query;
    }

    addTarget(target) {
        if (!target) { return; }
        this._targets.push(target);
        return;
    }

    addToPath(path) {
        if (this._targets.length < 1) { return path; }
        return path + this.query;
    }

    goToParameterisedPath(path) {
        const parameterisedPath = this.addToPath(path);
        window.location.href = parameterisedPath;
        return;
    }

    static goToPathThenReturn(
        path,  // String
        otherTargets  // Array[UrlParameter]
    ) {

        const Self = UrlParameters;
        const url = new URL(window.location.href);

        const parameters = new Self(otherTargets);
        const baseQuery = parameters.query;
        const baseDestination = path + baseQuery;
        const then = url.pathname + url.search;
        const destination = baseDestination + '&then=' + then;

        window.location.href = destination;
        return;

    }

}
