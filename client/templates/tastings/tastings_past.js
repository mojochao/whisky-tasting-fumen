Template.tastingsPast.helpers({

  tastings: function () {
    return Tastings.find({when: {'$lt': new Date()}});
  },

  noTastings: function () {
    return Tastings.find({when: {'$lt': new Date()}}).count() === 0;
  }

});
