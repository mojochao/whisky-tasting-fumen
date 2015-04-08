Meteor.publish('tastings', function () {
  return Tastings.find();
});

Meteor.publish('comments', function (tastingId) {
  check(tastingId, String);
  return Comments.find({tastingId: tastingId});
});

Meteor.publish('ratings', function (tastingId) {
  check(tastingId, String);
  return Ratings.find({tastingId: tastingId});
});

Meteor.publish('notifications', function () {
  return Notifications.find({userId: this.userId, read: false});
});
