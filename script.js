const takenote = document.getElementById('takenote');

const updateLSdata = () => {
    const textareadata = document.querySelectorAll('textarea');
    const notes = [];
    textareadata.forEach((element) => {
        return notes.push(element.value);
    });

    localStorage.setItem('notes',JSON.stringify(notes));
};

function takenewnote (text = '')
{
    const note = document.createElement("div");
    note.classList.add("note"); 
    const htmlData = ` 
    <div id="operation">
        <button id="edit" title="edit/save"><i class="far fa-edit"></i></button>
        <button id="delete" title="delete"><i class="fas fa-trash"></i></button>
    </div>
    <textarea class="${text ? "hidden" : ""}"></textarea> 
    <div id="notearea" class=" notearea ${text ? "" : "hidden"}"></div>
    `;
    note.insertAdjacentHTML("afterbegin",htmlData); 

    const notesedit = note.querySelector('#edit');
    const notesdelete = note.querySelector('#delete');
    const notearea = note.querySelector('#notearea');
    const textarea = note.querySelector('textarea'); 

    notesdelete.addEventListener('click',()=>{
        note.remove();
        updateLSdata();
    }); 
 
    textarea.value = text;
    notearea.innerHTML = text;

    notesedit.addEventListener('click',()=>{
        notearea.classList.toggle("hidden");
        textarea.classList.toggle("hidden"); 
    });

    textarea.addEventListener('change',(event)=>{
        const value = event.target.value; 
        notearea.innerHTML=value; 
        updateLSdata();
    }) ;

    document.body.appendChild(note); 
} 


const notes = JSON.parse(localStorage.getItem("notes"));

if(notes)
{
    notes.forEach(element => { 
        takenewnote(element);  
    });
}

takenote.addEventListener('click',()=>takenewnote());

 