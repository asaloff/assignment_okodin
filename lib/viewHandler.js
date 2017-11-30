const models = require('../models');
const { View } = models;

const ViewHandler = {};

ViewHandler.createView = (viewerId, viewedId) => {
  if (viewerId == viewedId) {
    return;
  } else {
    let viewParams = { ViewerId: viewerId, ViewedId: viewedId };

    View.findOne({
      where: viewParams
    })
    .then(view => {
      if (!view) {
        View.create(viewParams);
      } else {
        View.update({ date: new Date() }, { where: viewParams });
      }
    });
  }
};

module.exports = ViewHandler;
