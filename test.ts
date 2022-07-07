import fs from "fs";

function findOpenVPNStatusFiles(): Array<string> {
  const files = fs.readdirSync("./Logs");
  const logfiles: Array<string> = [];
  files.forEach((file) => {
    const fileArray = file.split(".");

    if (
      fileArray[fileArray.length - 2] == "status" &&
      fileArray[fileArray.length - 1] == "log"
    ) {
      logfiles.push(file);
    }
  });
  return logfiles;
}
