#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import readLine from "readline";
import { createDefaultConfigFile, getConfiguration } from "./utils/configHelper.js";
import { extractArgs } from "./utils/argsHelper.js";
import { cliHelperText } from "./constants/helperText.js";
import { processTemplateFile } from "./utils/processTemplate.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateComponent({ templatePath, outputPath }) {
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  try {
    //configure Setups
    const configuration = await getConfiguration();

    //overwrite data from cli input
    const TEMPLATE_PATH = templatePath || configuration.templatePath;
    const OUTPUT_PATH = outputPath || configuration.outputPath;

    // get component name
    const ask = (question) => new Promise((resolve) => rl.question(question, resolve));
    const componentName = await ask("Component name (PascalCase): ");

    // validate component name
    if (!/^[A-Z][a-zA-Z0-9]+$/.test(componentName)) {
      console.error("Error: Component name must be in PascalCase");
      process.exit(1);
    }

    // contruct paths for WD
    const templateDir = path.join(process.cwd(), TEMPLATE_PATH);
    const outputDir = path.join(process.cwd(), OUTPUT_PATH, componentName);

    //check if template exists
    if (!fs.existsSync(templateDir)) {
      fs.mkdirSync(templateDir, { recursive: true });
      throw new Error("Template Does Not Exist");
    }

    // read template directory
    const templates = fs.readdirSync(templateDir);

    // create output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // process each template file
    for (const template of templates) {
      const { processedFileName, processedContent } = processTemplateFile({
        template,
        templateDir,
        variables: {
          componentName
        }
      });
      // write the file
      const outputPath = path.join(outputDir, processedFileName);
      fs.writeFileSync(outputPath, processedContent);

      console.log(`Created ${outputPath}`);
    }

    console.log("\nComponent generated successfully! 🎉");
  } catch (error) {
    console.error(error);
    process.exit(0);
  } finally {
    rl.close();
  }
}

const args = process.argv.slice(2);

if (args.length === 1) {
  if (args.includes("--help") || args.includes("-h")) {
    console.log(cliHelperText);
    process.exit(0);
  }

  if (args.includes("--version") || args.includes("-v")) {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(__dirname, "package.json"), "utf8")
    );
    console.log(pkg.version);
    process.exit(0);
  }

  if (args[0] === "init") {
    const createdConfigFile = createDefaultConfigFile();
    console.log(
      "Componentry initialized successfully \nConfiguration File : " +
        createdConfigFile
    );
    process.exit(0);
  }
}

const extractedOptions = extractArgs(args);

generateComponent({
  outputPath: extractedOptions["-o"],
  templatePath: extractedOptions["-t"],
});
