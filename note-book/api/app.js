
const stat = document.getElementById("stat");
const contents = document.getElementById("content");

let notes = []

async function loadNotes(){
    try{
        const res = await fetch("api/notes");    //> fetch - получает ответ конкретно от сервера | в данном случае просит все заметки
        notes = await res.json();
        stat.innerText = `Notes ${notes.length}`;
        console.log(`Notes ${notes.length}`);
    }catch(error){
        console.log("ERROR", error.message);
        stat.innerText = `Notes not found`;
    }
}

async function addNote(){
    const title = prompt("Enter name: ");   //> prompt - это такое страшное окошко ввода как смс сверху
    const content = prompt("Enter content: ");
    if (title === null || content === null){
        stat.innerText = `fill that!!!`
        return;
    }

    try{
        await fetch("api/notes", {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({title, content}),
        });
        await loadNotes();
    }catch(error){
        console.log("ERROR", error.message)
    }
}

async function showNotes() {
    await loadNotes();
    
    if(notes.length === 0){
        contents.innerHTML = '<h2>No notes now</h2>'
        return;
    }
    let html = '<h3>"Notes: "</h3>'

    notes.forEach(note => {
        html += `
        <div>
            <small>[${note.id}] ${note.date}</small>
            <strong>${note.title}</strong>
            <p>${note.content}</p>
        </div>
        `;
    });

    contents.innerHTML = html;
}

loadNotes();