let fs = require('fs')
let path = require('path')
let process = require('process')

function collector(moveFrom, ignore,router) {
    fs.readdir(moveFrom, (err, files)=>{
        if (err) {
            console.error("Could not list the directory",err)
            process.exit(1)
        }
        files.forEach((file) =>  {
            let fromPath = path.join(moveFrom,file)
            fs.stat(fromPath, function(error, stat) {
                if (error) {
                    console.log(error)
                    return
				}
                if (stat.isFile()) {
                    let toBreak = false    
                    ignore.forEach(function(item) {
                        if (moveFrom.slice(7,).includes(item)) {
                            toBreak = true
                        }
                    })
                    if (!toBreak) {
                        router.use('/'+moveFrom.slice(7,), require('./'+fromPath))//'./routes/folder3/route3.js'))
                    }
				} else
                if (stat.isDirectory()) {
					collector( fromPath, ignore, router)					
                }
            })
        })
    })
    return router
}
module.exports = collector;