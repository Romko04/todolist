//Змінні
const formTask = document.querySelector('#form')
const inputTask = document.querySelector('#taskInput')
let listTask = document.querySelector('#tasksList')
let taskLocale = []

if (localStorage.getItem('tasks')) {
    taskLocale = JSON.parse(localStorage.getItem('tasks'))
}

taskLocale.forEach((task) => renderTask(task));
console.log(taskLocale);
checkList()
//Події
form.addEventListener('submit', addTask)

listTask.addEventListener('click', deleteTask)

listTask.addEventListener('click', doneTask)


//Функції
function addTask(e) {
    e.preventDefault()

    const textTask = inputTask.value

    const newTask = {
        id: Date.now(),
        text: textTask,
        done: false
    }

    taskLocale.push(newTask)
    saveLocal()

    renderTask(newTask)

    inputTask.value = ''
    inputTask.focus()

    checkList()
}

function deleteTask(e) {
    if (e.target.dataset.action !== 'delete') return

    const taskNode = e.target.closest('.list-group-item')
    
    id = Number(taskNode.id)

    taskLocale = taskLocale.filter((task) => task.id !== id)
    saveLocal()
    taskNode.remove()
    checkList()

}

function doneTask(e) {
    if (e.target.dataset.action !== 'done') return

    const taskNode = e.target.closest('.list-group-item')
    id = Number(taskNode.id)
    const task = taskLocale.find((task) => task.id === id)
    task.done = !task.done

    const taskTitle = taskNode.querySelector('.task-title')
    taskTitle.classList.toggle('task-title--done')
    saveLocal()
}
function checkList() {
    if (taskLocale.length === 0) {
        const emptyLystHtml = `
            <li id="emptyList" class="list-group-item empty-list">
                <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
                <div class="empty-list__title">Список справ порожній</div>
            </li>
        `
        listTask.insertAdjacentHTML('afterbegin', emptyLystHtml)
    } else {
        const listNone = document.querySelector('#emptyList')
        listNone ? listNone.remove() : null
    }
}
function saveLocal() {
    localStorage.setItem('tasks', JSON.stringify(taskLocale))
}
function renderTask(task) {
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title'

    const htmlTask = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
        <span class="${cssClass}">${task.text}</span>
        <div class="task-item__buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./img/tick.svg" alt="Done" width="18" height="18">
            </button>
            <button type="button" data-action="delete" class="btn-action">
                <img src="./img/cross.svg" alt="Done" width="18" height="18">
            </button>
        </div>
	</li>
    `
    listTask.insertAdjacentHTML('beforeend', htmlTask)
}