class noteClass {
    constructor(id, note, bgcolor) {
        this.id = id
        this.note = note
        this.bgcolor = bgcolor
    }
}

function displayInstructions(){
    document.querySelector('.notes').innerHTML="Click the above title to add notes"
}

function printParticularNote(note) {
    html = `
        <div class="note" id="${note.id}" style="background-color: ${note.bgcolor};">
            <div class="text">${note.note}</div>
            <div class="logos">
                <input type="color" id="color${note.id}" value="${note.bgcolor}" onchange="colorChange('color${note.id}','${note.id}')">
                <button onclick="deleting('${note.id}')"><img src="assets/delete-button.png">
                <button onclick="editing('${note.id}')"><img src="assets/edit-text.png">
            </div>
        </div>
        `
    document.querySelector(".notes").innerHTML = html + document.querySelector(".notes").innerHTML
}

function printAllNotes() {
    let notes = JSON.parse(localStorage.getItem("notes"))
    let currentCounter = JSON.parse(localStorage.getItem("currentCounter"))
    if (notes===null){
        notes=[]
    }
    if (currentCounter===null){
        localStorage.setItem("currentCounter",1)
    }

    if (notes.length!=0){
        document.querySelector(".notes").innerHTML=""
    }
    else{
        displayInstructions()
    }
    if (notes !== null) {
        for (let i = 0; i < notes.length; i++) {
            printParticularNote(notes[i]);
        }
    }
}

document.querySelector("#btn").addEventListener("click", ()=>{
    let notes=JSON.parse(localStorage.getItem("notes"))
    let currentCounter=JSON.parse(localStorage.getItem("currentCounter"))
    if (notes===null){
        notes=[]
    }
    promptedText=prompt("Enter Note")
    if (promptedText!==null){
        let newNote = new noteClass(`note${currentCounter}`, promptedText, "#fff9b0")
        notes.push(newNote)
        localStorage.setItem("notes",JSON.stringify(notes))
    }
    currentCounter++
    localStorage.setItem("currentCounter", currentCounter)
    printAllNotes()
})

function deleting(id){
    if (confirm("Are you sure you want to delete it")){
        let notes=JSON.parse(localStorage.getItem("notes"))
        let filteredNotes=notes.filter(note => note.id !== id)
        localStorage.setItem("notes", JSON.stringify(filteredNotes))
    }
    printAllNotes()
}

function editing(id){
    if (confirm("Are you sure you want to edit it")){
        let notes=JSON.parse(localStorage.getItem("notes"))
        let promptedText = prompt("Enter note")
        for (let i=0; i<notes.length; i++){
            if (notes[i].id == id){
                notes[i].note=promptedText
            }
        }
        localStorage.setItem("notes", JSON.stringify(notes))
    }
    printAllNotes()
}

function colorChange(inputID, noteID){
    console.log(inputID, noteID);
    let selectedColor = document.getElementById(inputID).value
    document.getElementById(noteID).style.backgroundColor=selectedColor
    let notes=JSON.parse(localStorage.getItem("notes"))
    for (let i=0; i<notes.length; i++){
        if (notes[i].id == noteID){
            notes[i].bgcolor = selectedColor
        }
    }
    localStorage.setItem("notes",JSON.stringify(notes))
    printAllNotes()

}

printAllNotes()