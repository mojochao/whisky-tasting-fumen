Template.tastingsFuture.helpers({

  tastings: function () {
    return Tastings.find({when: {'$gte': new Date()}}, {sort: {when: 1}});
  },

  noTastings: function () {
    return Tastings.find({when: {'$gte': new Date()}}).count() === 0;
  }

});
