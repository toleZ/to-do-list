const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const nextUp = document.querySelector('#nextUp')
const completed = document.querySelector('#completed')

theme.addEventListener('click', () => {
  const themeBtn = document.querySelector('#theme')
  const html = document.querySelector('html')
  const att = html.attributes
  const dataTheme = att['data-theme']
  
  !dataTheme ?
    (
      html.setAttribute('data-theme', 'light'),
      themeBtn.classList.add('light')
    ) :
    dataTheme.nodeValue === 'light' ?
      (
        html.setAttribute('data-theme', 'dark'),
        themeBtn.classList.remove('light'),
        themeBtn.classList.add('dark')
      ) :
      (
        html.setAttribute('data-theme', 'light'),
        themeBtn.classList.remove('dark'),
        themeBtn.classList.add('light')
      )
})

new Sortable(nextUp, {
  onChange: (evt) => {
    const {item, from} = evt
    if(from.id === 'completed'){
      item.classList.remove('completed')
    }
  },
  group: 'shared'
})

new Sortable(completed, {
  onChange: (evt) => {
    const {item, from} = evt
    if(from.id === 'nextUp'){
      item.classList.add('completed')
    } 
  },
  group: 'shared'
})

const createIcons = (task) => {
  let checkBox = document.createElement('input')
  checkBox.setAttribute('type','checkbox')
  checkBox.addEventListener('change', () => {
   if(checkBox.checked == true){
     task.classList.add('completed')
     completed.appendChild(task)
   }else{
     task.classList.remove('completed')
     nextUp.appendChild(task)
   }
  })

  let trashIcon = document.createElement('i')
  trashIcon.classList = 'fa-solid fa-trash'
  trashIcon.addEventListener('click', () => {
    task.remove()
  })

  let span = document.createElement('span')

  span.append(checkBox, trashIcon)
  task.append(span)
}
const createTask = (task) => {
  let taskLi = document.createElement('li')
  taskLi.innerText = task
  taskLi.className = 'task'

  createIcons(taskLi)
  return taskLi
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const task = createTask(taskInput.value)
  nextUp.append(task)

  taskInput.value = ''
})