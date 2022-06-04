// localStorage.clear();


let list = JSON.parse(localStorage.getItem('list')) || [];
let listOfItems = document.getElementById("list-items");


function checkForEmptyList(list) {
  if (!Array.isArray(list) || list.length === 0) {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=2')
      .then(response => {
        let list = response.data;
        localStorage.setItem("list", JSON.stringify(list));
      })
      .catch(error => console.log(error))
  }
}


const renderList = (list, title) => {
  let listOfItems = document.getElementById("list-items");
  listOfItems.innerHTML = "";
  checkForEmptyList(list);

  list.map(({title, id}) => {
    let li = document.createElement("li");
    let deleteBox = document.createElement("input");

    deleteBox.type = "radio";
    deleteBox.name = "todo";
    deleteBox.className = "mx-1 delete-box form-check-input";
    li.setAttribute("id", id);
    li.className = "item";
    li.appendChild(document.createTextNode(title));
    li.appendChild(deleteBox);
    listOfItems.appendChild(li);
  })
}

renderList(list);


function addItem() {
  let inputValue = document.getElementById("item").value;
  let inputId = Date.now();

  function checkInputValue() {
    if (inputValue === "") {
      alert("Enter a text item to add to the list.");
      return false;
    } else {
      list.push({title: inputValue, id: inputId});
      localStorage.setItem("list", JSON.stringify(list));
      }
  }

  checkInputValue();
  renderList(list, inputValue);
  document.getElementById("item").value = "";
}


function removeItem() {
  let radios = document.getElementsByClassName("delete-box");
  let items = document.getElementsByClassName("item");

  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      radios[i].parentNode.removeChild(radios[i]);
      items[i].parentNode.removeChild(items[i]);
      list.splice([i], 1);
      localStorage.setItem("list", JSON.stringify(list));
    }
  }
}
