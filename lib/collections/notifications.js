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

createGuestNotification = function (guest) {
  var tasting = Tastings.findOne(guest.tastingId);
  if (guest.userId !== tasting.userId) {
    Notifications.insert({
      userId: tasting.userId,
      userName: guest.userName,
      notificationType: "guest",
      tastingId: tasting._id,
      guestId: guest._id,
      read: false
    });
  }
};
