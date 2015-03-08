Template.tastingItem.helpers({

  owns: function() {
    return this.userId === Meteor.userId();
  },

  commentsCount: function() {
    return Comments.find({tastingId: this._id}).count();
  }

});
