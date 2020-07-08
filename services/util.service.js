module.exports = {
    makeId,
    compareValues
}

function makeId(length = 10) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function compareValues(key, order = 'asc') {
    return function innerSort(a, b) {
        const x = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
        const y = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
        let comparison = 0;
        if (x > y) comparison = 1;
        else if (x < y) comparison = -1;
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}