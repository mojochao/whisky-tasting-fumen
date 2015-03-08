Template.tastingItem.helpers({

  isOwner: function() {
    return this.userId === Meteor.userId();
  }

});
