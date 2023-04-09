const datFormat = require(`date-format`)
const colors = require('colors')

const defaultParams = {
    traceFileLocation: './logs',
    infoFileLocation: './logs',
    warnFileLocation: './logs',
    errorFileLocation: './logs',
    traceFileFormat: 'dd-MM-yyyy-hh-mm',
    infoFileFormat: 'dd-MM-yyyy-hh-mm',
    warnFileFormat: 'dd-MM-yyyy-hh-mm',
    errorFileFormat: 'dd-MM-yyyy-hh-mm'
}

var traceFile = {location: String, format: String};
var infoFile = {};
var warnFile = {};
var errorFile = {};
var logLevel;

const init = (logingLevel='INFO', params=defaultParams, callback={}) => {

    if ((params.traceFileLocation == 
        params.infoFileLocation == 
        params.warnFileLocation == 
        params.errorFileLocation) && (
        params.traceFileFormat ==
        params.infoFileFormat ==
        params.warnFileFormat ==
        params.errorFileFormat
        )){

            let fileFormat = datFormat(params.errorFileFormat, new Date())

            setAllFile(params.errorFilelocation, fileFormat)

    }

    logLevel = numerizeLogLevel(logingLevel.toString().toUpperCase())

}  

const setAllFile = (location, name) => {



}

const setTraceFile = (location, name) => {

    
}

const setInfoFile = (location, name) => {

    
}

const setWarnFile = (location, name) => {

    
}

const setErrorFile = (location, name) => {

    
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


const trace = (message, callback={}) => {

    if (logLevel <= 0){
        console.log(colors.green.bold('[TRACE]    ', datFormat('hh-mm-ss-SSS', new Date()),'    ', message))
        callback()
    } 

}

module.exports = { init, setAllFile, setTraceFile, setInfoFile, setWarnFile, setErrorFile, trace }