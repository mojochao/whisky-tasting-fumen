Template.tastingItem.helpers({

  owns: function() {
    return this.userId === Meteor.userId();
  }

});
