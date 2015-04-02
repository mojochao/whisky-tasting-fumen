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

    // create a new rating containing data from the client plus some
    // creator/creation metadata
    var rating = _.extend(fields, {
      userId: user._id,
      submitter: user.username,
      submitted: new Date()
    });

    // add the new rating doc
    rating._id = Ratings.insert(rating);

    // compute the new ratings total and update the tasting doc with the it and
    // the new number of ratings
    var ratings = Ratings.find({tastingId: fields.tastingId}).fetch();
    var ratingsTotal = _.reduce(ratings, function (total, obj) {
      return total + obj.score;
    }, 0);

    Tastings.update(rating.tastingId, {
      $inc: {
        ratingsCount: 1
      },
      $set: {
        ratingsTotal: ratingsTotal
      }});

    //createRatingNotification(rating);

    // return new rating doc's id to client
    return rating._id;
  }

});
