Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() {
    return Meteor.subscribe("QuoteData");
    //return Meteor.subscribe("Rates");
  },
 //waitOn: function() { return Meteor.subscribe("Rates"); },
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'mainPage'
});

Router.route('/quote/:_id', {
  name: 'UpdateQuoteData',
  data: function() { return QuoteData.findOne(this.params._id); }
});
