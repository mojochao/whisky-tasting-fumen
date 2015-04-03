Template.tastingSubmit.events({

  'submit form': function (evt) {
    evt.preventDefault();

    // build up tasting object, minus the 'host' property which will
    // be set by the server based on the authenticated user
    var tasting = {
      when: $(evt.target).find('[name=when]').val(),
      where: $(evt.target).find('[name=where]').val(),
      bottle: $(evt.target).find('[name=bottle]').val(),
      spirit: $(evt.target).find('[name=spirit]').val(),
      teaser: $(evt.target).find('[name=teaser]').val()
    };

    // have server side add the tasting object to the collection
    Meteor.call('tastingInsert', tasting, function (err, id) {
      if (err) {
        return throwError(err.reason);
      }
      Router.go('tastingPage', {
        _id: id
      });
    });
  }

});

Template.tastingSubmit.helpers({

  guessNextWhen: function () {
    return moment()
      .day(3)
      .hour(18)
      .minute(0)
      .format('MM/DD/YYYY h:mm A');
  }

});

Template.tastingSubmit.rendered = function () {
  $('.datetimepicker').datetimepicker();
};
