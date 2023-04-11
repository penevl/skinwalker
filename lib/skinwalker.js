const dateFormat = require(`date-format`)
const colors = require('colors')
const fs = require('fs')
const mkdirp = require('mkdirp')
const getDirName = require('path').dirname;

var defaultParams = {
    traceFileLocation: './logs/',
    infoFileLocation: './logs/',
    warnFileLocation: './logs/',
    errorFileLocation: './logs/',
    traceFileFormat: 'dd-MM-yyyy-hh-mm',
    infoFileFormat: 'dd-MM-yyyy-hh-mm',
    warnFileFormat: 'dd-MM-yyyy-hh-mm',
    errorFileFormat: 'dd-MM-yyyy-hh-mm',
    traceMessageFormat: 'hh-mm-ss-SSS,',
    infoMessageFormat: 'hh-mm-ss-SSS,',
    warnMessageFormat: 'hh-mm-ss-SSS,',
    errorMessageFormat: 'hh-mm-ss-SSS,',
    traceWriteFile: false,
    infoWriteFile: true,
    warnWriteFile: true,
    errorWriteFile: true,
}

var logFileNames = {
    traceLogFileName: dateFormat(defaultParams.traceFileFormat, new Date()) + '.log',
    infoLogFileName: dateFormat(defaultParams.infoFileFormat, new Date()) + '.log',
    warnLogFileName: dateFormat(defaultParams.warnFileFormat, new Date()) + '.log',
    errorLogFileName: dateFormat(defaultParams.errorFileFormat, new Date()) + '.log'
}
var logLevel;

const init = (logingLevel='INFO', params=defaultParams, callback= () => {}) => {

    const final = Object.assign(defaultParams, params)
    defaultParams = final

    logLevel = numerizeLogLevel(logingLevel.toString().toUpperCase())    

}

const setTraceFile = (loc, fileFormat, msgFormat, writeFile) => {

    defaultParams.traceFileLocation = loc
    defaultParams.traceFileFormat = fileFormat
    defaultParams.traceMessageFormat = msgFormat
    defaultParams.traceWriteFile = writeFile
    
    logFileNames.traceLogFileName = dateFormat(defaultParams.traceFileFormat, new Date()) + '.log'

}

const setInfoFile = (location, fileFormat, msgFormat, writeFile) => {

    
}

const setWarnFile = (location, fileFormat, msgFormat, writeFile) => {

    
}

const setErrorFile = (location, fileFormat, msgFormat, writeFile) => {

    
}

function numerizeLogLevel(loglevel) {
    switch (loglevel) {
        case 'TRACE':
            return 0;    
        break;

        case 'INFO':
            return 1;    
        break;
        
        case 'WARN':
            return 2;    
        break;

        case 'ERROR':
            return 3;    
        break;

        default:
            return 1
        break;
    }
}


const trace = (message, callback= () => {}) => {

    if (logLevel <= 0){
        
        var msg = '[DEBUG]    ' + dateFormat(defaultParams.traceMessageFormat, new Date()) + '    ' + message
        console.log(colors.green.bold(msg))

        if(defaultParams.traceWriteFile == true){
            writeFile(defaultParams.traceFileLocation, logFileNames.traceLogFileName, msg)
        }

        callback(msg)
    } 

}

function writeFile(path, name, contents) {

    mkdirp.mkdirp(path).then( () => {
        fs.writeFile(path + name, contents, (err) => {if(err != null){console.log(err)}})
    })
}

module.exports = { init, setTraceFile, setInfoFile, setWarnFile, setErrorFile, trace }