Template.tastingsNext.helpers({

  tastings: function () {
    var begin = moment().toDate();
    var end = moment().add(7, 'days').toDate();
    return Tastings.find({when: {'$gte': begin, '$lte': end}}, {sort: {when: 1}});
  }

});
