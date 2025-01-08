import path from "path";
import fs from "fs";
export const processTemplateFile = ({templateDir, template ,variables}) => {
  const templatePath = path.join(templateDir, template);
  let content = fs.readFileSync(templatePath, "utf8");

  // replace template variables
  content = content.replace(/\{\{\s*componentName\s*\}\}/g, variables['componentName']);

  // create output filename
  const outputFileName = template
    .replace(/\{\{\s*componentName\s*\}\}/g, variables['componentName'])
    .replace(".template", "");

  return {processedContent:content,processedFileName:outputFileName};
};
