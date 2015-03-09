Tastings = new Mongo.Collection('tastings');

Tastings.allow({

  update: function (userId, tasting) {
    return isOwner(userId, tasting);
  },

  remove: function (userId, tasting) {
    return isOwner(userId, tasting);
  }

});

Tastings.deny({
  update: function (userId, tasting, fieldNames) {
    // may only edit the following fields:
    return _.without(fieldNames,
      'when', 'where', 'liquor', 'bottle', 'teaser').length > 0;
  }
});

Meteor.methods({

  tastingInsert: function (tastingAttributes) {
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
      when: moment(tastingAttributes.when).toDate(),
      userId: user._id,
      host: user.username,
      submitted: new Date(),
      commentsCount: 0,
      participationsCount: 0
    });

    // insert the tasting object and return its allocated id
    var tastingId = Tastings.insert(tasting);
    return {
      _id: tastingId
    };
  }

});
