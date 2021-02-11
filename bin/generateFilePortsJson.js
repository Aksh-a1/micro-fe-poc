const args = require('minimist')(process.argv.slice(2))
const fs = require('fs/promises')
const findAPort = require('../utils/findAPort')
const path = require('path')

//A hack to get path "/micro-fe-poc/.tmp" irrespective of OS
const folderName = path.dirname(__dirname).split('/').pop()
const basePath = `${__dirname.split(folderName)[0]}${folderName}/.tmp`

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

const removeOldEntryForPort = ({ fileData, port }) => {
  const appPortPairFromFile = Object.entries(fileData)
  const foundPair = appPortPairFromFile.filter(pair=>pair[1] === port)
  if(foundPair) {
    foundPair.map(pair=>delete fileData[pair[0]])
  }
  return fileData
}

const generateFile = async () => {
  try {
    const data = await getDataFromFile()
    const port = await findAPort()
    const filteredFileData = removeOldEntryForPort({ fileData: data, port })
    const newAppObj = {
      [args.name]: port
    }
    const newJson = JSON.stringify({ ...filteredFileData, ...newAppObj })
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
