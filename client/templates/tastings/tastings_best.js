Template.tastingsBest.helpers({

  tastings: function () {
    return Tastings.find({ratingsNum: {'$gt': 0}}, {sort: {ratingsAvg: -1}});
  }

});

Template.tastingsBest.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
