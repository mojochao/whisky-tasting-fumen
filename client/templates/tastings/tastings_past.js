Template.tastingsPast.helpers({

  tastings: function () {
    var cutoff = new moment().subtract(1, 'days');
    return Tastings.find({}, {
      when: { $gte: cutoff },
      sort: { submitted: -1 }
    });
  }

});
