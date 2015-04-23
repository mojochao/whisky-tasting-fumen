Meteor.publish('tasting', function (tastingId) {
  check(tastingId, String);
  return Tastings.find(tastingId);
});

Meteor.publish('tastingsNext', function (today, limit) {
  check(today, Date);
  check(limit, Number);
  return Tastings.find({when: {'$gte': today}}, {sort: {when: 1}, limit: limit});
});

Meteor.publish('tastingsLast', function (today, limit) {
  check(today, Date);
  check(limit, Number);
  return Tastings.find({when: {'$lt': today}}, {sort: {when: -1}, limit: limit});
});

Meteor.publish('tastingsRated', function (limit) {
  check(limit, Number);
  return Tastings.find({ratingsAvg: {'$ne':  null}}, {limit: limit});
});

//Meteor.publish('tastingsBest', function (limit) {
//  return Tastings.find({ratingsAvg: {'$ne':  null}}, {sort: {ratingsAvg: -1}, limit: limit});
//});
//
//Meteor.publish('tastingsWorst', function (limit) {
//  return Tastings.find({ratingsAvg: {'$ne':  null}}, {sort: {ratingsAvg: 1}, limit: limit});
//});

Meteor.publish('comments', function (tastingId) {
  check(tastingId, String);
  return Comments.find({tastingId: tastingId});
});

Meteor.publish('ratings', function (tastingId) {
  check(tastingId, String);
  return Ratings.find({tastingId: tastingId});
});
