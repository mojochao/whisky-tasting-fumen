Tastings = new Mongo.Collection('tastings');

Meteor.methods({

  tastingInsert: function(tastingAttributes) {
    // verify our tasting objects properties are as expected
    check(Meteor.userId(), String);
    check(tastingAttributes, {
      when: String,
      where: String,
      liquor: String,
      bottle: String,
      teaser: String
    });

    // extend the tasting object with creator and creation time info
    var user = Meteor.user();
    var tasting = _.extend(tastingAttributes, {
      userId: user._id,
      host: user.username,
      submitted: new Date()
    });

    // insert the tasting object and return its allocated id
    var tastingId = Tastings.insert(tasting);
    return {
      _id: tastingId
    };
  }

});
