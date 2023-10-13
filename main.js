'use strict';

/// data structure 

let toDoLists = JSON.parse(localStorage.getItem('toDoLists'))  ?? [
    {
        name: '<- Name your list!',
        todos: [
        ]
    }
]

let currentList = JSON.parse(localStorage.getItem('currentList'))  ?? toDoLists[0];
let currentListItems = currentList.todos ?? [];
let listIndex;

/// render

function render() {
    // creating and diplaying the lists 
    let listsHtml = '<ul class="userLists" id="sideLists">';
    let InnerListsHtml = '';
    if(toDoLists.length > 1 || currentList.name !== '<- Name your list!') {
        toDoLists.forEach((elem, index) => {
            InnerListsHtml += `<li id="list${index}" class="uLists" draggable="true">${elem.name}</li>`;
        });
    }
    listsHtml += InnerListsHtml + '</ul>';
    document.getElementById('listsCon').innerHTML = listsHtml;
    

    // adding an onclick to the lists so they can be switched 
    let liVals = Object.values(document.querySelectorAll('.userLists li'))
    liVals.forEach((value, index) => value.setAttribute('onclick', `switchList(${index})`))
    // changing the h1 tag to the current list name
    document.getElementById('currName').innerText = currentList.name
    // creating and diplaying the current list items
    let todosHtml = '<ul class="userTodos">';

    listIndex = toDoLists.indexOf(currentList)
    if(listIndex === -1) {
        listIndex = toDoLists.length -1
    }
   
    currentListItems.forEach((elem, index) => {
        todosHtml += 
        `<li class="uTodos" id="list${listIndex}todo${index}">
            <div class="checkCon"><input type="checkbox" class="checkB" id="list${listIndex}todo${index}cb" onclick="markComplete(${listIndex},${index})" ></div>
            <span id="list${listIndex}todo${index}span" onclick="editItem(${index})">${elem.text}</span>
            <div class="grow"></div>
            <button class="btn" id="list${listIndex}todo${index}tb" onclick="deleteItem(${index})"><i class="fa-solid fa-trash"></i></button>
            <button class="btn" id="list${listIndex}todo${index}hb" onclick="editItem(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
        </li>`;
        
    });
    todosHtml += '</ul>';
    document.getElementById('currTodos').innerHTML = todosHtml;
    // render checkboxs
    currentListItems.forEach((elem, index) => {
        let completed = elem.completed 
        document.getElementById(`list${listIndex}todo${index}cb`).checked = completed;
    });
    // show whitch list is being displayed
    if (currentList.name !== '<- Name your list!') {
        let currListBar = document.getElementById(`list${listIndex}`);
        currListBar.setAttribute('class', 'selectedList')
    }  
}
render()

/// save

function save(lists, currList) {
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists));
    localStorage.setItem('currentList', JSON.stringify(currentList));
}

/// save hidden lists

function saveHidden() {
    localStorage.setItem('', JSON.stringify())
}

/// submit new list

let listInput = document.getElementById('listInput');
listInput.addEventListener('keypress', function(e) {
    let listName = listInput.value;
    if(e.key === 'Enter' && toDoLists[0].name !== '<- Name your list!') {
        toDoLists.push({ 
            name: `${listName}`, 
            todos: [] 
        })
        listInput.value = '';

        save(toDoLists, currentList)
        render()

        let newIndex = toDoLists.length -1;
        switchList(newIndex)
    } 
    if(e.key === 'Enter' && toDoLists[0].name === '<- Name your list!') {
        toDoLists[0].name = listName
        currentList.name = listName
        listInput.value = '';
        save(toDoLists, currentList)
        render()
    } 
});

/// delete list 

document.getElementById('deleteList').addEventListener('click', () => {
    deleteList()
})

function deleteList() {
   
    if(toDoLists.length === 1 ) {
        console.log('it worked')
        let empty = {name: '<- Name your list!',todos: []}
        toDoLists.splice(listIndex , 1, empty);
        currentList = toDoLists[0];
        currentListItems = [];
        location.reload()
    } else {
        toDoLists.splice(listIndex, 1);
        currentList = toDoLists[listIndex -1] ?? toDoLists[0];
        console.log(currentList)
        currentListItems = currentList.todos
    }
     
    save(toDoLists, currentList)
    render();
}

