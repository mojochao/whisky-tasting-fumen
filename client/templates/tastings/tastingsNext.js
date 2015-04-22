Template.tastingsNext.helpers({
  noneAvailable: function () {
    return  Tastings.find().count() === 0;
  }
});
