Ratings = new Mongo.Collection("ratings");

Meteor.methods({

  ratingInsert: function (fields) {
    // verify ratings form fields coming from client
    check(this.userId, String);
    check(fields, {
      tastingId: String,
      score: Number
    });

    // ensure that a tasting doc exists to be rated
    var tasting = Tastings.findOne({_id: fields.tastingId});
    if (!tasting) {
      throw new Meteor.Error('invalid-rating', 'You must rate an existing tasting');
    }

    // ensure that the user has not already rated
    var user = Meteor.user();
    var priorRating = Ratings.findOne({tastingId: fields.tastingId, userId: user._id});
    if (priorRating) {
      throw new Meteor.Error('invalid-rating', 'You have already rated this tasting')
    }

    // ensure that the tasting is in progress
    var now = new Date();
    var inProgress = tastingInProgress(tasting, now);
    if (! inProgress) {
      throw new Meteor.Error('invalid-rating', 'This tasting is closed for ratings.')
    }

    // create a new rating containing data from the client plus some
    // creator/creation metadata
    var rating = _.extend(fields, {
      userId: user._id,
      submitter: user.username,
      submitted: new Date()
    });

    // add the new rating doc
    rating._id = Ratings.insert(rating);

    // compute the new ratings stats and update the tasting doc with them
    var ratings = Ratings.find({tastingId: fields.tastingId}).fetch();
    var ratingsSum = _.reduce(ratings, function (sum, obj) { return sum + obj.score; }, 0);
    var ratingsAvg = round(ratingsSum / (tasting.ratingsNum + 1), 3);
    var ratingsMin = rating.score < tasting.ratingsMin ? rating.score : tasting.ratingsMin;
    var ratingsMax = rating.score > tasting.ratingsMax ? rating.score : tasting.ratingsMax;

    Tastings.update(rating.tastingId, {
      $inc: {
        ratingsNum: 1
      },
      $set: {
        ratingsSum: ratingsSum,
        ratingsAvg: ratingsAvg,
        ratingsMin: ratingsMin,
        ratingsMax: ratingsMax
      }});

    createRatingNotification(rating);

    // return new rating doc's id to client
    return rating._id;
  }

});
