Template.tastingsFuture.helpers({

  tastings: function () {
    return Tastings.find({when: {'$gte': new Date()}});
  },

  noTastings: function () {
    return Tastings.find({when: {'$gte': new Date()}}).count() === 0;
  }

});
