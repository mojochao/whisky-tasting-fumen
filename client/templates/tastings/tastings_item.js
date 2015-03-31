Template.tastingsItem.helpers({

  whenFormatted: whenFormatted

});

Template.tastingsItem.rendered = function () {
  // at .created() time, it's too early to run rateit(), so run it
  // at .rendered() time.
  this.$('.rateit').rateit();
}


Template.tastingsItem.events = {

  'click .tastings-item-select': function () {
    Router.go('tastingPage', {_id: this._id});
  }

};
