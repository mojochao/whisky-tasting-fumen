var Ratings = new Mongo.Collection("ratings");

Meteor.methods({

  rateTasting: function (props) {
    // verify comment doc data coming from client
    check(this.userId, String);
    check(props, {
      tastingId: String,
      rating: String
    });

    // ensure that a tasting doc exists for the comment
    var tasting = Tastings.findOne(props.tastingId);
    if (!tasting)
      throw new Meteor.Error('invalid-rating', 'You must rate a tasting');

    // extend rating doc with trusted server data
    var user = Meteor.user();
    var rating = _.extend(props, {
      userId: user._id,
      author: user.username,
      submitted: new Date()
    });

    // update the tasting doc with the number of comments
    Tastings.update(rating.tastingId, {$inc: {ratingsCount: 1}});

    // add the new rating doc
    rating._id = Ratings.insert(rating);
    //createCommentNotification(comment);

    // return new rating doc's id to client
    return rating._id;
  }

});
