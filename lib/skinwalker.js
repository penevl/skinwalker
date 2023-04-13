const dateFormat = require(`date-format`)
const colors = require('colors')
const fs = require('fs')
const mkdirp = require('mkdirp')

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

const setTraceFile = (location, fileFormat, msgFormat, writeFile) => {

    defaultParams.traceFileLocation = location
    defaultParams.traceFileFormat = fileFormat
    defaultParams.traceMessageFormat = msgFormat
    defaultParams.traceWriteFile = writeFile
    
    logFileNames.traceLogFileName = dateFormat(defaultParams.traceFileFormat, new Date()) + '.log'

}

const setInfoFile = (location, fileFormat, msgFormat, writeFile) => {

    defaultParams.infoFileLocation = location
    defaultParams.infoFileFormat = fileFormat
    defaultParams.infoMessageFormat = msgFormat
    defaultParams.infoWriteFile = writeFile

    logFileNames.infoLogFileName = dateFormat(defaultParams.infoFileFormat, new Date()) + '.log'
    
}

const setWarnFile = (location, fileFormat, msgFormat, writeFile) => {

    defaultParams.warnFileLocation = location
    defaultParams.warnFileFormat = fileFormat
    defaultParams.warnMessageFormat = msgFormat
    defaultParams.warnWriteFile = writeFile

    logFileNames.warnLogFileName = dateFormat(defaultParams.warnFileFormat, new Date()) + '.log'

}

const setErrorFile = (location, fileFormat, msgFormat, writeFile) => {

    defaultParams.errorFileLocation = location
    defaultParams.errorFileFormat = fileFormat
    defaultParams.errorMessageFormat = msgFormat
    defaultParams.errorWriteFile = writeFile

    logFileNames.errorLogFileName = dateFormat(defaultParams.errorFileFormat, new Date()) + '.log'
    
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
        
        var msg = '[TRACE]    ' + dateFormat(defaultParams.traceMessageFormat, new Date()) + '    ' + message
        console.log(colors.bold(msg))

        if(defaultParams.traceWriteFile == true){
            writeFile(defaultParams.traceFileLocation, logFileNames.traceLogFileName, msg)
        }

        callback(msg)
    } 

}

const info = (message, callback= () => {}) => {

    if (logLevel <= 1){
        
        var msg = '[INFO]    ' + dateFormat(defaultParams.infoMessageFormat, new Date()) + '    ' + message
        console.log(colors.green.bold(msg))

        if(defaultParams.infoWriteFile == true){
            writeFile(defaultParams.infoFileLocation, logFileNames.infoLogFileName, msg)
        }

        callback(msg)
    } 

}

const warn = (message, callback= () => {}) => {

    if (logLevel <= 2){
        
        var msg = '[WARN]    ' + dateFormat(defaultParams.warnMessageFormat, new Date()) + '    ' + message
        console.log(colors.yellow.bold(msg))

        if(defaultParams.warnWriteFile == true){
            writeFile(defaultParams.warnFileLocation, logFileNames.warnLogFileName, msg)
        }

        callback(msg)
    } 

}

const error = (message, callback= () => {}) => {

    if (logLevel <= 3){
        
        var msg = '[ERROR]    ' + dateFormat(defaultParams.errorMessageFormat, new Date()) + '    ' + message
        console.log(colors.red.bold(msg))

        if(defaultParams.errorWriteFile == true){
            writeFile(defaultParams.errorFileLocation, logFileNames.errorLogFileName, msg)
        }

        callback(msg)
    } 

}

function writeFile(path, name, contents) {
    
    mkdirp.mkdirp(path).then( () => {
        fs.writeFileSync(path + name, contents + '\n', {'flag': 'a'}, (err) => {if(err != null){console.log(err)}})
    })

}

module.exports = { init, setTraceFile, setInfoFile, setWarnFile, setErrorFile, trace, info, warn, error }