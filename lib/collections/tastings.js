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
      'when', 'where', 'bottle', 'spirit', 'teaser').length > 0;
  }
});

Meteor.methods({

  tastingInsert: function (props) {
    // verify our tasting objects properties are as expected
    check(Meteor.userId(), String);
    check(props, {
      when: String,
      where: String,
      bottle: String,
      spirit: String,
      teaser: String
    });

    // extend the tasting object with server-side data
    var user = Meteor.user();
    var tasting = _.extend(props, {
      when: moment(props.when).toDate(),
      userId: user._id,
      host: user.username,
      submitted: new Date(),
      commentsCount: 0,
      ratingsNum: 0,
      ratingsSum: 0,
      ratingsMin: 0,
      ratingsMax: 0,
      ratingsAvg: null,
      rating: null
    });

    // insert the tasting object and return its allocated id
    var tastingId = Tastings.insert(tasting);
    return tastingId;
  }

});
