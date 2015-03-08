Notifications = new Mongo.Collection('notifications');

Notifications.allow({
  update: function (userId, doc, fieldNames) {
    return isOwner(userId, doc) &&
      fieldNames.length === 1 && fieldNames[0] === 'read';
  }
});

createCommentNotification = function (comment) {
  var tasting = Tastings.findOne(comment.tastingId);
  if (comment.userId !== tasting.userId) {
    Notifications.insert({
      userId: tasting.userId,
      tastingId: tasting._id,
      commentId: comment._id,
      commenterName: comment.author,
      read: false
    });
  }
};
