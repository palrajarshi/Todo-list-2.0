// Btn Targetting
const addbtn = document.getElementById("addbtn");
const cancelbtn = document.getElementById("cancelbtn");
const clearbtn = document.getElementById("clearbtn");
const savebtn = document.getElementById("savebtn");
const taskTitle = document.getElementById("taskTitle");
const taskContent = document.getElementById("taskContent");
const tableBody = document.querySelector("tbody");
const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("e-Content");
const trow = document.querySelector("tbody tr");
const editbox = document.querySelector(".edit-pop");

// Add btn logic
addbtn.addEventListener("click", () => {
  createTasks();
});

// Create tasks logic
const createTasks = () => {
  let newTask = document.createElement("tr");
  if (taskTitle.value && taskContent.value !== "") {
    newTask.innerHTML = `<td></td>
    <td><input type="checkbox" /></td>
    <td class="tit">${taskTitle.value}</td>
    <td class="con">${taskContent.value}</td>
    <td>
      <i class="uil uil-pen btn-table editbtn"></i>
      <i class="uil uil-trash btn-table deletebtn"></i>
    </td>`;
    tableBody.appendChild(newTask);
    updateIndex();
  } else {
    alert("Cannot add Task without a title and Content!");
  }

  updLocalStorage();
};

// Index updation:
const updateIndex = () => {
  const tr = document.querySelectorAll("tbody tr");
  tr.forEach((element, index) => {
    element.firstElementChild.textContent = index + 1;
  });
};

// Save to LocalStorage
const arr = [];
const updLocalStorage = () => {
  let tdTitle;
  let tdContent;
  const tr = document.querySelectorAll("tbody tr");
  console.log("Rows", tr);
  const newArr = Array.from(tr).map((ele) => {
    tdStatus =
      ele.firstElementChild.nextElementSibling.firstElementChild.checked;
    tdTitle =
      ele.firstElementChild.nextElementSibling.nextElementSibling.textContent;
    tdContent =
      ele.firstElementChild.nextElementSibling.nextElementSibling
        .nextElementSibling.textContent;
    return {
      title: `${tdTitle}`,
      content: `${tdContent}`,
      status: `${tdStatus}`,
    };
  });

  localStorage.setItem("Tasks", JSON.stringify(newArr));
  console.log(localStorage);
  console.log("Mapped array: ", newArr);
};
// Load Tasks From local Storage
const loadTasks = () => {
  let fetch = JSON.parse(localStorage.getItem("Tasks")) || [];
  fetch.forEach((element, index) => {
    let newEl = document.createElement("tr");
    newEl.innerHTML = `<td></td>
    <td><input type="checkbox"/></td>
    <td class="tit">${fetch[index].title}</td>
    <td class="con">${fetch[index].content}</td>
    <td>
      <i class="uil uil-pen btn-table editbtn"></i>
      <i class="uil uil-trash btn-table deletebtn"></i>
    </td>`;
    tableBody.appendChild(newEl);
  });
  updateIndex();
};

//  Attaching event listeners to each delete btn every 100ms
setInterval(() => {
  //  Delete btn logic
  const deletebtn = document.querySelectorAll(".deletebtn");
  deletebtn.forEach((element) => {
    element.addEventListener("click", () => {
      const tr = element.closest("tr");
      try {
        tableBody.removeChild(tr);
        updLocalStorage();
        updateIndex();
      } catch (error) {
        console.log("Nothing to delete");
      }
    });
  });
}, 100);

// Clear btn logic

clearbtn.addEventListener("click", () => {
  let askUser = confirm(
    "Doing this will delete all your existing tasks, procced?"
  );
  if (askUser) {
    localStorage.clear();
    tableBody.innerHTML = "";
  }
});

// Edit btn and save btn functionality logic
tableBody.addEventListener("click", (e) => {
  console.log(e.target);
  const tr = e.target.closest("tr");
  const titleInp = tr.firstElementChild.nextElementSibling.nextElementSibling;
  const contentInp =
    tr.firstElementChild.nextElementSibling.nextElementSibling
      .nextElementSibling;
  if (e.target.classList.contains("editbtn")) {
    console.log(e.target);

    editbox.style.display = "flex";
    editbox.style.opacity = 1;
    editTitle.value = titleInp.textContent;
    editContent.value = contentInp.textContent;
  }
  savebtn.onclick = () => {
    console.log(titleInp);
    console.log(contentInp);
    titleInp.textContent = editTitle.value;
    contentInp.textContent = editContent.value;
    editbox.style.display = "none";
    editbox.style.opacity = 0;
    updateIndex();
    updLocalStorage();
  };
});

// Cancel btn logic
cancelbtn.addEventListener("click", () => {
  editbox.style.display = "none";
  editbox.style.opacity = 0;
});

// Load tasks
document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
});
