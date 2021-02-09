import APP_LIST from './appsList'
import { getAppUrl } from './utils/getAppUrl'

const buttonsDiv = document.getElementById('app-buttons')

const childrenArray = Array.from(buttonsDiv.children)

const iframe = document.getElementById('micro-app')

const onClick = (value) => {
  const appUrl = getAppUrl(value)
  console.log(appUrl)
  iframe.setAttribute('src', appUrl)
}

childrenArray.map((button, index)=>{
  button.setAttribute('value', APP_LIST[index].id)
  button.addEventListener('click', function (e) {
    onClick(e.target.value)
  })
})

console.log(APP_LIST)
console.log('Container')
