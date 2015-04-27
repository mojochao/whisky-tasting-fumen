// create some test users if in development environment
if (process.env.USE_FIXTURES) {

  if (Meteor.users.find().count() === 0) {
    var user1Id = Meteor.users.insert({
      username: 'allen',
      email: 'allen@nonesuch.com',
      profile: {
        first_name: 'Allen',
        last_name: 'Doe'
      }
    });
    Accounts.setPassword(user1Id, 'password')
    var user1 = Meteor.users.findOne(user1Id);

    var user2Id = Meteor.users.insert({
      username: 'danielle',
      email: 'danielle@nonesuch.com',
      profile: {
        first_name: 'Danielle',
        last_name: 'Doe'
      }
    });
    Accounts.setPassword(user2Id, 'password')
    var user2 = Meteor.users.findOne(user2Id);

    var user3Id = Meteor.users.insert({
      username: 'william',
      email: 'william@nonesuch.com',
      profile: {
        first_name: 'William',
        last_name: 'Doe'
      }
    });
    Accounts.setPassword(user3Id, 'password')
    var user3 = Meteor.users.findOne(user3Id);

    var user4Id = Meteor.users.insert({
      username: 'catherine',
      email: 'catherine@nonesuch.com',
      profile: {
        first_name: 'Catherine',
        last_name: 'Doe'
      }
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
      when: new Date('2015-04-01T23:00:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Pyrat Reserve',
      spirit: 'Rum',
      teaser: 'Cuz pirates, yo!',
      commentsCount: 0,
      ratingsNum: 3,
      ratingsSum: 10,
      ratingsMin: 3,
      ratingsMax: 4,
      ratingsAvg: 3.333
    });
    var tasting1 = Tastings.findOne(tasting1Id);

    var tasting2Id = Tastings.insert({
      _id: user3._id,
      host: user3.username,
      submitted: new Date('2015-03-30T23:00:00Z'),
      when: new Date('2015-03-25T23:00:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Grey Goose',
      spirit: 'Vodka',
      teaser: 'Clean and clear',
      commentsCount: 3,
      ratingsNum: 2,
      ratingsSum: 5,
      ratingsMin: 2,
      ratingsMax: 3,
      ratingsAvg: 2.5
    });
    var tasting2 = Tastings.findOne(tasting2Id);

    var tasting3Id = Tastings.insert({
      userId: user1._id,
      host: user1.username,
      submitted: new Date('2015-03-31T23:00:00Z'),
      when: new Date('2015-04-08T23:00:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Willet Reserve',
      spirit: 'Bourbon',
      teaser: 'In addition to the rye...',
      commentsCount: 0,
      ratingsNum: 0,
      ratingsSum: 0,
      ratingsMin: 0,
      ratingsMax: 0,
      ratingsAvg: null
    });
    var tasting3 = Tastings.findOne(tasting3Id);

    var tasting4Id = Tastings.insert({
      userId: user4._id,
      host: user4.username,
      submitted: new Date('2015-04-08T23:00:01Z'),
      when: new Date('2015-04-08T23:30:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Willet Reserve 12 Year',
      spirit: 'Rye',
      teaser: 'Better than bourbon',
      commentsCount: 0,
      ratingsNum: 0,
      ratingsSum: 0,
      ratingsMin: 0,
      ratingsMax: 0,
      ratingsAvg: null
    });
    var tasting4 = Tastings.findOne(tasting4Id);

    var tasting5Id = Tastings.insert({
      userId: user3._id,
      host: user3.username,
      submitted: new Date('2015-04-14T23:00:00Z'),
      when: new Date('2015-04-15T23:00:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Woodford',
      spirit: 'Bourbon',
      teaser: 'Not too shabby',
      commentsCount: 0,
      ratingsNum: 0,
      ratingsSum: 0,
      ratingsMin: 0,
      ratingsMax: 0,
      ratingsAvg: null
    });
    var tasting5 = Tastings.findOne(tasting5Id);

    var tasting6Id = Tastings.insert({
      userId: user3._id,
      host: user3.username,
      submitted: new Date('2015-04-07T23:01:00Z'),
      when: new Date('2015-04-22T23:00:00Z'),
      where: 'Heroes & Legacies',
      bottle: 'Woodford Reserve',
      spirit: 'Bourbon',
      teaser: 'Better than shabby',
      commentsCount: 0,
      ratingsNum: 0,
      ratingsSum: 0,
      ratingsMin: 0,
      ratingsMax: 0,
      ratingsAvg: null
    });
    var tasting6 = Tastings.findOne(tasting6Id);

    for (var i = 0; i < 13; i++) {
      Tastings.insert({
        userId: user1._id,
        host: user1.username,
        submitted: new Date('2015-04-07T23:01:00Z'),
        when: new Date('2015-04-01T23:00:00Z'),
        where: 'Heroes & Legacies',
        bottle: 'Jim Beam Last',
        spirit: 'Bourbon',
        teaser: 'Rotgut',
        commentsCount: 0,
        ratingsNum: 0,
        ratingsSum: 0,
        ratingsMin: 0,
        ratingsMax: 0,
        ratingsAvg: null
      });
      Tastings.insert({
        userId: user1._id,
        host: user1.username,
        submitted: new Date('2015-04-07T23:01:00Z'),
        when: new Date('2015-04-28T23:00:00Z'),
        where: 'Heroes & Legacies',
        bottle: 'Jim Beam Next',
        spirit: 'Bourbon',
        teaser: 'Rotgut',
        commentsCount: 0,
        ratingsNum: 0,
        ratingsSum: 0,
        ratingsMin: 0,
        ratingsMax: 0,
        ratingsAvg: null
      });
    }
  }

// create some test ratings for last tasting 1
  if (Ratings.find().count() === 0) {
    Ratings.insert({
      tastingId: tasting1._id,
      userId: user1._id,
      submitter: user1.username,
      submitted: new Date('2015-03-24T23:00:00Z'),
      score: 3
    });

    Ratings.insert({
      tastingId: tasting1._id,
      userId: user3._id,
      submitter: user3.username,
      submitted: new Date('2015-03-24T23:00:00Z'),
      score: 4
    });

    Ratings.insert({
      tastingId: tasting1._id,
      userId: user4._id,
      submitter: user4.username,
      submitted: new Date('2015-03-24T23:00:00Z'),
      score: 3
    });

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

// create some test comments for last tasting 1
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

} // if (process.env.USE_FIXTURES)
