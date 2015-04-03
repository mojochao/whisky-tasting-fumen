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

  ratingsAverage: function () {
    return this.ratingsCount === 0 ? null : this.ratingsTotal / this.ratingsCount;
  },

  userRating: function () {
    return Ratings.findOne({
      tastingId: this._id,
      userId: Meteor.userId()
    });
  },

  isOwner: function () {
    return this.userId === Meteor.userId();
  },

  whenFormatted: whenFormatted

});

Template.tastingPage.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};
