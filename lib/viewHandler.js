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
        View.create(viewParams)
          .then(view => {
            console.log('New view created');
          });
      } else {
        View.update({ date: new Date() }, { where: viewParams })
        .then(view => {
          console.log('The view was updated');
        });
      }
    });
  }
};

module.exports = ViewHandler;
