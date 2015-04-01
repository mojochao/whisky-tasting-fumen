Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return [
      Meteor.subscribe('tastings'),
      Meteor.subscribe('notifications')
    ];
  }
});

Router.route('/', {
  name: 'tastingsList'
});

Router.route('/future', {
  name: 'tastingsFuture'
});

Router.route('/past', {
  name: 'tastingsPast'
});

Router.route('/ratings', {
  name: 'ratingsList'
});

Router.route('/tastings/:_id', {
  name: 'tastingPage',
  data: function () {
    return Tastings.findOne(this.params._id);
  },
  waitOn: function () {
    return [
      Meteor.subscribe('comments', this.params._id),
      Meteor.subscribe('ratings', this.params._id)
    ];
  }
});

Router.route('/tastings/:_id/edit', {
  name: 'tastingEdit',
  data: function() {
    return Tastings.findOne(this.params._id);
  }
});

Router.route('/submit', {
  name: 'tastingSubmit'
});

Router.onBeforeAction('dataNotFound', {
  only: 'tastingPage'
});

var requireLogin = function () {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
};

Router.onBeforeAction(requireLogin, {
  only: 'tastingSubmit'
});
