
let input = document.getElementById("input");
let mainTag = document.getElementById("Main");

let add = () => {

    if (input.value != '')
    {
        let textMessage = input.value;
        let div1Tag = document.createElement("div");
        let pTag = document.createElement("p");
        let div2Tag = document.createElement("div");
        let but1Tag = document.createElement("button");
        let but2Tag = document.createElement("button");

        pTag.textContent = textMessage
        but1Tag.textContent = "Edit";
        but2Tag.textContent = "Delete";

        div1Tag.classList.add("flex", "justify-between", "w-10/12", "mb-4");
        but1Tag.classList.add("btn", "btn-success", "mr-2");
        but2Tag.classList.add("btn", "btn-error");

        console.log(pTag);


        div1Tag.appendChild(pTag);
        div2Tag.appendChild(but1Tag);
        div2Tag.appendChild(but2Tag);
        div1Tag.appendChild(div2Tag);

        mainTag.appendChild(div1Tag);
        console.log(textMessage);
        input.value = ""


        but2Tag.onclick = () => deleteB(div1Tag);
        but1Tag.onclick = () =>{
            data = prompt("Enter :");
            pTag.textContent = data;
        }
    }
    else
    {
        alert("Plz do write something");
    }
}

let deleteAll = () => {
    mainTag.innerHTML = ""
}

let deleteB = (tag) =>{
    tag.remove()
}


