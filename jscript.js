// 1. Targeting Elements
const addbtn = document.getElementById("addbtn");
const taskInput = document.getElementById("taskTitle");
const taskContent = document.getElementById("taskContent");
const tbody = document.querySelector("tbody");
const tr = document.querySelector("tr");
const arr = [];
let index = 1;
// 2. Add btn
addbtn.addEventListener("click", () => {
  createEl();
});
// 3. Create Element Function
const createEl = () => {
  let newEl = document.createElement("tr");
  if (taskInput.value && taskContent.value !== "") {
    //3.1 Add Task
    newEl.innerHTML = `<td>${index}</td>
        <td><input type="checkbox" /></td>
        <td>${taskInput.value}</td>
        <td>${taskContent.value}</td>
        <td>
          <i class="uil uil-pen btn-table editbtn"></i>
          <i class="uil uil-trash btn-table deletebtn"></i>
        </td>`;
    index++;
    tbody.appendChild(newEl);

    updateLocalStorage();
    //3.2 Empty Input after adding Task
    taskInput.value = "";
    taskContent.value = "";
  }

  //3.3   Delete btn Logic
  const deletebtn = newEl.querySelector(".deletebtn");
  try {
    deletebtn.addEventListener("click", () => {
      tbody.removeChild(newEl);
      //   updateLocalStorage();
      index--;
    });
  } catch (error) {
    console.log("Element is not yet added in the DOM");
  }
};

// 4. Update the Local Storage

const updateLocalStorage = () => {

};

// 5. Load from Local Storage

