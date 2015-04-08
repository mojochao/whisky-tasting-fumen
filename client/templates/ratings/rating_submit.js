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

  'reset form': function (event, template) {
    $('#score').rateit('value', null);
  },

  'submit form': function (event, template) {
    event.preventDefault();

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

    Meteor.call('ratingInsert', rating, function (error, ratingId) {
      if (error) {
        throwError(error.reason);
      }
    });
  }

}); // Template.ratingSubmit.events

Template.ratingSubmit.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
