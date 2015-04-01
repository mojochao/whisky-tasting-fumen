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
      userName: comment.submitter,
      notificationType: "comment",
      tastingId: tasting._id,
      commentId: comment._id,
      read: false
    });
  }
};

createRatingNotification = function (rating) {
  var tasting = Tastings.findOne(rating.tastingId);
  if (rating.userId !== tasting.userId) {
    Notifications.insert({
      userId: tasting.userId,
      userName: rating.submitter,
      notificationType: "rating",
      tastingId: tasting._id,
      ratingId: rating._id,
      score: rating.score,
      read: false
    });
  }
};
