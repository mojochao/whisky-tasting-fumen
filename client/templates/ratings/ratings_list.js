Template.ratingsList.helpers({

  tastings: function () {
    return Tastings.find({when: {'$lt': new Date()}}, {sort: {when: -1}});
  },

  noTastings: function () {
    return Tastings.find({when: {'$lt': new Date()}}).count() === 0;
  }

});
