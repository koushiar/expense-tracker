const myBalance = document.getElementById("balance");
const myIncome = document.getElementById("money-income");
const myExpenses = document.getElementById("money-expense");
const historyList = document.getElementById("list");
const addNewText = document.getElementById("name-of-new");
const addNewAmount = document.getElementById("amount");
const formButton = document.getElementById("transaction-btn");
const form = document.getElementById("form");
const deletebtn = document.getElementsByClassName("delete-btn");
/*
const practiceTransactions = [
  { id: 1, text: "Clothing", amount: -300 },
  { id: 2, text: "Client Payment", amount: 1000 },
  { id: 3, text: "School Bill", amount: -200 },
  { id: 4, text: "phone bill", amount: -100 }
]; */

function randomId() {
  return Math.floor(Math.random() * 100000);
}

function addListItem(obj) {
  //get the sign of the transaction
  const sign = obj.amount < 0 ? "-" : "+";

  //I will include the sign in the template string for new <li>
  const domElement = document.createElement("li");
  // uses a template string to create a new list element
  domElement.innerHTML = `${obj.text}<span>${sign}${Math.abs(
    obj.amount
  )}</span><button class = "delete-btn" onclick="removeListItem(${
    obj.id
  })">X</button>`;
  if (sign == "-") {
    domElement.classList.add("minus");
  } else {
    domElement.classList.add("plus");
  }

  //set the id as an attribute of the <li>
  domElement.setAttribute("id", `${obj.id}`);
  //now I will append this <li> to the history list
  historyList.appendChild(domElement);

  //makes the input boxes blank again
  addNewText.value = "";
  addNewAmount.value = "";
}

// want to update balance, income and expenses
function updateValues(arr) {
  let mappedAmounts = arr.map(function(obj) {
    return obj.amount;
  });

  //first I created an array containing all the amount values
  let incomeTotal = "0";
  let incomeArr = mappedAmounts.filter(function(element) {
    if (element > 0) {
      return element;
    }
  });

  for (let i = 0; i < incomeArr.length; i++) {
    incomeTotal = incomeTotal - -incomeArr[i];
  }

  let expenseTotal = 0;
  let expenseArr = mappedAmounts.filter(function(element) {
    if (element < 0) {
      return element;
    }
  });

  for (let i = 0; i < expenseArr.length; i++) {
    expenseTotal = expenseTotal - expenseArr[i];
  }
  let balance = incomeTotal - expenseTotal;
  myIncome.innerText = `$ +${incomeTotal}`;
  myExpenses.innerText = `$ -${expenseTotal}`;
  myBalance.innerText = `$ ${balance}`;
}

//A function to create new user inputs and list them in DOM

let transactions = [];

function addTransaction() {
  if (addNewText.value.trim() == "" || addNewAmount.value.trim() == "") {
    //alert("Please add a text and an amount");
  } else {
    const transaction = {
      id: randomId(),
      text: addNewText.value,
      amount: addNewAmount.value
    };

    transactions.push(transaction);
    console.log(transaction);
    console.log(transactions);
    addListItem(transaction);
    updateValues(transactions);
  }
}

//remove transaction from DOM by Id
function removeListItem(id) {
  transactions = transactions.filter(item => item.id !== id);
  document.getElementById(`${id}`).remove();
  init();
  if (historyList.children.length === 0) {
    console.log("empty");
    myIncome.innerText = "$0.00";
    myExpenses.innerText = "$0.00";
    myBalance.innerText = "$0.00";
  }
}

//add the event listener to the form on a submit event
form.addEventListener("submit", function(event) {
  event.preventDefault();
  addTransaction();
});

function init() {
  //historyList.innerHTML = "";
  //transactions.forEach(addListItem);
  updateValues(transactions);
}

//add to local storage
