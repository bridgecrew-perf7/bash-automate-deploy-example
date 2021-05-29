"use strict";

const path = require("path");
const config=require('./config');
const global=require('./global/global');



// CREATE FOLDER dump-log IF NOT EXIST
const fs = require("fs");
if (!fs.existsSync(path.join(__dirname, "../dump-log")))
    fs.mkdirSync(path.join(__dirname, "../dump-log"));
    

async function start(){
    try{
        global.LogBgGreen("============================================================================");
        global.LogGreen(`| ${config.NODE_ENV.toUpperCase()} MODE`);

        const app = require('./app');
        await app.listen(app.get("port"), app.get("host"));
        global.LogGreen(`| SERVER LISTENING ON [${app.get("host")}/${app.get("port")}]`);
        global.LogBgGreen("============================================================================");
    }
    catch(err){
        global.DumpError(err);
    }
}

start();