Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return Meteor.subscribe('notifications')
  }
});

/**
 * Abstract base controller for all tastings list routes.
 */
TastingsBaseController = RouteController.extend({
  increment: 5,
  limit: function() {
    return parseInt(this.params.limit) || this.increment;
  },
  tastings: function() {
    return Tastings.find({}, {limit: this.limit()});
  },
  data: function () {
    var hasMore = this.tastings().count() === this.limit();
    console.log(hasMore);
    var nextPath = this.route.path({limit: this.limit() + this.increment});
    console.log(nextPath);
    return {
      tastings: this.tastings(),
      ready: this.tastingsSub.ready,
      nextPath: hasMore ? nextPath : null
    };
  }
});

/**
 * Controller for 'next' tastings route.
 */
TastingsNextController = TastingsBaseController.extend({
  template: 'tastingsNext',
  subscriptions: function () {
    var today = moment().startOf('day').toDate();
    this.tastingsSub = Meteor.subscribe('tastingsNext', today, this.limit());
  }
});

Router.route('/next/:limit?', {
  name: 'tastingsNext'
});

/**
 * Controller for 'past' tastings route.
 */
TastingsPastController = TastingsBaseController.extend({
  template: 'tastingsPast',
  subscriptions: function () {
    var today = moment().startOf('day').toDate();
    this.tastingsSub = Meteor.subscribe('tastingsPast', today, this.limit());
  }
});

Router.route('/past/:limit?', {
  name: 'tastingsPast'
});

/**
 * Controller for 'future' tastings route.
 */
TastingsFutureController = TastingsBaseController.extend({
  template: 'tastingsFuture',
  subscriptions: function () {
    var today = moment().startOf('day').toDate();
    this.tastingsSub = Meteor.subscribe('tastingsFuture', today, this.limit());
  }
});

Router.route('/future/:limit?', {
  name: 'tastingsFuture'
});

/**
 * Controller for 'best tastings route.
 */
TastingsBestController = TastingsBaseController.extend({
  template: 'tastingsBest',
  tastings: function() {
    return Tastings.find({}, {sort: {ratingsAvg: -1}, limit: this.limit()});
  },
  subscriptions: function () {
    this.tastingsSub = Meteor.subscribe('tastingsRated', this.limit());
  }
});

Router.route('/best/:limit?', {
  name: 'tastingsBest'
});

/**
 * Controller for 'best tastings route.
 */
TastingsWorstController = TastingsBaseController.extend({
  template: 'tastingsWorst',
  tastings: function() {
    return Tastings.find({}, {sort: {ratingsAvg: 1}, limit: this.limit()});
  },
  subscriptions: function () {
    this.tastingsSub = Meteor.subscribe('tastingsRated', this.limit());
  }
});

Router.route('/worst/:limit?', {
  name: 'tastingsWorst'
});

/**
 * Route for 'tastings' item route.
 */
Router.route('/tastings/:_id', {
  name: 'tastingPage',
  waitOn: function () {
    return [
      Meteor.subscribe('tasting', this.params._id),
      Meteor.subscribe('comments', this.params._id),
      Meteor.subscribe('ratings', this.params._id)
    ];
  },
  data: function () {
    return Tastings.findOne(this.params._id);
  }
});

/**
 * Route for 'tastings' item edit route.
 */
Router.route('/tastings/:_id/edit', {
  name: 'tastingEdit',
  waitOn: function () {
    return [
      Meteor.subscribe('tasting', this.params._id)
    ];
  },
  data: function () {
    return Tastings.findOne(this.params._id);
  }
});

/**
 * Route for 'tastings' item submit route.
 */
Router.route('/submit', {
  name: 'tastingSubmit'
});

/**
 * Alias route for '/' top route.
 */
Router.route('/', function () {
  Router.go('/next');
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
