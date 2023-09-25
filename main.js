// data structure 

'use strict';

let toDoLists = [
    {
        name: 'Test Name 1',
        todos: [
            {text: 'Hey', completed: false},
            {text: 'New', completed: false},
            {text: 'World', completed: false}
        ]
    },
    {
        name: 'Test Name 2',
        todos: [
            {text: 'hello', completed: false}
        ]
    },
    {
        name: 'Test Name 3',
        todos: [
            {text: 'goodbye', completed: false}
        ]
    }
]

let currentList = toDoLists[0];
let currentListItems = currentList.todos

// render

render()

function render() {
    
    let listsHtml = '<ul class="userLists" id="sideLists">';
    toDoLists.forEach((elem, index) => {
        listsHtml += `<li id="list${index}" class="uLists">${elem.name}</li>`;
    });
    listsHtml += '</ul>';
    document.getElementById('listsCon').innerHTML = listsHtml;

    let liVals = Object.values(document.querySelectorAll('.userLists li'))
    liVals.forEach((value, index) => value.setAttribute('onclick', `switchList(${index})`))

    document.getElementById('currName').innerText = currentList.name

    let todosHtml = '<ul class="userTodos">';

    let listIndex = toDoLists.indexOf(currentList)

    currentListItems.forEach((elem, index) => {
        todosHtml += 
        `<li class="uTodos" id="list${listIndex}todo${index}">
            <div class="checkCon"><input type="checkbox" class="checkB" id="list${listIndex}todo${index}cb"></div>
            ${elem.text}
            <div class="grow"></div>
            <button class="btn" id="list${listIndex}todo${index}tb"><i class="fa-solid fa-trash"></i></button>
            <button class="btn" id="list${listIndex}todo${index}eb"><i class="fa-solid fa-pen-to-square"></i></i></button>
        </li>`;
    });
    todosHtml += '</ul>';
    document.getElementById('currTodos').innerHTML = todosHtml;
    
}  

// switch lists

function switchList(index) {
    currentList = toDoLists[index]
    currentListItems = currentList.todos
    render()
};

// submit new list

let listInput = document.getElementById('listInput');
listInput.addEventListener('keypress', function(e) {
    let listName = listInput.value;
    if(e.key === 'Enter') {
            e.preventDefault();
            toDoLists.push(
                { 
                    name: `${listName}`, 
                    todos: [] 
                }
            )
            listInput.value = '';
        } 
        render()
});

// submit new list item

let listItemInput = document.getElementById('addItem');
listItemInput.addEventListener('keypress', function(e) {
    let listItemName = listItemInput.value;
    if(e.key === 'Enter') {
        console.log('hello')
            e.preventDefault();
            currentListItems.push(
            {text: `${listItemName}`, completed: false}
            )
            listItemInput.value = '';
        } 
        render()
});

// mark as complete

let currCheckBoxs = document.querySelectorAll('#currTodos .checkB')

currCheckBoxs.forEach((elem, index) => {
    elem.addEventListener('change', function() {
        markComplete(elem, index)
    })
})

function markComplete(elem, index) {
    let checkValue = currentListItems[index]
    if (checkValue.completed) {
        let f = false
    }  
    else if (!checkValue.completed) {
        currentListItems[index].completed = true;
    }
    return currentListItems[index].completed
}
