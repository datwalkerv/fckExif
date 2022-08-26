const ExifImage = require('exif').ExifImage;
const ExifTransformer = require('exif-be-gone')
const fs = require("fs")
const prompt = require('prompt');

console.log('\x1b[32m%s\x1b[0m', `

█████▒▄████▄   ██ ▄█▀▓█████ ▒██   ██▒ ██▓  █████▒
▓██   ▒▒██▀ ▀█   ██▄█▒ ▓█   ▀ ▒▒ █ █ ▒░▓██▒▓██   ▒ 
▒████ ░▒▓█    ▄ ▓███▄░ ▒███   ░░  █   ░▒██▒▒████ ░ 
░▓█▒  ░▒▓▓▄ ▄██▒▓██ █▄ ▒▓█  ▄  ░ █ █ ▒ ░██░░▓█▒  ░ 
░▒█░   ▒ ▓███▀ ░▒██▒ █▄░▒████▒▒██▒ ▒██▒░██░░▒█░    
 ▒ ░   ░ ░▒ ▒  ░▒ ▒▒ ▓▒░░ ▒░ ░▒▒ ░ ░▓ ░░▓   ▒ ░    
 ░       ░  ▒   ░ ░▒ ▒░ ░ ░  ░░░   ░▒ ░ ▒ ░ ░      
 ░ ░   ░        ░ ░░ ░    ░    ░    ░   ▒ ░ ░ ░    
       ░ ░      ░  ░      ░  ░ ░    ░   ░          
       ░                                           

made by: datwalkerv // 6O
\n`)

console.log('\x1b[32m%s\x1b[0m', '[+]' , '1. Extract exif data\n');
console.log('\x1b[32m%s\x1b[0m', '[+]' , '2. Delete exif data\n\n');
console.log('\x1b[32m%s\x1b[0m', '[x]' , '0. Exit\n');

prompt.start()
prompt.get(['option'], function (err, result) {
    if (err) return console.log(err)
    let option = result.option
    if(option == 1){
        console.log('\x1b[32m%s\x1b[0m', '[+]' , 'Ex: cat.jpg\n')
        prompt.start();
        prompt.get(['imagedir'], function(e, res){
            if(e) return console.log(e)
            let imagedir = res.imagedir
            if(fs.existsSync(imagedir)){
                try {
                    new ExifImage({ image : imagedir }, function (error, exifData) {
                        if (error){
                            console.log('\x1b[31m%s\x1b[0m', '[x]' , 'Error: \n'+error.message)
                        } else {
                            console.log('\n\n')
                            console.log('\x1b[32m%s\x1b[0m', '[+]' , 'Extracted exif datas:\n\n');
                            console.log(exifData);
                        }
                    });
                } catch (error) {
                    console.log('\x1b[31m%s\x1b[0m', '[x]' , 'Error: \n'+error.message)
                }
            }
        })
    } else if (option == 2){
        console.log('\x1b[32m%s\x1b[0m', '[+]' , 'Ex: cat.jpg');
        prompt.start()
        prompt.get(['imginput'], function (e, res) {
            let imginput = res.imginput
            let imgoutput = `output.jpg`;
            if(fs.existsSync(imginput)){
                try {
                    const reader = fs.createReadStream(imginput)
                    const writer = fs.createWriteStream(imgoutput)
                    reader.pipe(new ExifTransformer()).pipe(writer)
                    console.log('\x1b[32m%s\x1b[0m', '[+]' , `Image created at: ${imgoutput}`)
                } catch (error) {
                    console.log('\x1b[31m%s\x1b[0m', '[x]' , 'Error: \n'+error)
                }
            }
        });
    } else if (option == 0){
        process.exit(0)
    } else {
        console.log('\x1b[31m%s\x1b[0m', '[x]' , 'Choose one of the options above!\n')
        return
    }
})