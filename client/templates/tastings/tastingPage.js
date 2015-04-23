Template.tastingPage.helpers({

  comments: function () {
    return Comments.find({
      tastingId: this._id
    });
  },

  ratings: function () {
    return Ratings.find({
      tastingId: this._id
    });
  },

  commentsText: function () {
    var count = this.commentsCount;
    var label = count.toString();
    return count === 1 ? label + ' comment' : label + ' comments';
  },

  ratingsText: function () {
    var count = this.ratingsNum;
    var label = count.toString();
    return count === 1 ? label + ' rating' : label + ' ratings';
  },

  isOwner: function () {
    return this.userId === Meteor.userId();
  },

  userRating: function () {
    return Ratings.findOne({
      tastingId: this._id,
      userId: Meteor.userId()
    });
  },

  tastingInProgress: function () {
    var now = new Date();
    return tastingInProgress(this, now);
  }

});

Template.tastingPage.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
