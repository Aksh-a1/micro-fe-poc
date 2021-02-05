import React from 'react'

const App = () => {
  const [iframeUrl, setIframeUrl] = React.useState('')
  const onButtonClick = React.useCallback((e)=>{
    const appValue = Number(e.target.value)
    const appUrl = _getAppUrl(appValue)
    setIframeUrl(appUrl)
  })
  return(
    <React.Fragment>
      <button value={1} onClick={onButtonClick}>Application1</button>
      <button value={2} onClick={onButtonClick}>Application2</button>
      {iframeUrl !== '' && <iframe src={iframeUrl}></iframe>}
    </React.Fragment>
  )
}

export default App

const _getAppUrl = (appValue) => {
  switch(appValue){
    case 1:
      return ''
    case 2:
      return ''
    default:
      throw new Error('Invalid app value provided!')
  }
}