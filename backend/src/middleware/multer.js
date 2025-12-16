import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        const uploadPath = path.join(__dirname, "../../public");
        cb(null , uploadPath)
    },
    filename:(req, file , cb)=>{
        cb(null , Date.now() + "-" + file.originalname);
    }

})

export const upload  = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024 // 100MB limit
    }
});
