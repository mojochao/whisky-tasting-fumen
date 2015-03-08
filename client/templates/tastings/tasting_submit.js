Template.tastingSubmit.events({

  'submit form': function (evt) {
    evt.preventDefault();

    // build up tasting object, minus the 'host' property which will
    // be set by the server based on the authenticated user
    var tasting = {
      when: $(evt.target).find('[name=when]').val(),
      where: $(evt.target).find('[name=where]').val(),
      liquor: $(evt.target).find('[name=liquor]').val(),
      bottle: $(evt.target).find('[name=bottle]').val(),
      teaser: $(evt.target).find('[name=teaser]').val()
    };

    // have server side add the tasting object to the collection
    Meteor.call('tastingInsert', tasting, function(err, result) {
      if (err) {
        return throwError(err.reason);
      }
      Router.go('tastingPage', {
        _id: result._id
      });
    });
  }

});

Template.tastingSubmit.rendered = function() {
  $('.datetimepicker').datetimepicker();
};
