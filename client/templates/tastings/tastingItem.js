Template.tastingItem.helpers({

  isEditable: function () {
    return this.userId === Meteor.userId() && !tastingHasOpened(this)
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
