var restoredTodos = []
var input = document.querySelector("input");
var btn   = document.querySelector("button")
var todo  = document.querySelectorAll(".todo ul");
// var ulParent = document.getElementById("listId1")
counterId = 4;

if(!localStorage.getItem("todos"))
{
    localStorage.setItem("todos",JSON.stringify([]))
}
outputIt();


function onClick(e){
    var li = document.createElement("li");
    li.setAttribute("draggable", "true");
    li.setAttribute("ondragstart","onDragStart(event)")
    li.setAttribute("id","liId"+counterId +"");
    counterId+=1;
    li.innerHTML= e.target.previousElementSibling.value;
    e.target.nextElementSibling.appendChild(li);
    var statId = e.target.nextElementSibling.getAttribute("id");
    var todoObj =
    {
             id: counterId,
             name:e.target.previousElementSibling.value,
             status: statId
    };
    restoredTodos.push(todoObj)
    // outputIt();
    localStorage.setItem('todos', JSON.stringify(restoredTodos));
    console.log(e.target.nextElementSibling.getAttribute("id"))
}




function onDragStart(ev){
    var id = ev.target.id;
    ev.dataTransfer.setData("myId",id)
    console.log(ev)
}

function onDragOver(event){
    event.preventDefault()
    // console.log("Ondrag over")
}

function onDrop(e) {


    var id = e.dataTransfer.getData('myId')
    // console.log("Drop Done");
    if(e.target.nodeName=="DIV"){
        e.target.appendChild(document.getElementById(id));
      }else{
        e.target.parentElement.appendChild(document.getElementById(id));
      }
}






function outputIt() {
   restoredTodos = JSON.parse(localStorage.getItem('todos'));
  console.log(restoredTodos)
//   var outputs = "";
  for(var i = 0; i < restoredTodos.length; i++){
    if(restoredTodos[i].status == "listId1") {
        var li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart","onDragStart(event)")
        li.setAttribute("id","liId"+restoredTodos[i].id +"");
        li.innerHTML = restoredTodos[i].name
        todo[0].appendChild(li)
    }else if(restoredTodos[i].status == "listId2"){
        var li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart","onDragStart(event)")
        li.setAttribute("id","liId"+restoredTodos[i].id +"");
        li.innerHTML = restoredTodos[i].name
        todo[1].appendChild(li)
    }else if(restoredTodos[i].status == "listId3") {
        var li = document.createElement("li");
        li.setAttribute("draggable", "true");
        li.setAttribute("ondragstart","onDragStart(event)")
        li.setAttribute("id","liId"+restoredTodos[i].id +"");
        li.innerHTML = restoredTodos[i].name
        todo[2].appendChild(li)
    }
  }
}
