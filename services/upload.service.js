const formidable = require('formidable');
const { cleanFormFields } = require('../library/utils');

module.exports = class UploadService {
  constructor(config) {
    this.config = config;
    this.form = null;
  }

  init() {
    if (!this.config) {
      throw Error('Tthe config param is required');
    }

    this.form = new formidable.IncomingForm(this.config);

    return this;
  }

  async upload(request) {
    try {
      if (!request) {
        throw Error('The request param is required');
      }

      if (!this.config) {
        throw Error('Tthe config param is required');
      }

      const parseForm = () =>
        new Promise((resolve, reject) => {
          this.form.parse(request, (err, fields, files) => {
            if (err) return reject(err);

            const cleanedFields = cleanFormFields(fields)
    
            resolve({ fields: cleanedFields, files });
          });
        });
  
      return await parseForm();
    } catch (error) {
      throw error;
    }
  }
}
