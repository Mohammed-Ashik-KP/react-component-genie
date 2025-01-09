# 🧞‍♂️ React Component Genie

A magical CLI tool that generates themed React components with consistent structure and best practices. Stop writing boilerplate code and let the Genie do the work for you!

## ✨ Features

- 🚀 Quick component generation
- 📦 Consistent file structure
- 🎨 Customizable templates
- 🔧 Zero dependencies
- 💡 Smart defaults
- 🎯 TypeScript/JavaScript support
- 🌀 Works with any JS Frameworks like React,Next,Vue

## 🛠️ Installation

```bash
# Install globally
npm install -g react-component-genie

# With pnpm
pnpm install -g react-component-genie

# Or use with npx
npx react-component-genie
```

## 📖 Usage

### General
```bash
# Generate a new component
rcg

# Generate a new component
rcg --help  
rcg -h

# View current version
rcg --version
rcg -v

# Initialize genie -> This creates a rcg.config.json file in your root of project.
rcg init

```

### Generating Components
```bash
# This will ask for component name in PascalCase and create a folder and file based on the template provided 
# (uses rcg.config.json by default )
rcg

## Overwrite the template folder path in rcg.config.json
rcg -t <TEMPLATE_PATH>

## Overwrite the output folder path in rcg.config.json
rcg -o <OUTPUT_PATH>
 
```

### Config File Options
| Property         | Description                                           |
| ---              | ---                                                   |
| outputPath       | The folder that genie writes files in to              |
| templatePath     | The folder that the template file resides             |
| includeTypeFile  | This creates a type file along with component file (component.type.ts)   |

## Variables in Template File
We also support variables in template files.Variables can be wrapped around `{{}}` like `{{componentName}}`
Currently we only support these variables
- componentName
 This will be replace with the name given while generating component using `rcg` cmd

Example:

```
  import React, { useEffect, useState } from 'react';
  import alwaysUse from '../../alwaysUse';

  /**
  * {{componentName}}
  **/
  const {{componentName}} = () => {
  
  //===== states =======//

  //===== functions =======//

  //===== effects =======//

  return (
    <div> </div>
  )

  }
  export default {{componentName}}
 
```

 It is also possible to use variable in template file names.
 for example , if we create a template file like 

```{{componentName}}.component.js ```


this will be generated like  `Input.component.js` for a component name `Input`

## 📫 Contact

Mohammed Ashik KP - [GitHub](https://github.com/Mohammed-Ashik-KP)

Project Link: [https://github.com/Mohammed-Ashik-KP/react-component-genie](https://github.com/Mohammed-Ashik-KP/react-component-genie)
