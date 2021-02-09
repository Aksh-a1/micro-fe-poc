import environmentInfo from './getEnvironmentInfo'
import APP_LIST from '../appsList'
import temporaryFilePortsJson from '../../../.tmp/filePorts.json'

const isDevelopmentEmvironment = environmentInfo.mode === 'development'

export const getAppUrl = (id) => {
  const app = APP_LIST.find(appObj => Number(appObj.id) === Number(id))
  if(isDevelopmentEmvironment) {
    const appPort = temporaryFilePortsJson[app.name]
    return `http://localhost:${appPort}/`
  }
  return app.name
}