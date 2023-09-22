// data structure 

let toDoLists = [
    {
        name: 'test name',
        todos: [
            {text: 'hello', completed: false}
        ]
    },
    {
        name: 'test name2',
        todos: [
            {text: 'hello', completed: false}
        ]
    }
]

const currentList = toDoLists[0];
const currentListItems = currentList.todos
// console.log(currentListItems)
// render

function render() {
    
    let listsHtml = '<ul class="userLists">';
    toDoLists.forEach((elem) => {
        listsHtml += `<li class="uLists">${elem.name}</li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('listsCon').innerHTML = listsHtml

    document.getElementById('currName').innerText = currentList.name
   
    let todosHtml = '<ul class="userTodos">';
    for (let elem of currentListItems) {
        todosHtml += `<li class="uTodos">${elem.text}</li>`;
    };
    todosHtml += '<ul>';
    document.getElementById('currTodos').innerHTML = todosHtml;
    
}  
// submit new list

function submitList() {
    
    let form = document.getElementById('listForm');
    let Name = document.getElementById('listInput');
    Name.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            e.preventDefault();
            form.submit();
            
        } 

    })
}

submitList()

render()








