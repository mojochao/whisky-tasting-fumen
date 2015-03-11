Template.ratingsItem.helpers({

});

Template.ratingsItem.events = {

  'click .ratings-item-select': function () {
    Router.go('tastingPage', {_id: this._id});
  }

};
