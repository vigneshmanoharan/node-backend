function checkMandateParams(params) {
  let badReqCheck = false;
  params.forEach((element) => {
    if (!element) {
      badReqCheck = true;
    }
  });

  return badReqCheck;
}

module.exports = { checkMandateParams };
