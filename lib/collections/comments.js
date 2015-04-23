Comments = new Mongo.Collection('comments');

Meteor.methods({

  commentInsert: function (props) {
    // verify comment doc data coming from client
    check(this.userId, String);
    check(props, {
      tastingId: String,
      body: String
    });

    // ensure that a tasting doc exists for the comment
    var tasting = Tastings.findOne(props.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-comment', 'You must comment on a tasting');

    // ensure that the tasting is in progress
    var now = new Date();
    var inProgress = tastingInProgress(tasting, now);
    if (! inProgress) {
      throw new Meteor.Error('invalid-comment', 'This tasting is closed for comments.')
    }

    // extend comment doc with trusted server data
    var user = Meteor.user();
    var comment = _.extend(props, {
      userId: user._id,
      submitter: user.profile.name,
      submitted: new Date()
    });

    // update the tasting doc with the number of comments
    Tastings.update(comment.tastingId, {$inc: {commentsCount: 1}});

    // add the new comment doc and a new notification of comment creation
    comment._id = Comments.insert(comment);
    createCommentNotification(comment);

    // return new comment doc's id to client
    return comment._id;
  }

});
