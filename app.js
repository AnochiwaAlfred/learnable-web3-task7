
var todoContent = document.querySelector("#todoContent")
var btn = document.querySelector("#submitTodo")
const incompleteToDoList = []
const completeToDoList = []
const incompleteHeading = document.querySelector("#incompleteTaskHeading")
const completeHeading = document.querySelector("#completedTasksHeading")
incompleteHeading.style.display = "none"
completeHeading.style.display = "none"

var allList = document.querySelector("#allList")


document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.mark-completed-btn').forEach(button => {
    button.addEventListener('click', markCompletedHandler);
  });

  document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', editHandler);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteHandler);
  });

  document.querySelectorAll('.edit-toggle-button').forEach(button => {
    button.addEventListener('click', preEditHandler);
  });

  document.querySelectorAll('.mark-incomplete-btn').forEach(button => {
    button.addEventListener('click', markIncompleteHandler);
  });

  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteHandler);
  });

  function preEditHandler(event) {
    const itemId = event.target.getAttribute('data-item-id');
    const taskText = document.getElementById(`text-${itemId}`); 
    const todoContentInputEdit = document.getElementById(`todoContentEdit-${itemId}`);
    const textttt = taskText.innerHTML
    todoContentInputEdit.value = textttt;
  }
})



function addToDo() {
  var item = todoContent.value
  if (item === "") {
    alert('Please enter your list')
    return
  }
  incompleteToDoList.push(item)
  displayList()

  todoContent.value = ""
  incompleteHeading.style.display = "block"

}


function displayList() {
  const incompleteTasksList = document.getElementById('incompleteTasksList');
  while (incompleteTasksList.firstChild) {
    incompleteTasksList.removeChild(incompleteTasksList.firstChild);
  }
  incompleteToDoList.map((item) => {
    const listItem = document.createElement('li');
    listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
    listItem.id = `list-${incompleteToDoList.length}`;
    listItem.innerHTML = `
            <span class="" id="text-${incompleteToDoList.length}">${item}</span>
            <div class="d-flex justify-content-between ">
                    <button type="submit" class="btn btn-sm  btn-success mark-completed-btn" onclick="markCompletedHandler('list-${incompleteToDoList.length}')"  data-item-id="${incompleteToDoList.length}">Mark Completed</button>


                    <button type="button" class="btn btn-sm me-2 ms-2 btn-warning edit-toggle-button" data-bs-toggle="modal" data-bs-target="#editTaskModal-${incompleteToDoList.length}"  data-item-id="${incompleteToDoList.length}">Edit</button>
                    <!-- Modal -->
                    <div class="modal fade" id="editTaskModal-${incompleteToDoList.length}" tabindex="-1" aria-labelledby="editTaskModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title text-dark" id="editTaskModalLabel">Edit Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body text-dark">
                            <form id="todoFormEdit-${incompleteToDoList.length}" class="form-inline">
                                <input type="text" id="todoContentEdit-${incompleteToDoList.length}" class="form-control mb-2 mr-sm-2" placeholder="Type here...">
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-sm btn-primary animate__animated animate__swing edit-btn"  id="submitTodoEdit-${incompleteToDoList.length}" data-item-id="${incompleteToDoList.length}" onclick="editHandler('${incompleteToDoList.length}')">Save changes</button>
                        </div>
                        </div>
                    </div>
                    </div>

                    <button type="submit" class="btn btn-sm delete-btn btn-danger"  data-item-id="${incompleteToDoList.length}" onclick="deleteHandler('list-${incompleteToDoList.length}')">Delete</button>
            </div>
        `;

    incompleteTasksList.appendChild(listItem);

  })



  const completedTasksList = document.getElementById('completedTasksList');
  while (completedTasksList.firstChild) {
    completedTasksList.removeChild(completedTasksList.firstChild);
  }
  completeToDoList.map((item) => {
    const listItemCompleted = document.createElement('li');
    listItemCompleted.id = `listCom-${completeToDoList.length}`;
    listItemCompleted.className = 'list-group-item bg-dark text-light d-flex justify-content-between align-items-center';
    listItemCompleted.innerHTML = `
        <span class="">${item}</span>
        <div class="d-flex justify-content-between ">
            <button class="btn btn-sm btn-primary mark-incomplete-btn" data-item-id="i-${completeToDoList.indexOf(item)}" onclick="markIncompletedHandler('listCom-${completeToDoList.length}')">Mark Incomplete</button>
            <button class="btn btn-sm btn-danger delete-btn ms-2" data-item-id="i-${completeToDoList.indexOf(item)}" onclick="deleteHandlerCompleted('listCom-${completeToDoList.length}')">Delete</button>
        </div>
        `;
    completedTasksList.appendChild(listItemCompleted);
  })

}


function markCompletedHandler(id) {
  listItem = document.getElementById(id)
  let itemText = listItem.querySelector("span").innerText;
  console.log(itemText);

  if (!completeToDoList.includes(itemText)) {
    completeToDoList.push(itemText);
  }

  if (incompleteToDoList.includes(itemText)) {
    let index = incompleteToDoList.indexOf(itemText);
    incompleteToDoList.splice(index, 1);
  }
  completeHeading.style.display = "block"
  displayList()
}


function markIncompletedHandler(id) {
  listItem = document.getElementById(id)
  let itemText = listItem.querySelector("span").innerText;
  console.log(itemText);

  if (!incompleteToDoList.includes(itemText)) {
    incompleteToDoList.push(itemText);
  }

  if (completeToDoList.includes(itemText)) {
    let index = completeToDoList.indexOf(itemText);
    completeToDoList.splice(index, 1);
  }
  displayList()
}





function deleteHandler(id) {
  listItem = document.getElementById(id)
  let itemText = listItem.querySelector("span").innerText;
  if (incompleteToDoList.includes(itemText)) {
    let index = incompleteToDoList.indexOf(itemText);
    incompleteToDoList.splice(index, 1);
  }
  displayList()
}


function deleteHandlerCompleted(id) {
  listItem = document.getElementById(id)
  let itemText = listItem.querySelector("span").innerText;

  if (completeToDoList.includes(itemText)) {
    let index = completeToDoList.indexOf(itemText);
    completeToDoList.splice(index, 1);
  }
  displayList()
}


function editHandler(id) {
  listItem = document.getElementById(`list-${id}`)
  let item = listItem.querySelector("span");
  let itemText = item.innerText;
  newValue = document.getElementById(`todoContentEdit-${id}`).value
  if (incompleteToDoList.includes(itemText)) {
    let index = incompleteToDoList.indexOf(itemText);
    incompleteToDoList.splice(index, 1, newValue);
  }
  displayList()
}


