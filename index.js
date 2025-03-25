import inquirer from "inquirer";
import qr from "qr-image";
import fs, { writeFile } from "fs";

// Bug 1: Unused imported module (writeFile is imported but never used)
// Bug 2: Missing error handling for qr-image import
inquirer
  .prompt([
    {
      "message":"Type in your URL:",
      name:"URL",
    },
  ])
  .then((answers) => {
    const url =answers.URL;  // Bug 3: Inconsistent spacing around = operator
    var qr_svg = qr.image(url);
    // Bug 4: No validation of URL input
    // Bug 5: Hardcoded output filename could cause conflicts
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    // Bug 6: Duplicate file writing (same URL written twice)
    fs.writeFile("URL.txt",url,(err)=>{
      if(err) throw err;
      console.log("The file has been saved!");
    });
    
    fs.writeFile("URL.txt",url,(err)=>{
      if(err) throw err;
      console.log("The file has been saved again!");  // Bug 7: Redundant logging
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Bug 8: Empty if block (no handling)
    } else {
      // Bug 9: Generic error handling that doesn't log the error
    }
  });

// Bug 10: Unhandled promise rejection (no catch for the entire chain)
