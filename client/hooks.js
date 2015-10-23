/**
 * Created by cfinnegan on 23/10/15.
 */

AutoForm.addHooks('AddQuoteDataForm', {
    onSuccess: function () {
        console.log("running after hook for AddQuoteDataForm insert!", Session.get('successfulAddQuoteData'));
        return Session.set('successfulAddQuoteData', true);
    }
})

/*****************************************************************************/
/* AddQuoteData: Event Handlers */
/*****************************************************************************/
Template.AddQuoteData.events({
});

/*****************************************************************************/
/* AddQuoteData: Helpers */
/*****************************************************************************/
Template.AddQuoteData.helpers({
    isSuccessfulAddQuoteData: function () {
        return Session.get('successfulAddQuoteData');
    }
});

/*****************************************************************************/
/* AddQuoteData: Lifecycle Hooks */
/*****************************************************************************/
Template.AddQuoteData.created = function () {
    return Session.set('successfulAddQuoteData', false);
};

Template.AddQuoteData.rendered = function () {
};

Template.AddQuoteData.destroyed = function () {
    return Session.set('successfulAddQuoteData', false);
};
