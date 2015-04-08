Template.tastingsPast.helpers({

  tastings: function () {
    return Tastings.find({when: {'$lt': new Date()}}, {sort: {when: -1}});
  }

});
