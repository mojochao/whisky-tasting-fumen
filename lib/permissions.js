// check that the userId specified is owner of a docqument
isOwner = function (userId, doc) {
  return doc && doc.userId === userId;
};
