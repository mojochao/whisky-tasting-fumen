Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return Meteor.subscribe('tastings');
  }
});

Router.route('/', {
  name: 'tastingsList'
});

Router.route('/tastings/:_id', {
  name: 'tastingPage',
  data: function () {
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
}

Router.onBeforeAction(requireLogin, {
  only: 'tastingSubmit'
});
