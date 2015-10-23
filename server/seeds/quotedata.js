/**
 * A list of sample students to pre-fill the Collection.
 * @type {*[]}
 */
var quoteData = [
  {name: "Test Name", email: "test@email.com", bio: "Test Data", targetCloud: ["AWS", ], level: "1-50", standardMigration: 1, mediumMigration: 1, complexMigration: 1, operatingSystems: ["Windows"]}
];

/**
 * Initialize the StudentData collection if empty.
 */
if (QuoteData.find().count() === 0) {
  _.each(quoteData,  function(quote) {
    QuoteData.insert(quote);
  });
}
