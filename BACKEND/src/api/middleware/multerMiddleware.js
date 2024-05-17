// import multer from "multer";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "./public/temp")
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
//   })
  
// export const upload = multer({ 
//     storage, 
// })

import multer from "multer";
console.log("multer")
const storage = multer.diskStorage({
  
    destination: function (req, file, cb) {console.log("reqest to me man..........................",file)
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
console.log("upload")
export const upload = multer({ 
    storage
});

