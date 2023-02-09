import express from "express";
import cors from "cors";
import dotenv from "dotenv";

//Init Dot Env
dotenv.config();

//import Router
import AuthRoute from "./routes/AuthRoute.js"
// import ExampleRoute from "./routes/ExampleRoute.js"
// import UserAttendanceRoute from "./routes/AttendanceRoute.js"
// import EreportRoute from "./routes/EreportRoute.js"
// import ProfileRoute from "./routes/ProfileRoute.js"

//Init Express
const app = express();


app.use(cors())

app.use(express.json());
app.use(AuthRoute);


// listen
app.listen(process.env.PORT, () => {
    console.log(`Server running in ${process.env.PORT}`)
})