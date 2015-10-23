quoteData = "QuoteData";  // avoid typos, this string occurs many times.

QuoteData = new Mongo.Collection(quoteData);

Meteor.methods({
  /**
   * Invoked by autoform to add a new Student Data record.
   * @param doc The StudentData document.
   */
  addQuoteData: function(doc) {
    console.log("Adding", doc);
    check(doc, QuoteData.simpleSchema());
    QuoteData.insert(doc, function(err, docID) {console.log("DocID: ", docID);});
  },
  /**
   *
   * Invoked by autoform to update a Student Data record.
   * @param doc The StudentData document.
   * @param docID It's ID.
   */
  updateQuoteData: function(doc, docID) {
    console.log("Updating", doc);
    check(doc, QuoteData.simpleSchema());
    QuoteData.update({_id: docID}, doc);
  }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
  Meteor.publish(quoteData, function () {
    return QuoteData.find();
  });
}
/**
 * Create the schema for Student Data.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
QuoteData.attachSchema(new SimpleSchema({
  name: {
    label: "Name",
    type: String,
    optional: false,
    max: 20,
    autoform: {
      group: quoteData,
      placeholder: "John Doe"
    }
  },
  email: {
    label: "E-mail",
    type: String,
    regEx: SimpleSchema.RegEx.Email,
    optional: false,
    max: 50,
    autoform: {
      group: quoteData,
      placeholder: "john@yourcompany.com"
    }
  },
  bio: {
    label: "Tell us about your project",
    type: String,
    optional: true,
    max: 500,
    autoform: {
      group: quoteData,
      placeholder: 'Optional.',
      rows: 5
    }
  },
  targetCloud: {
    label: "Destination Cloud",
    type: [String],
    optional: false,
    allowedValues: ['vCloud Air', 'AWS', 'BizCloud', 'VCE', 'Azure'],
    autoform: {
      group: quoteData,
      type: "select-checkbox-inline"
    }
  },
  level: {
    label: "Hosts per Migration Event",
    type: String,
    optional: false,
    allowedValues: ['1-50', '51-100', '100-150', '151-200'],
    autoform: {
      group: quoteData,
      type: 'select-radio-inline'
    }
  },
  standardMigration: {
    label: "Quantity of Standard Complexity Host Migrations",
    type: Number,
    optional: false,
    min:0,
    max:10000,
    autoform: {
      group: quoteData
    }
  },
  mediumMigration: {
    label: "Quantity of Medium Complexity Host Migrations",
    type: Number,
    optional: true,
    min:0,
    max:10000,
    autoform: {
      group: quoteData
    }
  },
  complexMigration: {
    label: "Quantity of Complex Host Migrations",
    type: Number,
    optional: true,
    min:0,
    max:10000,
    autoform: {
      group: quoteData
    }
  },
  operatingSystems: {
    label: "Operating Systems",
    type: [String],
    optional: true,
    allowedValues: ['Windows', 'RedHat Linux', 'Oracle Linux', 'Other'],
    autoform: {
      group: quoteData,
      type: 'select-multiple'

    }
  }
}));
