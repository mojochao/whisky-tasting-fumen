// create some test users
if (Meteor.users.find().count() === 0) {
  var userIdAllen = Users.createUser({
    username: 'allen',
    password: 'password'
  });
  var userIdBryan = Users.createUser({
    username: 'bryan',
    password: 'password'
  });
  var userIdCatherine = Users.createUser({
    username: 'catherine',
    password: 'password'
  });
  var userIdDanielle = Users.createUser({
    username: 'danielle',
    password: 'password'
  });
}

// create some test tastings
if (Meteor.tastings.find().count() === 0) {
  var pastTasting1 = Tastings.create({
    _id = userIdAllen,
    when: '',
    where: 'Heroes & Legacies',
    bottle: 'Pyrat Reserve',
    spirit: 'Rum'
    teaser: 'Cuz pirates, yo!'
  })
}