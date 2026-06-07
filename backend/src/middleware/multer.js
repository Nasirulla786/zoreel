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

// Allow configuring max upload size via env var (in bytes). If not set, multer will not enforce a fileSize limit here.
const maxSize = process.env.MAX_UPLOAD_SIZE ? parseInt(process.env.MAX_UPLOAD_SIZE, 10) : null;

const multerOptions = { storage };
if (maxSize && !isNaN(maxSize) && maxSize > 0) {
    multerOptions.limits = { fileSize: maxSize };
}

export const upload = multer(multerOptions);
