Template.tastingsList.helpers({

  tastings: function () {
    var begin = moment().day(0).hour(0).minute(0).seconds(0).toDate();
    var end = moment().day(6).hour(23).minutes(59).seconds(59).toDate();
    return Tastings.find({when: {'$gte': begin, '$lte': end}}, {sort: {when: 1}});
  },

  noTastings: function () {
    var begin = moment().day(0).hour(0).minute(0).seconds(0).toDate();
    var end = moment().day(6).hour(23).minutes(59).seconds(59).toDate();
    return Tastings.find({when: {'$gte': begin, '$lte': end}}, {sort: {when: 1}}).count() === 0;
  }

});
