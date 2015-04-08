Template.tastingSubmit.events({

  'submit form': function (event) {
    event.preventDefault();

    // build up tasting object, minus the 'host' property which will
    // be set by the server based on the authenticated user
    var tasting = {
      when: $(event.target).find('[name=when]').val(),
      where: $(event.target).find('[name=where]').val(),
      bottle: $(event.target).find('[name=bottle]').val(),
      spirit: $(event.target).find('[name=spirit]').val(),
      teaser: $(event.target).find('[name=teaser]').val()
    };

    // have server side add the tasting object to the collection
    Meteor.call('tastingInsert', tasting, function (error, id) {
      if (error) {
        return throwError(error.reason);
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
