Template.ratingSubmit.created = function () {
  Session.set('ratingSubmitErrors', {});
};

Template.ratingSubmit.helpers({

  errorMessage: function (field) {
    return Session.get('ratingSubmitErrors')[field];
  },

  errorClass: function (field) {
    return !!Session.get('ratingSubmitErrors')[field] ? 'has-error' : '';
  }

}); // Template.ratingSubmit.helpers

Template.ratingSubmit.events({

  'reset form': function (evt, template) {
    $('#score').rateit('value', null);
  },

  'submit form': function (evt, template) {
    evt.preventDefault();

    var errors = {};

    var score = $('#score').rateit('value');
    if (!score) {
      errors.body = "Please provide a score";
      return Session.set('ratingSubmitErrors', errors);
    }

    var rating = {
      score: score,
      tastingId: template.data._id
    };

    Meteor.call('ratingInsert', rating, function (err, ratingId) {
      if (err) {
        throwError(err.reason);
      }
    });
  }

}); // Template.ratingSubmit.events

Template.ratingSubmit.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
