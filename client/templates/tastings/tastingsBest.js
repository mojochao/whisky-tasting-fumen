Template.tastingsBest.helpers({
  noneAvailable: function () {
    return  Tastings.find().count() === 0;
  }
});

Template.tastingsBest.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
