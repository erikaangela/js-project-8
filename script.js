// localStorage.clear();

let list = JSON.parse(localStorage.getItem('list')) || [];
let listOfItems = document.getElementById("list-items");


const renderList = (list, text) => {
  let listOfItems = document.getElementById("list-items");
  listOfItems.innerHTML = "";

  list.map(({text, id}) => {
    let li = document.createElement("li");
    let deleteBox = document.createElement("input");

    deleteBox.type = "checkbox";
    deleteBox.className = "mx-1 delete-box form-check-input";
    li.setAttribute("id", id);
    li.className = "item";
    li.appendChild(document.createTextNode(text));
    li.appendChild(deleteBox);
    listOfItems.appendChild(li);
  })
}

renderList(list);


function addItem() {
  let inputValue = document.getElementById("item").value;
  let inputId = Date.now();

  if (inputValue === "") {
    alert("Enter a text item to add to the list.");
    return false;
  } else {
    list.push({text: inputValue, id: inputId});
    localStorage.setItem("list", JSON.stringify(list));
    }

  renderList(list, inputValue);
  document.getElementById("item").value = "";
}


function removeItem() {
  let checkboxes = document.getElementsByClassName("delete-box");
  let items = document.getElementsByClassName("item");

  for (let i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      checkboxes[i].parentNode.removeChild(checkboxes[i]);
      items[i].parentNode.removeChild(items[i]);
      list.splice([i], 1);
      localStorage.setItem("list", JSON.stringify(list));
    }
  }
}
