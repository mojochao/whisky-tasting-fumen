Template.notificationItem.helpers({

  notificationTastingPath: function () {
    return Router.routes.tastingPage.path({_id: this.tastingId});
  },

  notificationContent: function () {
    if (this.notificationType === "comment") {
      return "commented on your tasting"
    } else if (this.notificationType === "rating"){
      return "rated your tasting"
    }
  }

});

Template.notificationItem.events({

  'click a': function () {
    Notifications.update(this._id, {$set: {read: true}});
  }

});
