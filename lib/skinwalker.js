const datFormat = require(`date-format`)
const colors = require('colors')
const fs = require('fs')

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

var traceFile = {location: String, file: String, messageFormat: String, writeFile: Boolean};
var infoFile = {};
var warnFile = {};
var errorFile = {};
var logLevel;

const init = (logingLevel='INFO', params={}, callback= () => {}) => {

    let fileFormat = datFormat(params.errorFileFormat, new Date())

    setTraceFile(params.traceFileLocation, params.traceFileFormat, params.traceWriteFile)

    logLevel = numerizeLogLevel(logingLevel.toString().toUpperCase())

    // For some reason the true and false values are inverted
    if(params == {}){
        defaultParams = params
    }

}

const setTraceFile = (loc, fileFormat, msgFormat, wrteFile) => {

    traceFile.location = loc
    traceFile.file = datFormat(fileFormat, new Date()) + '.log'
    traceFile.messageFormat = msgFormat
    traceFile.writeFile = wrteFile
    
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
        var msg = '[TRACE]    ' + datFormat(defaultParams.traceMessageFormat, new Date()) + '    ' + message
        console.log(colors.green.bold(msg))

        if(defaultParams.traceWriteFile == true){
            fs.writeFileSync(traceFile.location + traceFile.file, msg)
        }

        callback(msg)
    } 

}

module.exports = { init, setTraceFile, setInfoFile, setWarnFile, setErrorFile, trace }