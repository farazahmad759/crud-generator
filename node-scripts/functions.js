import fs from 'fs';
/**
 * createFile(object)
 */
const createFile = (params) => {
  let { name, type, content, dir, preName, postName, extension } = params;
  if (!name) {
    console.error('params.name is required');
    return false;
  }
  if (!type) {
    console.error('params.type is required');
    return false;
  }
  if (!content) {
    content = '';
  }
  if (!dir) {
    dir = 'db/';
  }
  if (!preName) {
    preName = '';
  }
  if (!postName) {
    postName = '';
  }
  if (!extension) {
    extension = '.js';
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let formattedName = '';
  if (type === 'migration') {
  }
  formattedName += preName + '_' + name + '_' + postName + extension;
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  if (formattedName.charAt(0) === '_') {
    formattedName = formattedName.substring(1);
  }
  fs.writeFile(dir + formattedName, content, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(formattedName + ' has beend created');
    }
  });
};

/**
 * readSchema(object)
 * @returns jsonObject
 */
const readSchema = (params) => {
  let { name, dir } = params;
  if (!name) {
    return false;
  }
  if (!dir) {
    dir = 'db/schemas/';
  }
  let rawdata = fs.readFileSync(dir + name);
  let jsonData = JSON.parse(rawdata);
  return jsonData;
};
let dvFunctions = { createFile, readSchema };

export default dvFunctions;
