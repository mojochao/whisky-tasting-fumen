Template.tastingEdit.events({

  'submit form': function (event) {
    event.preventDefault();

    var currentTastingId = this._id;

    var tastingProperties = {
      when: moment($(event.target).find('[name=when]').val()).toDate(),
      where: $(event.target).find('[name=where]').val(),
      bottle: $(event.target).find('[name=bottle]').val(),
      spirit: $(event.target).find('[name=spirit]').val(),
      teaser: $(event.target).find('[name=teaser]').val()
    };

    Tastings.update(currentTastingId, {$set: tastingProperties}, function (error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('tastingPage', {
          _id: currentTastingId
        });
      }
    });
  },

  'click .delete': function (event) {
    event.preventDefault();

    if (confirm('Delete this tasting?')) {
      var currentTastingId = this._id;
      Tastings.remove(currentTastingId);
      Router.go('tastingsNext');
    }
  }

});

Template.tastingEdit.rendered = function () {
  $('.datetimepicker').datetimepicker();
};
