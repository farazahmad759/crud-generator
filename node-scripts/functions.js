import fs from 'fs';
/**
 * createFile(object)
 */
const dvCreateFile = (params) => {
  let { name, content, dir, preName, postName, extension } = params;
  if (!name) {
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
  let formattedName =
    dir + new Date().getTime() + '_create_table_' + name + extension;
  fs.writeFile(formattedName, content, function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log(formattedName + ' has beend created');
    }
  });
};

/**
 * dvReadJsonFromFile
 */
const dvReadSchemaFile = (params) => {
  let { name, dir } = params;
  if (!name) {
    return false;
  }
  if (!dir) {
    dir = 'db/schemas/';
  }
  let rawdata = fs.readFileSync(file);
  let jsonData = JSON.parse(rawdata);
  return jsonData;
};
let dvFunctions = { dvCreateFile, dvReadSchemaFile };

export default dvFunctions;
