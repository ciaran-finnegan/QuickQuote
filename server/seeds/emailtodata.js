/**
 * Created by cfinnegan on 29/10/15.
 */
/**
 * Created by cfinnegan on 24/10/15.
 */

var defaultEmails = [
    {email: "cfinnegan@csc.com"}
];

/**
 * Initialize the Rates collection if empty.
 */
if (EmailTo.find().count() === 0) {
    _.each(defaultEmails,  function(x) {
        EmailTo.insert(x);
    });
}

