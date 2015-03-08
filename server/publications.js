Meteor.publish('tastings', function () {
  return Tastings.find();
});

Meteor.publish('comments', function () {
  return Comments.find();
});
