Router.configure({
  layoutTemplate: 'layout',
  waitOn: function() { return Meteor.subscribe("QuoteData"); },
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'AddQuoteData'
});

Router.route('/quote/:_id', {
  name: 'UpdateQuoteData',
  data: function() { return QuoteData.findOne(this.params._id); }
});
