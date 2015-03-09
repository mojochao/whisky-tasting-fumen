Participations = new Mongo.Collection('participations');

Meteor.methods({

  participationInsert: function (participationAttributes) {
    // verify participation doc data coming from client
    check(this.userId, String);
    check(participationAttributes, {
      tastingId: String
    });

    // ensure that a tasting doc exists for the participation
    var tasting = Tastings.findOne(participationAttributes.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-participation', 'You must participate on a tasting');

    // extend participation doc with trusted server data
    var user = Meteor.user();
    var participation = _.extend(participationAttributes, {
      userId: user._id,
      userName: user.username,
      submitted: new Date(),
      rating: null
    });

    // update the tasting doc with the number of Participations
    Tastings.update(participation.tastingId, {$inc: {ParticipationsCount: 1}});

    // add the new participation doc and a new notification of participation creation
    participation._id = Participations.insert(participation);
    createParticipationNotification(participation);

    // return new participation doc's id to client
    return participation._id;
  }

});
