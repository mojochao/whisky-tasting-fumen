Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function () {
    return Meteor.subscribe('notifications')
  }
});

Router.route('/next', {
  name: 'tastingsNext',
  waitOn: function () {
    var today = moment().startOf('day').toDate();
    return Meteor.subscribe('tastingsNext', today);
  },
  data: function () {
    return {
      tastings: Tastings.find()
    };
  }
});

Router.route('/future', {
  name: 'tastingsFuture',
  waitOn: function () {
    var today = moment().startOf('day').toDate();
    return Meteor.subscribe('tastingsFuture', today);
  },
  data: function () {
    return {
      tastings: Tastings.find()
    };
  }
});

Router.route('/past', {
  name: 'tastingsPast',
  waitOn: function () {
    var today = moment().startOf('day').toDate();
    return Meteor.subscribe('tastingsPast', today);
  },
  data: function () {
    return {
      tastings: Tastings.find()
    };
  }
});

Router.route('/best', {
  name: 'tastingsBest',
  waitOn: function () {
    return Meteor.subscribe('tastingsBest');
  },
  data: function () {
    return {
      tastings: Tastings.find()
    };
  }
});

Router.route('/worst', {
  name: 'tastingsWorst',
  waitOn: function () {
    return Meteor.subscribe('tastingsWorst');
  },
  data: function () {
    return {
      tastings: Tastings.find()
    };
  }
});

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

Router.route('/submit', {
  name: 'tastingSubmit'
});

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
