
import dotenv from 'dotenv'
import connectDB from "./src/config/db.js";
import {app} from './app.js'
dotenv.config({
    path:'./.env'
})
<<<<<<< HEAD

connectDB()
.then(() => {
    app.listen(process.env.PORT || 12000, () => {
=======
const port=process.env.PORT || 60123;
connectDB()
.then(() => {
    app.listen(process.env.PORT || 4000, () => {

    app.listen(port, () => {
>>>>>>> ae1fe82693e8cccf06552ec7b9a13116221a184f
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
