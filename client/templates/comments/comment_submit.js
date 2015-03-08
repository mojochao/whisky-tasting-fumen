Template.commentSubmit.created = function () {
  Session.set('commentSubmitErrors', {});
};

Template.commentSubmit.helpers({
  errorMessage: function (field) {
    return Session.get('commentSubmitErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentSubmitErrors')[field] ? 'has-error' : '';
  }
});

Template.commentSubmit.events({
  'submit form': function (evt, template) {
    evt.preventDefault();

    var $body = $(evt.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      tastingId: template.data._id
    };

    var errors = {};
    if (! comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentSubmitErrors', errors);
    }

    Meteor.call('commentInsert', comment, function (err, commentId) {
      if (err) {
        throwError(err.reason);
      } else {
        $body.val('');
      }
    });
  }
});
