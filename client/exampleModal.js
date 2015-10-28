/**
 * Created by cfinnegan on 24/10/15.
 */
if(Meteor.isClient){

    var templateName = 'exampleModal';

    // Store user input in the Session object so it survives code reloads.
    var usernameErrorKey = templateName+'_usernameError';
    var passwordErrorKey = templateName+'_passwordError';

    Template[templateName].created = function(){

        Session.set(usernameErrorKey, "");
        Session.set(passwordErrorKey, "");

    };

    Template[templateName].helpers({
    });

    Template[templateName].events({

        'submit form': function(event, template) {

            event.preventDefault();

            Session.set(usernameErrorKey, "");
            Session.set(passwordErrorKey, "");

        }});

}