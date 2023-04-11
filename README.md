# skinwalker
A customizable javascript logging library
# What this library aims to do
This library aims to ptovide an amazing experience when logging by allowing you to customize every part of your log messages and files. This library is also highly optinionated allowing you to start working instantly and then configure whatever you need later.
# Getting started
To get started just require the library, initialize it and start logging. Example bellow

```js
const logger = require('skinwalker')

logger.init('INFO')

logger.info('Yo mama\'s so stupid, she stared at a cup of orange juice for 12 hours because it said "concentrate."')
```

# Changing locations of logfiles
Skinwalker allows you to store the logfiles for each log type(trace,info,warn,error) in seperate locations if you so desire. That is done by modifing the `traceFileLocation`,`infoFileLocation`, `warnFileLocation` and `errorFileLocation` properties in the `init()` function. Example bellow

```js
const logger = require('skinwalker')

logger.init('INFO', {
    traceFileLocation: './traceFileLogs/',
    infoFileLocation: './infoFileLogs/',
    warnFileLocation: './warnFileLogs/',
    errorFileLocation: './errorFileLogs/',
})

logger.info('Yo mama\'s so fat, when she skips a meal, the stock market drops.')
```

# Changing names of logfiles

Skinwalker also allows you to assing each logfile type a different name. This is done by modifing the `traceFileFormat`, `infoFileFormat`, `warnFileFormat` and `errorFileFormat` properties in the `init()` function. Example bellow

```js
const logger = require('skinwalker')

logger.init('INFO', {
    traceFileFormat: 'dd-MM-yyyy-hh-mm',
    infoFileFormat: 'dd-MM-yyyy-hh-mm',
    warnFileFormat: 'dd-MM-yyyy-hh-mm',
    errorFileFormat: 'dd-MM-yyyy-hh-mm',
})

logger.info('Yo mama\'s so ugly, her portraits hang themselves.')
```

Format string are as follows

- dd - date.getDate()
- MM - date.getMonth() + 1
- yy - date.getFullYear().toString().substring(2, 4)
- yyyy - date.getFullYear()
- hh - date.getHours()
- mm - date.getMinutes()
- ss - date.getSeconds()
- SSS - date.getMilliseconds()

# Changing log message time format

Skinwalker gives you the ability to change the time format of the log messages. This is done by modifing the `traceMessageFormat`, `infoMessageFormat`, `warnMessageFormat` and `errorMessageFormat` properties in the `init()` function. Example bellow

```js
const logger = require('skinwalker')

logger.init('INFO', {
    traceMessageFormat: 'hh-mm-ss-SSS',
    infoMessageFormat: 'hh-mm-ss-SSS',
    warnMessageFormat: 'hh-mm-ss-SSS',
    errorMessageFormat: 'hh-mm-ss-SSS',
})

logger.info('Yo mama so old, she walked into an antique store, and they didn\'t let her leave.')
```

Format string are as follows

- dd - date.getDate()
- MM - date.getMonth() + 1
- yy - date.getFullYear().toString().substring(2, 4)
- yyyy - date.getFullYear()
- hh - date.getHours()
- mm - date.getMinutes()
- ss - date.getSeconds()
- SSS - date.getMilliseconds()

# Selectiong if a logfile should be created for a specific type of log

You can also choose if a given type of log should be logged in to a file. This is done by modifing the `traceWriteFile`, `infoWriteFile`, `warnWriteFile` and `errorWriteFile` properties in the `init()` function. Example bellow

```js
const logger = require('skinwalker')

logger.init('INFO', {
    traceWriteFile: false,
    infoWriteFile: true,
    warnWriteFile: true,
    errorWriteFile: true,
})

logger.info('Yo mama\'s teeth so yellow, I can\'t believe it\'s not butter.')
```

# Changing logger properties during runtime

Skinwalker provides the `setTraceFile`, `setInfoFile()`, `setWarnFile()` and `setErrorFile()` function which allow you to change logging options during runtime. They all take these 4 parameters:

1. location - same as *FileLocation
2. fileFormat - same as *FileFormat
3. msgFormat - same as *MessageFormat
4. writeFile - same as *WriteFile