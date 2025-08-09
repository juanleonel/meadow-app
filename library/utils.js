function cleanFormFields(fields) {
  const cleaned = {};

  for (const key in fields) {
    const value = fields[key];
    cleaned[key] = Array.isArray(value) ? value[0] : value;
  }

  return cleaned;
}

function setMessageFlash(request, info) {
  request.session.flash = {
    type: info.type,
    intro: info.intro,
    message: info.message
  };
}

module.exports = {
  cleanFormFields,
  setMessageFlash
}
