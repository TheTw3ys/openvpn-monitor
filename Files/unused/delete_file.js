const {unlinkSync} = require("fs")
function delete_file(file) {
    try {
        unlinkSync(file);
        console.log(`File ${file} was deleted.`);
    } catch (error){
        console.log(error);
    }
};
module.exports = delete_file;