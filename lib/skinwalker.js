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

var logFileNames = {
    traceLogFileName: datFormat(defaultParams.traceFileFormat, new Date()) + '.log',
    infoLogFileName: datFormat(defaultParams.infoFileFormat, new Date()) + '.log',
    warnLogFileName: datFormat(defaultParams.warnFileFormat, new Date()) + '.log',
    errorLogFileName: datFormat(defaultParams.errorFileFormat, new Date()) + '.log'
}
var logLevel;

const init = (logingLevel='INFO', params={}, callback= () => {}) => {

    setTraceFile(params.traceFileLocation, params.traceFileFormat, params.traceWriteFile)

    logLevel = numerizeLogLevel(logingLevel.toString().toUpperCase())

    // For some reason the true and false values are inverted
    if(params == {}){
        defaultParams = params
    }

}

const setTraceFile = (loc, fileFormat, msgFormat, wrteFile) => {

    defaultParams.traceFileLocation = loc
    defaultParams.traceFileFormat = fileFormat
    defaultParams.traceMessageFormat = msgFormat
    defaultParams.traceWriteFile = wrteFile
    
    logFileNames.traceLogFileName = datFormat(defaultParams.traceFileFormat, new Date()) + '.log'

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
            fs.writeFileSync(traceFile.location + logFileNames.traceLogFileName, msg)
        }

        callback(msg)
    } 

}

module.exports = { init, setTraceFile, setInfoFile, setWarnFile, setErrorFile, trace }