const ViewHelper = {};

ViewHelper.matchForSelect = (a, b) => {
  if (a === b) {
    return 'selected';
  } else {
    return '';
  }
};

module.exports = ViewHelper;
