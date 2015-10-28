/**
 * Created by cfinnegan on 24/10/15.
 */
/**
 * A sample quote to pre-fill the Collection.
 * @type {*[]}
 */
var rateData = [
    {host: "850", migrationEvent50: "37000", migrationEvent100: "42000", migrationEvent150: "48000", migrationEvent200: "58000", }
];

/**
 * Initialize the Rates collection if empty.
 */
if (Rates.find().count() === 0) {
    _.each(rateData,  function(quote) {
        Rates.insert(quote);
    });
}

