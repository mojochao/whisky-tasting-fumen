Template.tastingPage.helpers({

  comments: function() {
    return Comments.find({
      tastingId: this._id
    });
  },

  isOwner: function() {
    return this.userId === Meteor.userId();
  }

});
