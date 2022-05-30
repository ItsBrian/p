
const $ = (q) => document.querySelector(q);
const $all = (q) => document.querySelectorAll(q);
const el = {
    title: $('#title'),
    content: $('#content'),
    tabs: $('#tabs'),
    trashcan: $('#trash'),
};


const getNotes = () => JSON.parse(localStorage.getItem('notes'))

let notes = getNotes();
if (!notes || notes.length === 0) localStorage.setItem('notes', JSON.stringify([
    {
        title: 'Welcome!',
        content: 
            'Welcome to the notes app by ItsBrian! 👋\n\n' +
            '- ✅ Notes are automatically saved as you type\n' + 
            '- ➕ Create a new note by clicking the \'+\' at the top\n' +
            '- 🗑️ Delete notes by clicking the wastebasket in the bottom right'
    }
]));

notes = getNotes();
let activeNote = 0;
el.title.value = notes[activeNote].title;
el.content.value = notes[activeNote].content;
notes.forEach(note => {
    el.tabs.innerHTML += `<button>${note.title}</button>`
})

el.tabs.innerHTML += `<button id="add">+</button>`;
let buttons = $all('#tabs button')
buttons[0].classList.add('active')
document.title = 'Notepad — ' + notes[activeNote].title;

buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'))
        if (button.id == 'add') return;
        activeNote = index;
        button.classList.add('active')
        el.title.value = notes[activeNote].title;
        el.content.value = notes[activeNote].content;
        document.title = 'Notepad — ' + notes[activeNote].title;
    })
})

$('#add').addEventListener('click', () => {
    document.body.innerHTML = 'Loading...'
    notes.push({title: 'untitled ' +buttons.length, content: ''})
    changes = true;
    reload = true;
})

el.title.addEventListener('input', () => {
    let title = el.title.value || 'untitled ' + (+activeNote + 1)
    buttons[activeNote].innerText = title;
    notes[activeNote].title = title;
    changes = true;
});

el.content.addEventListener('input', () => {
    notes[activeNote].content = el.content.value || '';
    changes = true;
});

let reload = false;
let changes = false;
setInterval(() => {
    if (changes) 
        localStorage.setItem('notes', JSON.stringify(notes))
    changes = false;
    if (reload) {
        document.location.reload();
    }
}, 1000)


el.trashcan.addEventListener('click', () => {
    if (confirm(`Are you sure you want to delete note '${notes[activeNote].title}' ?`)) {
        document.body.innerHTML = 'Loading...'
        notes.splice(activeNote, 1)
        changes = true;
        reload = true;
    }
})