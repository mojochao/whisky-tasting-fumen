Template.tastingsFuture.helpers({
  tastings: function () {
    return Tastings.find({}, {sort: {submitted: -1}});
  }
});
