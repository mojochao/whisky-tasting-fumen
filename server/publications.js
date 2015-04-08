Meteor.publish('tastings', function () {
  return Tastings.find();
});

Meteor.publish('tastingsNext', function (today) {
  var week = moment().startOf('day').add(7, 'days').toDate();
  return Tastings.find({when: {'$gte': today, '$lte': week}});
});

Meteor.publish('tastingsPast', function (today) {
  return Tastings.find({when: {'$lt': today}});
});

Meteor.publish('tastingsFuture', function (today) {
  return Tastings.find({when: {'$gte': today}});
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
