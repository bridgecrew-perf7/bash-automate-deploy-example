"use strict";

const config = require('./config');
const express = require("express");
const path = require("path");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const expressFlash = require("express-flash");
const cors = require("cors");



// IF NODE_ENV IS test, DEFINE DB SCHEMAs
if(config.NODE_ENV==='test')
    require('./database/database').registerModels();



const app = express();

//#region =========================== CONFIG MIDDLEWARE ===========================
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

// CORS
app.use(cors({
    origin: "*",
    credentials: true,
}));

app.use(expressFlash());
app.use(expressSession({
    secret: config.SESSION_SECRET,
    resave: config.SESSION_RESAVE,
    saveUninitialized: config.SESSION_SAVE_UNINITIALIZED,
    cookie: {
        secure: false,
        maxAge: parseInt(config.SESSION_COOKIE_MAX_AGE),
    },
}));
app.use(cookieParser(config.SESSION_SECRET));
//#endregion =======================================================================



//#region -----------------------------------ROUTES---------------------------------
app.use(express.static(path.join(__dirname, "../public")));
app.get('/*', (req, res)=>{
    res.sendFile(path.join(__dirname, "../public/index.html"));
})
//#endregion -----------------------------------------------------------------------



app.set("port", config.PORT);
app.set("host", config.HOST);

module.exports=app;