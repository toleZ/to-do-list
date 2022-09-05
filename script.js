const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const sections = document.querySelector('#sections')
const nextUp = document.querySelector('#nextUp')
const completed = document.querySelector('#completed')
const newSectionBtn = document.querySelector('#newSectionBtn')

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

new Sortable(sections)

new Sortable(nextUp, {
  group: 'shared'
})
new Sortable(completed, {
  group: 'shared'
})

const createIcons = (task) => {
  let checkBox = document.createElement('input')
  checkBox.setAttribute('type','checkbox')
  checkBox.addEventListener('change', () => {
   checkBox.checked === true ? task.classList.add('completed') : task.classList.remove('completed')
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
  if(task.replace(/ /g,'') === '' || task === null)return
  
  let taskLi = document.createElement('li')
  taskLi.innerText = task
  taskLi.className = 'task'

  createIcons(taskLi)
  return taskLi
}

form.addEventListener('submit', async event => {
  event.preventDefault()

  const task = createTask(taskInput.value)
  taskInput.value = ''

  if(task === undefined) return
  nextUp.append(task)
})

const newSection = () => {
  const str = prompt('Enter your section')

  if(str === '' || str === null) return

  const title = document.createElement('h2')
  title.innerText = str
  title.classList = 'sectionTitle'

  const section = document.createElement('section')
  section.classList.add(str)
  section.id = str

  new Sortable(section, {
    group: 'shared'
  })

  const div = document.createElement('div')
  div.append(title, section)

  sections.append(div)
}
newSectionBtn.addEventListener('click', newSection)