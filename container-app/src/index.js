import APP_LIST from './appsList'

const buttonsDiv = document.getElementById('app-buttons')

const childrenArray = Array.from(buttonsDiv.children)

const iframe = document.getElementById('micro-app')

const getAppUrl = (id) => {
  const app = APP_LIST.find(appObj => appObje.id === id)
  return app.path
}

const onClick = (value) => {
  console.log(value)
  const appUrl = getAppUrl(value)
  iframe.setAttribute('src', appUrl)
}

console.log(childrenArray)

childrenArray.map((button, index)=>{
  button.setAttribute('value', APP_LIST[index].id)
  button.addEventListener('click', function (e) {
    onClick(e.target.value)
  })
})

console.log(APP_LIST)
console.log('Container')
