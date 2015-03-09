Template.notifications.helpers({

  notifications: function () {
    return Notifications.find({userId: Meteor.userId(), read: false});
  },

  notificationCount: function () {
    return Notifications.find({userId: Meteor.userId(), read: false}).count();
  }

});

Template.notificationItem.helpers({

  notificationTastingPath: function () {
    return Router.routes.tastingPage.path({_id: this.tastingId});
  },

  notificationContent: function () {
    if (this.notificationType === "comment") {
      return "commented on your tasting."
    } else if (this.notificationType === "participation"){
      return "is participating in your tasting."
    }
  }

});

Template.notificationItem.events({

  'click a': function () {
    Notifications.update(this._id, {$set: {read: true}});
  }

});
