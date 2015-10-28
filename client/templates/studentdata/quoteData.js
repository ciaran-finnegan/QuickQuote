/**
 * Created by cfinnegan on 24/10/15.
 */

Template.AddQuoteData.helpers({
    'quoteData': function(){
    var test = AutoForm.getFormValues('AddQuoteDataForm');
        console.log("autoform.getformvalues is: ", test);
        var x = test.insertDoc;
            console.log("in the AddQuoteData helper, Requester Name is set to: "+name);
    return x},

    'price' : function(){
        console.log("IN PRICE FUNCTION");
        var doc = QuoteData.findOne();
        var price = (doc.standardMigration * 850);
        console.log("quoteData.standardMigration is .. ", price );
        return price
    },

    'yy' : function(){
        console.log("in yy helper and currentDocID is.. ", currentDocID);
        return currentDocID;
    }

});


Template.registerHelper('xx', function(){
    console.log("in xx helper and currentDocID is.. ", currentDocID);
    return currentDocID;
});


Template.registerHelper('docID',function(input){
    return Session.get("docID");
});



