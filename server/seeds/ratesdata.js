/**
 * Created by cfinnegan on 24/10/15.
 */
/**
 * A sample quote to pre-fill the Collection.
 * @type {*[]}
 */
var rateData = [
    {host: "935", migrationEvent50: "40700", migrationEvent100: "46200", migrationEvent150: "52800", migrationEvent200: "63800" }
];

/**
 * Initialize the Rates collection if empty.
 */
if (Rates.find().count() === 0) {
    _.each(rateData,  function(quote) {
        Rates.insert(quote);
    });
}

