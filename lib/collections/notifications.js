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
      userName: comment.author,
      notificationType: "comment",
      tastingId: tasting._id,
      commentId: comment._id,
      read: false
    });
  }
};

createParticipationNotification = function (participation) {
  var tasting = Tastings.findOne(participation.tastingId);
  if (participation.userId !== tasting.userId) {
    Notifications.insert({
      userId: tasting.userId,
      userName: participation.userName,
      notificationType: "participation",
      tastingId: tasting._id,
      participationId: participation._id,
      read: false
    });
  }
};
