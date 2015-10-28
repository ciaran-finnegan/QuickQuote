/**
 * A sample quote to pre-fill the Collection.
 * @type {*[]}
 */
var quoteData = [
  {name: "Test Name", email: "test@email.com", tel: "0242537312", canContact: "Yes", bio: "Test Data", targetCloud: ["AWS", ], level: "1-50", standardMigration: 1, operatingSystems: ["Windows"]}
];

/**
 * Initialize the QuoteData collection if empty.
 */
if (QuoteData.find().count() === 0) {
  _.each(quoteData,  function(quote) {
    QuoteData.insert(quote);
  });
}
