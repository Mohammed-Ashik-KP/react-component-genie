import fs from "fs";
import path from "path";
import {
  CONFIG_FILE_NAME,
  DEFAULT_CONFIG_FILE_NAME,
} from "../constants/constants.js";
import { fileURLToPath } from "url";

export const getConfiguration = () => {
  try {
    const configFilePath = path.join(process.cwd(), CONFIG_FILE_NAME);
    return JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  } catch (error) {
    throw new Error(
      'You must provide a configuration file named "componentry.config.json"'
    );
  }
};

export const createDefaultConfigFile = () => {
  const pathForFileCreation = path.join(process.cwd(), CONFIG_FILE_NAME);

  //module's dir name
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const defaultConfigFilePath = path.join(
    __dirname,
    "..",
    DEFAULT_CONFIG_FILE_NAME
  );

  const dataToWrite = fs.readFileSync(defaultConfigFilePath, "utf8");

  fs.writeFileSync(pathForFileCreation, dataToWrite.toString());
  return pathForFileCreation;
};
