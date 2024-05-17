
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js";
import {app} from './app.js'
dotenv.config({
    path:'./.env'
})
const Port=process.env.PORT || 4000;
connectDB()
.then(() => {
    app.listen(Port || 4000, () => {

    app.listen(port, () => {
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
