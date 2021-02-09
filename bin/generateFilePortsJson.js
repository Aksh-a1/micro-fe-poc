const args = require('minimist')(process.argv.slice(2))
const fs = require('fs/promises')
const findAPort = require('../utils/findAPort')

//A hack to get path "/micro-fe-poc/.tmp" irrespective of OS
const basePath = `${__dirname.split('micro-fe-poc')[0]}micro-fe-poc/.tmp`

const getDataFromFile = async () => {
  try {
    const file = await fs.open(`${basePath}/filePorts.json`, 'r')
    const fileBufferedData = await file.readFile('utf8')
    const parsedFileData = JSON.parse(fileBufferedData)
    return parsedFileData
  } catch(err) {
    if (err.code === 'ENOENT') {
      return {}
    }
    throw err
  }
}

const writeDataToFile = (data) => fs.writeFile(`${basePath}/filePorts.json`, data)

const generateFile = async () => {
  try {
    const data = await getDataFromFile()
    const port = await findAPort()
    const newAppObj = {
      [args.name]: port
    }
    const newJson = JSON.stringify({ ...data, ...newAppObj })
    await writeDataToFile(newJson)
    console.log(port)
  } catch(err) {
    throw err
  }
}

const makeTempDir = async () => {
  try {
    await fs.mkdir(`${basePath}`)
    generateFile()
  } catch(err) {
    if(err.code === 'EEXIST') {
      generateFile()
    } else {
      console.error(err)
      process.exit(1)
    }
  }
}

makeTempDir()
