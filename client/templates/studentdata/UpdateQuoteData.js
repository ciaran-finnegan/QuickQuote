/**
 * Created by cfinnegan on 25/10/15.
 */

Template.UpdateQuoteData.helpers({
    'CurrentFormDocID': function () {
        return Session.get('CurrentFormDocID');
    },
    'CurrentFormData' : function () {
        return QuoteData.findOne({_id: Session.get('CurrentFormDocID')});
    },
    'Price' : function () {
        var rates = Rates.findOne();
        var currentFormData = QuoteData.findOne({_id: Session.get('CurrentFormDocID')});
        var qtyHostsToMigrate = currentFormData.standardMigration;
        if (currentFormData.level === "1-50") { var qtyMigrationEvents = Math.ceil(qtyHostsToMigrate / 50); var pricePerMigrationEvent = rates.migrationEvent50;}
        if (currentFormData.level === "51-100") { var qtyMigrationEvents = Math.ceil(qtyHostsToMigrate / 100); var pricePerMigrationEvent = rates.migrationEvent100;}
        if (currentFormData.level === "101-150") { var qtyMigrationEvents = Math.ceil(qtyHostsToMigrate / 150); var pricePerMigrationEvent = rates.migrationEvent150;}
        if (currentFormData.level === "151-200") { var qtyMigrationEvents = Math.ceil(qtyHostsToMigrate / 200); var pricePerMigrationEvent = rates.migrationEvent200;}
        var pricePerHost = rates.host;
        var extendedHostPrice = pricePerHost * qtyHostsToMigrate;
        var extendedMigrationEventPrice = pricePerMigrationEvent * qtyMigrationEvents;
        var totalEstimatedCharges = extendedHostPrice + extendedMigrationEventPrice;

        console.log("UpdateQuoteDAta.Price function returns: ", qtyHostsToMigrate, pricePerHost, extendedHostPrice, qtyMigrationEvents, pricePerMigrationEvent, extendedMigrationEventPrice, totalEstimatedCharges);
        return [qtyHostsToMigrate.toLocaleString(), pricePerHost.toLocaleString(), extendedHostPrice.toLocaleString(), qtyMigrationEvents.toLocaleString(), pricePerMigrationEvent.toLocaleString(), extendedMigrationEventPrice.toLocaleString(), totalEstimatedCharges.toLocaleString()];

        return Session.set("qtyHostsToMigrate", qtyHostsToMigrate);
    }
});

