Guests = new Mongo.Collection('guests');

Meteor.methods({

  guestInsert: function (guestAttributes) {
    // verify guest doc data coming from client
    check(this.userId, String);
    check(guestAttributes, {
      tastingId: String
    });

    // ensure that a tasting doc exists for the guest
    var tasting = Tastings.findOne(guestAttributes.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-guest', 'You must participate on a tasting');

    // extend guest doc with trusted server data
    var user = Meteor.user();
    var guest = _.extend(guestAttributes, {
      userId: user._id,
      userName: user.username,
      submitted: new Date(),
      rating: null
    });

    // update the tasting doc with the number of guests
    Tastings.update(guest.tastingId, {$inc: {GuestsCount: 1}});

    // add the new guest doc and a new notification of guest creation
    guest._id = Guests.insert(guest);
    createGuestotification(guest);

    // return new guest doc's id to client
    return guest._id;
  }

});
