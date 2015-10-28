var currentDocID = "1";

quoteData = "QuoteData";  // avoid typos, this string occurs many times.

QuoteData = new Mongo.Collection(quoteData);

Meteor.methods({
  /**
   * Invoked by autoform to add a new Quote Data record.
   */

  addQuoteData: function(doc) {

    check(doc, QuoteData.simpleSchema());
    QuoteData.insert(doc, function(err, docID) {
        console.log("addQuoteData docID: ", docID);
        // Using this because I can't get Autoform Addhooks to work - has a timing issue, to be fixed
        Router.go('UpdateQuoteData',{_id: docID});
        var x = docID;
        console.log('addQuoteData.Session.set CurrentFormDocID :', x)
        return Session.set("CurrentFormDocID", x);
    });
      /**
       * Send an e-mail to CSC sales team with quote details - turn this into a separate function, customise target e-mail addresses & add cc
       */
      text = ('Name: ' + doc.name + '\n\n'
      + 'Contact Requested: ' + doc.canContact + '\n\n'
      + 'E-mail: ' + doc.email + '\n\n'
      + 'Phone: ' +doc.tel + '\n\n'
      + 'Project Information: ' + doc.bio + '\n\n'
      + 'Quantity of Hosts: ' + doc.standardMigration + '\n\n'
      + 'Destination Cloud: ' + doc.targetCloud + '\n\n'
      + 'Migration Event Size: ' + doc.level + '\n\n'
      + 'Operating Systems: ' + doc.operatingSystems + '\n\n');
      Meteor.call('sendEmail',
          'ciaran@kanyini.io',
          'telstramigraitonquotes@csc.com.au',
          'New Telstra Migration Quote',
          text);
      // lazy way was JSON.stringify(doc)
  },
  updateQuoteData: function(doc, docID) {
    check(doc, QuoteData.simpleSchema());
    QuoteData.update({_id: docID}, doc);
      console.log("updateQuoteData doc + docID: " + doc + docID);
      Router.go('UpdateQuoteData',{_id: docID});
      var x = docID;
      console.log('updateQuoteData.Session.set CurrentFormDocID :', x)
      return Session.set("CurrentFormDocID", x);
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
    email: {
        label: "Phone",
        type: String,
        min:9,
        max: 25,
        optional: true,
        max: 50,
        autoform: {
            group: quoteData,
            placeholder: "02 123 45678"
        }
    },
    canContact: {
    label: "Contact me?",
        type: String,
        optional: false,
        allowedValues: ['Yes', 'No'],
        autoform: {
        group: quoteData,
            type: 'select-radio-inline'
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
    allowedValues: ['1-50', '51-100', '101-150', '151-200'],
    autoform: {
      group: quoteData,
      type: 'select-radio-inline'
    }
  },
  standardMigration: {
    label: "Quantity of Hosts to Migrate",
    type: Number,
    optional: false,
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
