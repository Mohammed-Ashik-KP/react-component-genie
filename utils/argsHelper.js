export const extractArgs = (args) => {
    const extractedOptions = {};
    let currentKey = null;
    args.forEach(arg => {
        if (arg.startsWith('-')) {
            currentKey = arg; // treat it as a key
            extractedOptions[ currentKey ] = true; // default value for flags
        } else if (currentKey) {
            extractedOptions[ currentKey ] = arg; // assign value to the last key
            currentKey = null; // reset key
        }
    });

    return extractedOptions
}
  