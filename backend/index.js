import app from "./src/app.js";
import connectDb from "./src/utils/db.js";
const port = process.env.PORT|| 8000;



 connectDb();



app.listen(port,()=>{
    console.log(`server is running at ${port}!`)
})
