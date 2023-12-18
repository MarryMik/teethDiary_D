//підключення всіх необхідних модулів
import express from "express";
import cors from "cors";
import db from "./dbconnect/Config.js";
import multer from "multer";
import authRouter from "./routers/auth.js";
import diaryRouter from "./routers/diaries.js";
import dirProcedureRouter from "./routers/directoryProcedures.js";
import doctorRouter from "./routers/doctors.js";
import ocvRouter from "./routers/oralCavityParts.js";
import procedureRouter from "./routers/procedures.js";
import recordRouter from "./routers/records.js";
import treatmentRouter from "./routers/treatments.js";
import userRouter from "./routers/users.js";
import brushingsRouter from "./routers/brushings.js";
import brushesRouter from "./routers/brushes.js";
import accessRouter from "./routers/accesses.js";
import fileRouter from "./routers/files.js";
import areaRouter from "./routers/areas.js"
import symptomRouter from "./routers/symptoms.js";
import cookieParser from "cookie-parser";
const app = express();
//проміжні програмні забезпечення
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials",true);
    next();
})
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
//організація збереження файлів в локальне сховище
const storage = multer.diskStorage({
    destination: function (req, file, callBack) {
      callBack(null, "../frontend/git1/git/src/upload");
    },
    filename: function (req, file, callBack) {
        callBack(null, Date.now() + file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    console.log("файл завантажено");
    res.status(200).json(file.filename);
  });
app.get('/', (req,res)=>{
    res.json("Hello server")
})
//налаштування навігації і шляхів
app.use("/auth", authRouter);
app.use("/diaries", diaryRouter);
app.use("/directoryProcedures", dirProcedureRouter);
app.use("/doctors", doctorRouter);
app.use("/oralCavityParts", ocvRouter);
app.use("/procedures", procedureRouter);
app.use("/records", recordRouter);
app.use("/treatments", treatmentRouter);
app.use("/users", userRouter);
app.use("/brushing", brushingsRouter);
app.use("/brushes", brushesRouter);
app.use("/accesses", accessRouter);
app.use("/files", fileRouter);
app.use("/areas", areaRouter);
app.use("/symptoms", symptomRouter);
app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack
    })
})
//запуск серверу і підключення до бази даних
app.listen(8800, ()=>{
    console.log("Сервер працює!");
    db.connect(function(err){
        if (err) throw err;
        console.log("База даних підключена");
    })    
})