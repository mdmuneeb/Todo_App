import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { doc, setDoc, getFirestore, deleteDoc, getDocs, collection, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCFyOWgfGyDWIIihFfeueiIfzxInYhdyng",
  authDomain: "todoapp-e06f7.firebaseapp.com",
  projectId: "todoapp-e06f7",
  storageBucket: "todoapp-e06f7.appspot.com",
  messagingSenderId: "203077962251",
  appId: "1:203077962251:web:461bdee7a3a44817ead50e",
  measurementId: "G-00JRXLZB66",
};







const app = initializeApp(firebaseConfig);
const db = getFirestore(app)










let input = document.getElementById("input");
let mainTag = document.getElementById("Main");
let addButton = document.getElementById("AddButton");
let deleteButton = document.getElementById("DeleteButton");


let add = () => {
  if (input.value != "") {
    let textMessage = input.value;
    addDataToFirestore(textMessage);
    mainTag.innerHTML = ""
    displayDataFromFirestore();
    input.value = "";
  } else {
    alert("Plz do write something");
  }
};

let deleteAll = async() => {
    const querySnapshot = await getDocs(collection(db, "Tasks"));

    // Iterate through the documents and delete each one
    querySnapshot.forEach(async (doc) => {
        let res = await deleteDoc(doc.ref)
    });
    mainTag.innerHTML = ""
    displayDataFromFirestore();
};




let addDataToFirestore = async (textMessage) =>
{
    const res = await setDoc(doc(db, "Tasks", textMessage), {
        Task: textMessage
      });

      console.log("response", res);
}

let deleteToFirestore = async(textMessage) =>{
    let res = await deleteDoc(doc(db, "Tasks", textMessage));
}

let updateDatatoFirebase = async(textMessage) =>
{
    let data = prompt("Enter :");
    const UpdateData = doc(db, "Tasks", textMessage);


    let res = await updateDoc(UpdateData, {
    Task: data
    });

    console.log(res);

    
}



let createData = (textMessage) =>{

    let div1Tag = document.createElement("div");
    let pTag = document.createElement("p");
    let div2Tag = document.createElement("div");
    let but1Tag = document.createElement("button");
    let but2Tag = document.createElement("button");


    pTag.textContent = textMessage;
    but1Tag.textContent = "Edit";
    but2Tag.textContent = "Delete";

    div1Tag.classList.add("flex", "justify-between", "w-10/12", "mb-4");
    but1Tag.classList.add("btn", "btn-success", "mr-2");
    but2Tag.classList.add("btn", "btn-error");


    div1Tag.appendChild(pTag);
    div2Tag.appendChild(but1Tag);
    div2Tag.appendChild(but2Tag);
    div1Tag.appendChild(div2Tag);

    mainTag.appendChild(div1Tag);
    console.log(textMessage);

    but2Tag.onclick = () => {
        deleteToFirestore(textMessage)
        mainTag.innerHTML = ""
        displayDataFromFirestore();
    }

    but1Tag.onclick = () => {
        updateDatatoFirebase(textMessage);
        mainTag.innerHTML = ""
        displayDataFromFirestore();
    };

}


let displayDataFromFirestore = async () => {
    const querySnapshot = await getDocs(collection(db, "Tasks"));
    querySnapshot.forEach((doc) => {
        const textMessage = doc.data().Task;
        createData(textMessage);
    })};

displayDataFromFirestore();
addButton.addEventListener("click", add);
deleteButton.addEventListener("click", deleteAll);



