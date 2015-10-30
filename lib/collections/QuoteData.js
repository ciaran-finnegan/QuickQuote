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
        // Using this because I can't get Autoform Addhooks to work - has a timing issue, to be fixed
        Router.go('UpdateQuoteData',{_id: docID});
        var x = docID;
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
      console.log("EmailTo.findOne() :", EmailTo.findOne());
      var ccEmailList = EmailTo.findOne().email;
      console.log("ccEmailList :", ccEmailList);

      Meteor.call('sendEmail',
          'cfinnegan@csc.com.au',ccEmailList,
          'telstramigraitonquotes@csc.com.au',
          'New Telstra Migration Quote Request',
          text);
      // lazy way was JSON.stringify(doc)
  },
  updateQuoteData: function(doc, docID) {
    check(doc, QuoteData.simpleSchema());
    QuoteData.update({_id: docID}, doc);
    Modal.show('quoteModal');
      var x = docID;
      return Session.set("CurrentFormDocID", x);
    Router.go('UpdateQuoteData',{_id: docID});
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
      placeholder: "john@yourcompany.com"
    }
  },
    phone: {
        label: "Phone",
        type: String,
        min:9,
        max: 25,
        optional: true,
        max: 50,
        autoform: {
            placeholder: "02 123 45678"
        }
    },
    canContact: {
    label: "Contact me?",
        type: String,
        optional: false,
        allowedValues: ['Yes', 'No'],
        autoform: {
            type: 'select-radio-inline'
    }
},
  bio: {
    label: "Tell us about your project",
    type: String,
    optional: true,
    max: 500,
    autoform: {
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
      type: "select-checkbox-inline"
    }
  },
  level: {
    label: "Hosts per Migration Event",
    type: String,
    optional: false,
    allowedValues: ['1-50', '51-100', '101-150', '151-200'],
    autoform: {
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

    }
  },
  operatingSystems: {
    label: "Operating Systems",
    type: [String],
    optional: true,
    allowedValues: ['Windows', 'RedHat Linux', 'Oracle Linux', 'Other'],
    autoform: {
      type: 'select-multiple'

    }
  }
}));
