Comments = new Mongo.Collection('comments');

Meteor.methods({

  commentInsert: function (commentAttributes) {
    // verify comment doc data coming from client
    check(this.userId, String);
    check(commentAttributes, {
      tastingId: String,
      body: String
    });

    // ensure that a tasting doc exists for the comment
    var tasting = Tastings.findOne(commentAttributes.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-comment', 'You must comment on a tasting');

    // extend comment doc with trusted server data
    var user = Meteor.user();
    var comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // update the tasting doc with the number of comments
    Tastings.update(comment.tastingId, {$inc: {commentsCount: 1}});

    // add the new comment doc
    return Comments.insert(comment);
  }

});
