Meteor.publish('tastings', function () {
  return Tastings.find();
});

Meteor.publish('comments', function (tastingId) {
  check(tastingId, String);
  return Comments.find({tastingId: tastingId});
});
