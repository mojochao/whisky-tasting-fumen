Template.tastingsLast.helpers({
  noneAvailable: function () {
    return  Tastings.find().count() === 0;
  }
});
