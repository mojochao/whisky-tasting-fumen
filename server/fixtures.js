// create some test users
if (Meteor.users.find().count() === 0) {
  var useridAllen = Meteor.users.insert({
    username: 'allen'
  });
  Accounts.setPassword(useridAllen, 'password')
  var userAllen = Meteor.users.findOne(useridAllen);

  var useridBryan = Meteor.users.insert({
    username: 'bryan'
  });
  Accounts.setPassword(useridBryan, 'password')
  var userBryan = Meteor.users.findOne(useridBryan);

  var useridCatherine = Meteor.users.insert({
    username: 'catherine'
  });
  Accounts.setPassword(useridCatherine, 'password')
  var userCatherine = Meteor.users.findOne(useridCatherine);
}

// create some test tastings
if (Tastings.find().count() === 0) {
  var pastTasting1 = Tastings.insert({
    userId: useridAllen,
    host: userAllen.username,
    submitted: new Date("2015-03-24T23:00:00Z"),
    commentsCount: 0,
    when: new Date("2015-03-25T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Pyrat Reserve',
    spirit: 'Rum',
    teaser: 'Cuz pirates, yo!'
  });
  var pastTasting2 = Tastings.insert({
    _id: useridBryan,
    host: userBryan.username,
    submitted: new Date("2015-03-17T23:00:00Z"),
    commentsCount: 0,
    when: new Date("2015-03-18T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Grey Goose',
    spirit: 'Vodka',
    teaser: 'Clean and clear'
  });
  var nextTasting1 = Tastings.insert({
    userId: useridAllen,
    host: userAllen.username,
    submitted: new Date("2015-03-31T23:00:00Z"),
    commentsCount: 0,
    when: new Date("2015-04-01T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve',
    spirit: 'Bourbon',
    teaser: 'In addition to the rye...'
  });
  var nextTasting2 = Tastings.insert({
    userId: useridCatherine,
    host: userCatherine.username,
    submitted: new Date("2015-03-31T23:00:01Z"),
    commentsCount: 0,
    when: new Date("2015-04-01T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve 12 Year',
    spirit: 'Rye',
    teaser: 'Better than bourbon'
  });
  var futureTasting1 = Tastings.insert({
    userId: useridBryan,
    host: userBryan.username,
    submitted: new Date("2015-04-07T23:00:00Z"),
    commentsCount: 0,
    when: new Date("2015-04-08T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Woodford',
    spirit: 'Bourbon',
    teaser: 'Not too shabby'
  });
  var futureTasting2 = Tastings.insert({
    userId: useridBryan,
    host: userBryan.username,
    submitted: new Date("2015-04-07T23:01:00Z"),
    commentsCount: 0,
    when: new Date("2015-04-08T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Woodford Reserve',
    spirit: 'Bourbon',
    teaser: 'Better than shabby'
  });
}
