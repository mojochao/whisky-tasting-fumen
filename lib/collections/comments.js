Comments = new Mongo.Collection('comments');

Meteor.methods({

  commentInsert: function (commentAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      tastingId: String,
      body: String
    });

    var tasting = Tastings.findOne(commentAttributes.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-comment', 'You must comment on a tasting');

    var user = Meteor.user();
    var comment = _.extend(commentAttributes, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });
    
    return Comments.insert(comment);
  }

});
