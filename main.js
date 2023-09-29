// data structure 

'use strict';

let toDoLists = [
    {
        name: 'Name Your First List!',
        todos: [
        ]
    }
]

let currentList = toDoLists[0];
let currentListItems = currentList.todos;
let reverseTodos = toDoLists.reverse();
let listIndex;

/// render

function render() {
// creating and diplaying the lists 
    let listsHtml = '<ul class="userLists" id="sideLists">';
    let InnerListsHtml = '';
    reverseTodos.forEach((elem, index) => {
        InnerListsHtml += `<li id="list${index}" class="uLists">${elem.name}</li>`;
    });
    listsHtml = listsHtml + InnerListsHtml + '</ul>';
    document.getElementById('listsCon').innerHTML = listsHtml;
// adding an onclick to the lists so they can be switched 
    let liVals = Object.values(document.querySelectorAll('.userLists li'))
    liVals.forEach((value, index) => value.setAttribute('onclick', `switchList(${index})`))
// changing the h1 tag to the current list name
if (toDoLists[0].name === 'Name Your First List!') {
    document.getElementById('currName').innerHTML = `<input type="text" id="firstListName" placeholder="Name Your First List Here!">`
    document.getElementById('firstListName').focus()
} else if (toDoLists[0].name !== 'Name Your First List!'){
    document.getElementById('currName').innerText = currentList.name
}
// creating and diplaying the current list items
    let todosHtml = '<ul class="userTodos">';
    listIndex = toDoLists.indexOf(currentList)
    currentListItems.forEach((elem, index) => {
        todosHtml += 
        `<li class="uTodos" id="list${listIndex}todo${index}">
            <div class="checkCon"><input type="checkbox" class="checkB" id="list${listIndex}todo${index}cb"></div>
            <span id="list${listIndex}todo${index}span">${elem.text}</span>
            <div class="grow"></div>
            <button class="btn" id="list${listIndex}todo${index}tb" onclick="deleteList(${index})"><i class="fa-solid fa-trash"></i></button>
            <button class="btn" id="list${listIndex}todo${index}eb" onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square"></i></i></button>
        </li>`;
    });
    todosHtml += '</ul>';
    document.getElementById('currTodos').innerHTML = todosHtml;
// saving to localStorage
    // save(toDoLists, currentList, currentListItems)
    // console.log('render')
}  

render()

/// save
function save(lists, currList, currListItems) {
    localStorage.setItem('lists', JSON.stringify(lists));
    localStorage.setItem('currList', JSON.stringify(currList));
    localStorage.setItem('currListItems', JSON.stringify(currListItems));
}

/// switch lists

function switchList(index) {
    if(toDoLists[0].name !== 'Name Your First List!') {
        currentList = toDoLists[index]
        currentListItems = currentList.todos
        render()
    } else if(toDoLists[0].name === 'Name Your First List!') {
        document.getElementById('firstListName').placeholder = 'Name Your List First!'
    } 
};

/// submit new list

let listInput = document.getElementById('listInput');
listInput.addEventListener('keypress', function(e) {
    let listName = listInput.value;
    if(e.key === 'Enter' && toDoLists[0].name !== 'Name Your First List!') {
            e.preventDefault();
            toDoLists.push(
                { 
                    name: `${listName}`, 
                    todos: [] 
                }
            )
            listInput.value = '';
            render()
        } 
    if(e.key === 'Enter'&& toDoLists[0].name === 'Name Your First List!') {
        document.getElementById('firstListName').placeholder = 'Name Your List First!'
    } 
});

/// submit new list item

let listItemInput = document.getElementById('addItem');
listItemInput.addEventListener('keypress', function(e) {
    let listItemName = listItemInput.value;
    if(e.key === 'Enter' && toDoLists[0].name !== 'Name Your First List!') {
            e.preventDefault();
            currentListItems.push(
            {text: `${listItemName}`, completed: false}
            )
            listItemInput.value = '';
            render()
        } 
    if(e.key === 'Enter'&& toDoLists[0].name === 'Name Your First List!') {
        document.getElementById('firstListName').placeholder = 'Name Your List First!'
    }
});

/// delete list item 

function deleteList(index) {
    delete currentListItems[index]
    render()
}

/// mark as complete

let currCheckBoxs = document.querySelectorAll('#currTodos .checkB')

currCheckBoxs.forEach((elem, index) => {
    elem.addEventListener('change', function() {
        markComplete(elem, index)
    })
})

function markComplete(elem, index) {
    let checkValue = currentListItems[index]
    if (checkValue.completed) {
        currentListItems[index].completed = false;
    }  
    else if (!checkValue.completed) {
        currentListItems[index].completed = true;
    }
    return currentListItems[index].completed
}

/// edit to do list item

function editItem(index) {
    let oldName = document.querySelector(`#list${listIndex}todo${index}span`);
    let oldText = oldName.innerText
    let inputTD = `<input type="text" placeholder="${oldText}" id="list${listIndex}todo${index}ei">`
    oldName.innerHTML = inputTD

    let newText = document.querySelector(`#list${listIndex}todo${index}ei`);
    newText.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            oldName.innerHTML = newText.value;
        }
    })
}

/// edit list name 

let firstListNameH1 = document.querySelector('#firstListName')
firstListNameH1.addEventListener('keypress', function(e) {
    if(e.key === 'Enter') {
        document.getElementById('currName').innerHTML = firstListNameH1.value;
        currentList.name = firstListNameH1.value;
        render()
    }
})

/// edit first list 

let currName = document.getElementById('currName');
currName.addEventListener('click', function() {
    if(toDoLists[0].name !== 'Name Your First List!') {
        let currText = currName.innerText;
        currName.innerHTML = `<input type="text" placeholder="${currText}" id="H1ei">`
        let h1NewValue = document.getElementById('H1ei')
        h1NewValue.focus();
        
        h1NewValue.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                currName.innerHTML = h1NewValue.value
                currentList.name = h1NewValue.value
                render()
            }
        })
    }
})
