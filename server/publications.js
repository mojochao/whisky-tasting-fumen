Meteor.publish('tasting', function (tastingId) {
  return Tastings.find(tastingId);
});

Meteor.publish('tastingsNext', function (today) {
  var week = moment().startOf('day').add(7, 'days').toDate();
  return Tastings.find({when: {'$gte': today, '$lte': week}}, {sort: {when: 1}});
});

Meteor.publish('tastingsPast', function (today) {
  return Tastings.find({when: {'$lt': today}}, {sort: {when: 1}});
});

Meteor.publish('tastingsFuture', function (today) {
  return Tastings.find({when: {'$gte': today}}, {sort: {when: 1}});
});

Meteor.publish('tastingsBest', function () {
  return Tastings.find({}, {sort: {ratingsAvg: 1}});
});

Meteor.publish('tastingsWorst', function () {
  return Tastings.find({}, {sort: {ratingsAvg: 1}});
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
