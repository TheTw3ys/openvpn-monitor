const { renameSync, unlinkSync, appendFileSync } = require("fs");
const { getSystemErrorMap } = require("util");
const delete_file = require("./Requirements/delete_file");
function rename_file(file, renamed_file) {
  try {
    renameSync(file, renamed_file);
    console.log(`File renamed to ${renamed_file}!`);
  } catch (error) {
    console.log(error);
  }
}

function create_file(filename, content) {
  try {
    appendFileSync(filename, content);
    console.log(`File ${filename}! created with content:\n`);
  } catch (error) {
    console.log(error);
  }
}

let file = "./Files/text.txt";
/*Be aware that if started from other folders "text.txt" is not the same*/
let renamed_file = "./Files/hello.txt";

rename_file(renamed_file, file); /*renames the file*/
rename_file(file, renamed_file); /*renames the file back to the original */
delete_file(renamed_file); /* deletes the file */
create_file(
  renamed_file,
  "Hi"
); /* recreates the file so the cycle can be repeated */
