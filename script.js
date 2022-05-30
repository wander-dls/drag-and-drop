const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check-btn')


const richestPeople = [
    'Jedd Bezos',
    'Bill Gate',
    'Warren Buffett',
    'Bernard Arnult',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michel Bloomberg',
    'Larry Page'
]

// Store list item
const listItems = []

let dragStartIndex

createList()



// insert list items into dom
function createList() {
    [...richestPeople]
        .map(a => ({value: a, sort: Math.random()}))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value )
        .forEach((person, index) => {
            const listItem = document.createElement('li')

            // listItem.classList.add('over')

            listItem.setAttribute('data-index', index)

            listItem.innerHTML = `<span class="number">${index + 1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>`

            listItems.push(listItem)


            draggable_list.appendChild(listItem)
        })

        addEventListeners()
}


// Drag and Drop functions
function dragStart() {
    // console.log('Event: ', 'dragstart')
    dragStartIndex = +this.closest('li').getAttribute('data-index')
    console.log(dragStartIndex)
}

function dragEnter() {
    // console.log('Event: ', 'dragenter')
    this.classList.add('over')
    
}

function dragLeave() {
    // console.log('Event: ', 'dragleave')
    this.classList.remove('over')
 
}

function dragOver(e) {
    // console.log('Event: ', 'dragover')
    e.preventDefault();
    
}

function dragDrop() {
    // console.log('Event: ', 'dragstardropt')
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)
    this.classList.remove('over')
    
}

// Swap list items that are dragged and dropped
function swapItems(fromIndex, toIndex){
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

// Check order of items
function checkOrder(){
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        if(personName !== richestPeople[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

// All my event listeners
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItem = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })

    dragListItem.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)