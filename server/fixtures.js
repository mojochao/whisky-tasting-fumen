// create some test users
if (Meteor.users.find().count() === 0) {
  var user1Id = Meteor.users.insert({
    username: 'allen'
  });
  Accounts.setPassword(user1Id, 'password')
  var user1 = Meteor.users.findOne(user1Id);

  var user2Id = Meteor.users.insert({
    username: 'danielle'
  });
  Accounts.setPassword(user2Id, 'password')
  var user2 = Meteor.users.findOne(user2Id);

  var user3Id = Meteor.users.insert({
    username: 'william'
  });
  Accounts.setPassword(user3Id, 'password')
  var user3 = Meteor.users.findOne(user3Id);

  var user4Id = Meteor.users.insert({
    username: 'catherine'
  });
  Accounts.setPassword(user4Id, 'password')
  var user4 = Meteor.users.findOne(user4Id);
}

// create some test tastings
if (Tastings.find().count() === 0) {
  var tasting1Id = Tastings.insert({
    userId: user1._id,
    host: user1.username,
    submitted: new Date('2015-03-29T23:00:00Z'),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date('2015-04-01T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Pyrat Reserve',
    spirit: 'Rum',
    teaser: 'Cuz pirates, yo!'
  });
  var tasting1 = Tastings.findOne(tasting1Id);

  var tasting2Id = Tastings.insert({
    _id: user3._id,
    host: user3.username,
    submitted: new Date('2015-03-30T23:00:00Z'),
    commentsCount: 3,
    ratingsCount: 2,
    ratingsTotal: 5,
    when: new Date('2015-04-01T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Grey Goose',
    spirit: 'Vodka',
    teaser: 'Clean and clear'
  });
  var tasting2 = Tastings.findOne(tasting2Id);

  var tasting3Id = Tastings.insert({
    userId: user1._id,
    host: user1.username,
    submitted: new Date('2015-03-31T23:00:00Z'),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date('2015-04-08T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve',
    spirit: 'Bourbon',
    teaser: 'In addition to the rye...'
  });
  var tasting3 = Tastings.findOne(tasting3Id);

  var tasting4Id = Tastings.insert({
    userId: user4._id,
    host: user4.username,
    submitted: new Date('2015-04-08T23:00:01Z'),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date('2015-04-08T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Willet Reserve 12 Year',
    spirit: 'Rye',
    teaser: 'Better than bourbon'
  });
  var tasting4 = Tastings.findOne(tasting4Id);

  var tasting5Id = Tastings.insert({
    userId: user3._id,
    host: user3.username,
    submitted: new Date('2015-04-14T23:00:00Z'),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date('2015-04-15T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Woodford',
    spirit: 'Bourbon',
    teaser: 'Not too shabby'
  });
  var tasting5 = Tastings.findOne(tasting5Id);

  var tasting6Id = Tastings.insert({
    userId: user3._id,
    host: user3.username,
    submitted: new Date('2015-04-07T23:01:00Z'),
    commentsCount: 0,
    ratingsCount: 0,
    ratingsTotal: 0,
    when: new Date('2015-04-15T23:00:00Z'),
    where: 'Heroes & Legacies',
    bottle: 'Woodford Reserve',
    spirit: 'Bourbon',
    teaser: 'Better than shabby'
  });
  var tasting6 = Tastings.findOne(tasting6Id);
}

// create some test ratings for past tasting 1
if (Ratings.find().count() === 0) {
  Ratings.insert({
    tastingId: tasting2._id,
    userId: user1._id,
    submitter: user1.username,
    submitted: new Date('2015-03-24T23:00:00Z'),
    score: 2
  });

  Ratings.insert({
    tastingId: tasting2._id,
    userId: user4._id,
    submitter: user4.username,
    submitted: new Date('2015-03-24T23:00:00Z'),
    score: 3
  });
}

// create some test comments for past tasting 1
if (Comments.find().count() === 0) {
  Comments.insert({
    tastingId: tasting2._id,
    userId: user1._id,
    submitter: user1.username,
    submitted: new Date('2015-03-24T23:00:00Z'),
    body: 'what does this cost?'
  });

  Comments.insert({
    tastingId: tasting2._id,
    userId: user3._id,
    submitter: user3.username,
    submitted: new Date('2015-03-24T23:00:00Z'),
    body: 'one hundred gazillion dollars'
  });

  Comments.insert({
    tastingId: tasting2._id,
    userId: user4._id,
    submitter: user4.username,
    submitted: new Date('2015-03-24T23:00:00Z'),
    body: 'not worth THAT much'
  });
}
