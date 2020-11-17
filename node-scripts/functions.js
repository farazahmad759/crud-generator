import fs from 'fs';
import dvCrudConfig from './../dvcrud.config.js';
import path from 'path';

/**
 * createFile(object)
 */
const createFile = (params) => {
  let {
    name,
    type,
    content,
    dir,
    timeStamp,
    preName,
    postName,
    extension,
    _jsonData,
  } = params;
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
  if (!timeStamp) {
    timeStamp = '';
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
  if (type === 'migration') {
    dir = dvCrudConfig.migrations_path;
  } else if (type === 'controller' || type === 'api') {
    if (!_jsonData) {
      console.error('_jsonData is required for controllers/apis');
    } else {
      dir = dvCrudConfig.controllers_path + _jsonData.tableName + '/';
    }
  } else if (type === 'model') {
    dir = dvCrudConfig.models_path;
  } else if (type === 'view') {
    dir = dvCrudConfig.views_path;
  }

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let formattedName = '';
  formattedName += timeStamp + '_' + preName + '_' + name + '_' + postName;
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  formattedName = formattedName.replace('__', '_');
  if (formattedName.charAt(0) === '_') {
    formattedName = formattedName.substring(1);
  }
  if (formattedName.charAt(formattedName.length - 1) === '_') {
    formattedName = formattedName.slice(0, -1);
  }
  formattedName += extension;
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

/**
 * TODO - create import path for knex file
 */
const getImportPath = () => {};

/**
 * getRelativePath(referencePath, otherPath)
 * @description construct relative path
 */

const getRelativePath = (referencePath, otherPath) => {
  let relativePath = path.relative(
    path.dirname(referencePath),
    path.dirname(otherPath)
  );
  while (relativePath.includes('\\')) {
    relativePath = relativePath.replace('\\', '/');
  }
  relativePath += '/';
  console.log('==================', relativePath); //'../../img'
  return relativePath;
};
let dvFunctions = { createFile, readSchema, getRelativePath };

export default dvFunctions;
