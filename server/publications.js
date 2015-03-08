Meteor.publish('tastings', function() {
  return Tastings.find();
});