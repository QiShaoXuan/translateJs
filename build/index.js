const { youdao, baidu, google } = require('translation.js')
const fs = require('fs')
const config = require('./config')
const JSFileReg = /\.js$/
const getFormatJsonStrFromString = require('./jsonFormat')

fs.readdir(config.dir, function (err, files) {
  if (err) throw err;

  files.forEach(v => {
    console.log(v)
    if (JSFileReg.test(v)) {
      translate(`${config.dir}/${v}`)
    }
  })
})

function translate(path) {
  const jsStr = fs.readFileSync(path, 'utf-8')
  let translateObj = eval(`(${jsStr.replace('export default', '')})`);
  let stat = 0
  inner(translateObj)

  function inner(obj) {
    if (obj.hasOwnProperty('label') && obj.hasOwnProperty('name')) {
      if(obj.name === ''){
        stat += 1
        baidu.translate(obj.label).then(result => {
          stat -= 1
          obj.name = result.result[0].toLowerCase().replace(/ /g, '_')
          if (stat == 0) {
            console.log(`${path} translate down, is writing file`)

            fs.writeFile(path, `export default ${getFormatJsonStrFromString(JSON.stringify(translateObj))}`, (err) => {
              if (err) throw err;

              console.log(`${path} write down`)
            })
          }
        })
      }
    }
    if (obj.hasOwnProperty('children')) {
      obj.children.forEach(v => {
        inner(v)
      })
    }
  }
}