/// edit list name 

let currName = document.getElementById('currName')
currName.addEventListener('click', function() {
    if(toDoLists[0].name !== '<- Name your list!') {
        let currText = currName.innerText;
        currName.innerHTML = `<input type="text" placeholder="${currText}" id="H1ei">`
        let h1NewValue = document.getElementById('H1ei')
        h1NewValue.focus();
        
        h1NewValue.addEventListener('keypress', function(e) {
            if(e.key === 'Enter') {
                currentList.name = h1NewValue.value;
                if(toDoLists.length === 1) {
                    toDoLists[0].name = h1NewValue.value;
                }
                render()
                save(toDoLists, currentList)
            }
        })
    }
    
})

/// switch current list

function switchList(index) {
    currentList = toDoLists[index]
    currentListItems = currentList.todos
    render()
    save(toDoLists, currentList)
};

/// submit new list item

let listItemInput = document.getElementById('addItem');
listItemInput.addEventListener('keypress', function(e) {
    let listItemName = listItemInput.value;
    if(e.key === 'Enter' && toDoLists[0].name !== '<- Name your list!') {
            e.preventDefault();
            currentListItems.push(
                {text: `${listItemName}`, completed: false, hidden: false}
            )
            listItemInput.value = '';
            render()
        } 
    if(e.key === 'Enter'&& toDoLists[0].name === '<- Name your list!') {
        document.getElementById('firstListName').placeholder = 'Name Your List First!'
    }
    save(toDoLists, currentList)
});

/// delete list item 

function deleteItem(index) {
    currentListItems.splice(index, 1)
    render()
    save(toDoLists, currentList)
}

/// edit list item

function editItem(index) {
    let oldName = document.querySelector(`#list${listIndex}todo${index}span`);
    let oldText = oldName.innerText
    let inputTD = `<input type="text" placeholder="${oldText}" id="list${listIndex}todo${index}ei" class="listItemInput">`
    oldName.innerHTML = inputTD
    document.getElementById(`list${listIndex}todo${index}ei`).focus()
    let newText = document.querySelector(`#list${listIndex}todo${index}ei`);
    newText.addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            currentListItems[index].text = newText.value
            render()
            save(toDoLists, currentList)
        }
    })
    
}

/// mark as complete

function markComplete(listIndex, index) {
    let checkValue = currentListItems[index]
    if (checkValue.completed) {
        currentListItems[index].completed = false;
    }  
    else if (!checkValue.completed) {
        currentListItems[index].completed = true;
    }
    
    render()
    save(toDoLists, currentList)
}

/// clear completed items

function clearComplete() {
    for (let i = currentListItems.length -1; i >= 0; i--) {
        let theItem = currentListItems[i];
        console.log(i.completed)
        if (theItem.completed) {
            console.log(theItem)
            currentListItems.splice(i, 1) 
        } 
    }
    render()
    save(toDoLists, currentList)        
}

/// search todos

let searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function(e) {
    if(e.key === "Enter") {
        let itemsArr = Object.values(document.querySelectorAll('.uTodos'))
        let count = 0;
        itemsArr.forEach((elem, index) => {
            let regex = new RegExp(`${searchInput.value}`, 'i')
            let currItem = document.getElementById(`list${listIndex}todo${index}`)
            if(regex.test(elem.innerText)) {
                if(count < 3) {
                    currItem.setAttribute('class', 'searchedItem uTodos')
                    if( count === 0) {
                        currItem.scrollIntoView();
                    }
                    setTimeout(() => {
                        currItem.removeAttribute('class', 'searchedItem')
                        currItem.setAttribute('class', 'uTodos')
                    }, 3000)
                    count += 1;
                }
            }
        })
        searchInput.value = '';
    }
})

/// make search go away

document.addEventListener('click', (event) => {
    if (event.target !== document.getElementById('search') && !event.target.closest('#search')) {
        document.getElementById('search').removeAttribute('open')
    }
})

/// Animations



