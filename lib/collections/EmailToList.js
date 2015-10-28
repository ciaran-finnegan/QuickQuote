/**
 * Created by cfinnegan on 29/10/15.
 */
/**
 * Created by cfinnegan on 24/10/15.
 */
emailTo = "EmailTo";  // avoid typos, this string occurs many times.

EmailTo = new Mongo.Collection(emailTo);

Meteor.methods({


    addEmail: function(doc) {
        check(doc, EmailTo.simpleSchema());
        EmailTo.insert(doc, function(err, docID) {console.log("DocID: ", docID);});

    }

});




