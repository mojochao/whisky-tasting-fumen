Template.ratingItem.helpers({

  submittedText: function () {
    return this.submitted.toString();
  }

});

Template.ratingItem.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
