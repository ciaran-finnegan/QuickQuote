/**
 * Created by cfinnegan on 24/10/15.
 */

Template.AddQuoteData.helpers({
    'quoteData': function(){
    var test = AutoForm.getFormValues('AddQuoteDataForm');
        var x = test.insertDoc;
            return x},

    'price' : function(){
        var doc = QuoteData.findOne();
        var price = (doc.standardMigration * 850);
        return price
    },

    'yy' : function(){
        return currentDocID;
    }

});


Template.registerHelper('xx', function(){
    return currentDocID;
});


Template.registerHelper('docID',function(input){
    return Session.get("docID");
});



