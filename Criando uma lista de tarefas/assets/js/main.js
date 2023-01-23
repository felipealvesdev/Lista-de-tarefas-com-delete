const list = document.querySelector(".list");
const input = document.querySelector(".input");
const btnSubmit = document.querySelector(".btnSubmit");

function criaLi(){
    const li = document.createElement("li");
    return li;
}

function addTask (text){
    const li = criaLi();
    li.innerText = text; // ANTES ERA INNERHTML E INPUT.VALUE E NAO FUNCIONAVA POR CONTA DISSO-----
    list.appendChild(li);
    cleanInput();
    createsClearButton(li);
    savingTasks();
}

function cleanInput(){
    input.value = "";
    input.focus();
}
function createsClearButton(li){
    li.innerHTML += " ";
    const clearButton = document.createElement("button");
    clearButton.innerHTML = "Apagar";
    li.appendChild(clearButton);
    clearButton.classList.add("btnClear");
}
//ENVIAR MENSAGEM ATRAVES DE TECLA ENTER FUNCIONANDO---------
input.addEventListener("keypress", function (e){
    if (e.keyCode === 13){
        e.preventDefault();
        if(!input.value) return;
        addTask(input.value);
        cleanInput();
        savingTasks();
    }
});
//ENVIAR MENSAGEM ATRAVES DE TECLA ENTER FUNCIONANDO---------


//ENVIAR MENSAGEM ATRAVES DO BOTAO ADICIONAR TAREFE FUNCIONANDO---------
btnSubmit.addEventListener("click", function (e){
    e.preventDefault();
    if(!input.value) return;
    addTask(input.value);
    cleanInput();
    savingTasks();
});
//ENVIAR MENSAGEM ATRAVES DO BOTAO ADICIONAR TAREFE FUNCIONANDO---------


// BOTAO DE APAGAR FUNCIONANDO-----
document.addEventListener("click", function(e){
    const el = e.target;
    console.log(el);
    if(el.classList.contains("btnClear")){
        el.parentElement.remove();
        savingTasks();
    }
})
// BOTAO DE APAGAR FUNCIONANDO-----
// SALVANDO NO ARQUIVO JSON--------
// A PARTE DO JSON ESTÁ BUGADA-----------------------
function savingTasks(){
    const liTasks = list.querySelectorAll("li");
    let taskList = [];

    for (let task of liTasks){
        let textTask = task.innerText;// SE FIZER COM INNERHTML IRA PEGAR TODOS OS ELEMENTOS E NAO SOMENTE O TEXTO DENTRO!!!!!!!!
        textTask = textTask.replace("Apagar", "").trim(); // trim retira os espaços
        taskList.push(textTask);
    }
    const tasksJSON = JSON.stringify(taskList);
    localStorage.setItem("tasks", tasksJSON);
}

function addSavedTasks() {
    const tasks = localStorage.getItem("tasks");
    const taskList = JSON.parse(tasks);

    for(let task of taskList){
        addTask(task);
    }
}

addSavedTasks();

// A PARTE DO JSON ESTÁ BUGADA-----------------------