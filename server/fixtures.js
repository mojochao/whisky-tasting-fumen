// create some test users
if (Meteor.users.find().count() === 0) {
  var userIdAllen = Meteor.users.insert({
    username: 'allen'
  });
  Accounts.setPassword(userIdAllen, 'password')
  var userAllen = Meteor.users.findOne(userIdAllen);

  var userIdDanielle = Meteor.users.insert({
    username: 'danielle'
  });
  Accounts.setPassword(userIdDanielle, 'password')
  var userDanielle = Meteor.users.findOne(userIdDanielle);

  var userIdWilliam = Meteor.users.insert({
    username: 'william'
  });
  Accounts.setPassword(userIdWilliam, 'password')
  var userWilliam = Meteor.users.findOne(userIdWilliam);

  var userIdCatherine = Meteor.users.insert({
    username: 'catherine'
  });
  Accounts.setPassword(userIdCatherine, 'password')
  var userCatherine = Meteor.users.findOne(userIdCatherine);
}

// create some test tastings
if (Tastings.find().count() === 0) {
  var pastTasting1Id = Tastings.insert({
    userId: userIdAllen,
    host: userAllen.username,
    submitted: new Date("2015-03-24T23:00:00Z"),
    commentsCount: 0,
    ratingsCount: 2,
    ratingsTotal: 5,
    when: new Date("2015-03-25T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Pyrat Reserve',
    spirit: 'Rum',
    teaser: 'Cuz pirates, yo!'
  });
  var pastTasting1 = Tastings.findOne(pastTasting1Id);

  var pastTasting2Id = Tastings.insert({
    _id: userIdWilliam,
    host: userWilliam.username,
    submitted: new Date("2015-03-17T23:00:00Z"),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date("2015-03-18T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Grey Goose',
    spirit: 'Vodka',
    teaser: 'Clean and clear'
  });
  var pastTasting2 = Tastings.findOne(pastTasting2Id);

  var nextTasting1Id = Tastings.insert({
    userId: userIdAllen,
    host: userAllen.username,
    submitted: new Date("2015-03-31T23:00:00Z"),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date("2015-04-01T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve',
    spirit: 'Bourbon',
    teaser: 'In addition to the rye...'
  });
  var nextTasting1 = Tastings.findOne(nextTasting1Id);

  var nextTasting2Id = Tastings.insert({
    userId: userIdCatherine,
    host: userCatherine.username,
    submitted: new Date("2015-03-31T23:00:01Z"),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date("2015-04-01T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve 12 Year',
    spirit: 'Rye',
    teaser: 'Better than bourbon'
  });
  var nextTasting2 = Tastings.findOne(nextTasting2Id);

  var futureTasting1Id = Tastings.insert({
    userId: userIdWilliam,
    host: userWilliam.username,
    submitted: new Date("2015-04-07T23:00:00Z"),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date("2015-04-08T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Woodford',
    spirit: 'Bourbon',
    teaser: 'Not too shabby'
  });
  var futureTasting1 = Tastings.findOne(futureTasting1Id);

  var futureTasting2Id = Tastings.insert({
    userId: userIdWilliam,
    host: userWilliam.username,
    submitted: new Date("2015-04-07T23:01:00Z"),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date("2015-04-08T23:00:00Z"),
    where: 'Heroes & Legacies',
    bottle: 'Woodford Reserve',
    spirit: 'Bourbon',
    teaser: 'Better than shabby'
  });
  var futureTasting2 = Tastings.findOne(futureTasting2Id);
}

// create some test ratings for past tasting 1
if (Ratings.find().count() === 0) {
  Ratings.insert({
    tastingId: pastTasting1Id,
    userId: userIdWilliam,
    submitter: userWilliam.username,
    submitted: new Date("2015-03-24T23:00:00Z"),
    score: 2
  });

  Ratings.insert({
    tastingId: pastTasting1Id,
    userId: userIdCatherine,
    submitter: userCatherine.username,
    submitted: new Date("2015-03-24T23:00:00Z"),
    score: 3
  });
}
