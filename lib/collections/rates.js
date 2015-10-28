/**
 * Created by cfinnegan on 24/10/15.
 */
rates = "Rates";  // avoid typos, this string occurs many times.

Rates = new Mongo.Collection(rates);

Meteor.methods({


    addRateData: function(doc) {
        check(doc, Rates.simpleSchema());
        Rates.insert(doc, function(err, docID) {console.log("DocID: ", docID);});
    },
    /**
     *
     * Invoked by autoform to update a Student Data record.
     * @param doc The StudentData document.
     * @param docID It's ID.
     */
    updateRateData: function(doc, docID) {
        check(doc, RateData.simpleSchema());
        RateData.update({_id: docID}, doc);
    }
});

// Publish the entire Collection.  Subscription performed in the router.
if (Meteor.isServer) {
    Meteor.publish(Rates, function () {
        return Rates.find();
    });
}

Rates.attachSchema(new SimpleSchema({
    host: {
        label: "Unit Rate Per Host",
        type: Number,
        optional: false,
        min: 0,
        autoform: {
            group: Rates,
            placeholder: "$850"
        }
    },
    migrationEvent50: {
        label: "Unit Rate Per Move Group (1-50 Hosts)",
        type: Number,
        optional: false,
        min: 0,
        autoform: {
            group: Rates,
            placeholder: "$37,000"
        }
    },
    migrationEvent100: {
        label: "Unit Rate Per Move Group (51-100 Hosts)",
        type: Number,
        optional: false,
        min: 0,
        autoform: {
            group: Rates,
            placeholder: "$42,000"
        }
    },
    migrationEvent150: {
        label: "Unit Rate Per Move Group (101-150 Hosts)",
        type: Number,
        optional: false,
        min: 0,
        autoform: {
            group: Rates,
            placeholder: "$48,000"
        }
    },
    migrationEvent200: {
        label: "Unit Rate Per Move Group (151-200 Hosts)",
        type: Number,
        optional: false,
        min: 0,
        autoform: {
            group: Rates,
            placeholder: "$58,000"
        }
    }
}));




