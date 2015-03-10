Template.tastingsItem.helpers({

  whenFormatted: whenFormatted

});

Template.tastingsItem.events = {

  'click .tastings-item-select': function () {
    Router.go('tastingPage', {_id: this._id});
  }

};
