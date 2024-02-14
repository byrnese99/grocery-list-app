import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push,  onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-41076-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    console.log(inputValue)
    clearInput();
})

onValue(shoppingListInDB, function(snapshot){

    if (snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl();
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i];
            let currentItemId = currentItem[0];
            let currentItemValue = currentItem[1];
            appendInput(currentItem);
        }
    }
    else{
        shoppingListEl.innerHTML = 'No Items';
    }
})

function clearInput(){
    inputFieldEl.value = '';
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = '';
}

function appendInput(item){
    let itemId = item[0];
    let itemValue = item[1];
    let newEl = document.createElement('li');
    newEl.textContent = itemValue;
    newEl.addEventListener('dblclick', function(){
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);
        remove(exactLocationOfItemInDB);
    })
    shoppingListEl.append(newEl);
    
}