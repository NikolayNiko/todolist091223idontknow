const doc = document;
const todoListEl = doc.querySelector('.todo-list');
const addForm = doc.forms.addTodoForm;



// додаем константи з нових елементів
const addText = addForm.addInputText;
const addBtn = addForm.addButton;


const todos = [
  { id: 1, text: 'Todo 1', completed: false },
  { id: 2, text: 'Todo 2', completed: false },
  { id: 3, text: 'Todo 3', completed: true },
];

renderTodoList(todos, todoListEl);



// подія воду тексту і розблокування кнопки
addText.onchange = function() {

  if(addText.value) {
    addBtn.removeAttribute('disabled');
    
  } else {
    addBtn.setAttribute('disabled', 'disabled');
  }
  
  return;

};

// подія додавання в константу тодос нового елементу та рендер його
addBtn.onclick = function(e) {
  e.preventDefault();
  let countTodos = todos.length + 1;

  console.log(addText.value);

  todos.push({ id: countTodos, text: `Todo ${addText.value}`, completed: false });
  renderTodoList(todos, todoListEl);

};



// Functions

function outTask() {
      
  todos.splice((this.parentElement.dataset.id - 1), 1);
  
  renderTodoList(todos, todoListEl);
      
}


function renderTodoList(data, parentEl) {
  if (!checkValidArgs(data, parentEl)) {
    return;
  }

  let todoChksEls;
  let delBtn;

  let todoItems = data
    .map(function(item, index) {
      const todoItem = `
        <li class="todo-item" data-id="${ item.id }">
          <span class="todo-item__number mr-1">${ index + 1 }</span>
          <input 
            class="todo-item__completed mr-1" 
            type="checkbox" 
            ${ item.completed ? 'checked' : '' }
          >
          <p class="todo-item__text mr-1${ item.completed ? ' todo-item__text_completed' : '' }">
            ${ item.text }
          </p>
          <button class="todo-item__delBtn">del</button>
        </li>
      `;
      return todoItem })
    .join('');
    
  parentEl.innerHTML = todoItems;
  
  todoChksEls = doc.querySelectorAll('.todo-item__completed');
  if (!todoChksEls.length) {
    console.warn('Todo checks not found !!!');
    return;
  }

  todoChksEls.forEach(function(chk) {
    chk.onchange = function() {
      const id = this.parentElement.dataset.id;
      const todo = data.find(function(item) {
        return item.id == id
      });

      if (!todo) {
        return;
      }

      todo.completed = !todo.completed;
      renderTodoList(todos, todoListEl);
    }
  });

  // подія видалення
  delBtn = doc.querySelectorAll('.todo-item__delBtn');

  for (let i = 0; i < todos.length; i++) {
    
    delBtn[i].onclick = outTask;
      
  }
}

function checkValidArgs(data, parentEl) {
  
  if (!parentEl) {
    console.warn('Parent Elemetn not found');
    return; 
  }
  if (!Array.isArray(data)) {
    console.warn('Arg data mast be Array');
    return;
  }

  return true;
}