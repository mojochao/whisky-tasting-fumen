Template.tastingsList.helpers({
  tastings: function () {
    return Tastings.find({}, {sort: {submitted: -1}});
  }
});
