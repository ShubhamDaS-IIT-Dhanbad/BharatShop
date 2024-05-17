
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js";
import {app} from './app.js'
dotenv.config({
    path:'./.env'
})
const port=process.env.PORT || 4000;
connectDB()
.then(() => {
<<<<<<< HEAD
    app.listen(process.env.PORT || 4000, () => {
=======
    app.listen(port, () => {
>>>>>>> 66a1195f0d56da5db8d65b1d432937fdac7e9e67
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
