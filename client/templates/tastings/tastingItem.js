Template.tastingItem.helpers({

  teaserContent: function () {
    return this.teaser.length <= 120 ? this.teaser : this.teaser.replace(/^(.{120}[^\s]*).*/, "$1") + ' ....';
  },

  isOwner: function () {
    return this.userId === Meteor.userId();
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

  whenFormatted: whenFormatted

});

Template.tastingItem.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
};

Template.tastingItem.events = {

  'click .tastings-item-select': function () {
    Router.go('tastingPage', {_id: this._id});
  }

};
