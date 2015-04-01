Meteor.publish('tastings', function () {
  return Tastings.find();
});

Meteor.publish('comments', function (tastingId) {
  check(tastingId, String);
  return Comments.find({tastingId: tastingId});
});

Meteor.publish('ratings', function (tastingId) {
  check(tastingId, String);
  return Ratings.find({tastingId: tastingId});
});

Meteor.publish('ratingStats', function (tastingId) {
  check(tastingId, String);

  var mapper = function () {
    emit(1, // Or put a GROUP BY key here
      { sum: this.score, // the field you want stats for
        min: this.score,
        max: this.score,
        count: 1,
        diff: 0 // M2,n:  sum((val-mean)^2)
      });
  };

  var reducer = function (key, values) {
    var a = values[0]; // will reduce into here
    for (var i = 1; i < values.length; i++){
      var b = values[i]; // will merge 'b' into 'a'

      // temp helpers
      var delta = a.sum / a.count - b.sum / b.count; // a.mean - b.mean
      var weight = (a.count * b.count) / (a.count + b.count);

      // do the reducing
      a.diff += b.diff + delta * delta * weight;
      a.sum += b.sum;
      a.count += b.count;
      a.min = Math.min(a.min, b.min);
      a.max = Math.max(a.max, b.max);
    }
    return a;
  };

  var finalize = function (key, value) {
    value.avg = value.sum / value.count;
    value.variance = value.diff / value.count;
    value.stddev = Math.sqrt(value.variance);
    return value;
  }

  return Ratings.mapReduce(mapper, reducer, {finalize: finalize, out: {inline: 1}}).results[0];
});

Meteor.publish('notifications', function () {
  return Notifications.find({userId: this.userId, read: false});
});
