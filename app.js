// Creating this project using Moduler Pattern

// Storage Controler
const StorageCtrl = (function() {


    // Public Method
    return {

    }
})();





// Item Controler

const ItemCtrl = (function() {
    // Item Constructor
    const Item = function (id, name, calorie) {
        this.id = id;
        this.name = name;
        this.calorie = calorie;
    };

    // Data Stucter / State
    const data = {
        items: [
            {id: 1, name: "Apple", calorie: 100},
            {id: 2, name: "Banana", calorie: 200},
            {id: 3, name: "Orange", calorie: 300},
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public Method
    return {
        logData: function() {
            return data;
        },
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calorie) {
            let id;
            if(data.items.length > 0) {
                id = data.items[data.items.length - 1].id + 1;
            } else {
                id = 0;
            }
            calorie = parseInt(calorie);
            const newItem = new Item(id, name, calorie);
            // Add to Item array
            data.items.push(newItem);
            return newItem
        },
        getTotalCalories: function() {
            let total = data.items.reduce((acc, currentItem) => {
                return acc + currentItem.calorie;
            },0)
            data.totalCalories = total;
            return data.totalCalories;
        },
        getItemById: function(id) {
            const item = data.items.filter((itme) => {
                return itme.id === id;
            });
            return item;
        },
        setCurrentItem: function(item) {
            data.currentItem = item;
        },
        getCurrentItem: function() {
            return data.currentItem;
        }
    }

})();





// UI Controler

const UICtrl = (function() {
    const UISeclectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
        updateBtn: ".update-btn",
        deleteBtn: ".delete-btn",
        backBtn: ".back-btn",
        editItem: ".edit-item",
        itemNameInput: "#item-name",
        itemCalorieInput: "#item-calories",
        totalCalories: ".total-calories",
    }

    // Public Method
    return {
        showItems: function(items) {
            let html = '';
            items.forEach((item) => {
                html += `
                <li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                    <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>
                `
            });
            document.querySelector(UISeclectors.itemList).innerHTML = html;
        },
        getSelectors: function() {
            return UISeclectors;
        },
        getInputs: function() {
            return {
                name: document.querySelector(UISeclectors.itemNameInput).value,
                calorie: document.querySelector(UISeclectors.itemCalorieInput).value,
            }
        },
        addListItem: function(item) {
            const li = document.createElement("li");
            li.className = "collection-item";
            li.id = `item-${item.id}`;
            li.innerHTML = `
                <strong>${item.name}: </strong> <em>${item.calorie} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            document.querySelector(UISeclectors.itemList).insertAdjacentElement("beforeend", li)
        },
        clearInput: function() {
            document.querySelector(UISeclectors.itemNameInput).value = '';
            document.querySelector(UISeclectors.itemCalorieInput).value = '';
            
        },
        showTotalCalories: function(totalCalories) {
            document.querySelector(UISeclectors.totalCalories).textContent = totalCalories;
        },
        clearEditState: function() {
            UICtrl.clearInput();
            document.querySelector(UISeclectors.addBtn).style.display = "inline";
            document.querySelector(UISeclectors.updateBtn).style.display = "none";
            document.querySelector(UISeclectors.deleteBtn).style.display = "none";
            document.querySelector(UISeclectors.backBtn).style.display = "none";

        },
        setEditState: function() {
            document.querySelector(UISeclectors.addBtn).style.display = "none";
            document.querySelector(UISeclectors.updateBtn).style.display = "inline";
            document.querySelector(UISeclectors.deleteBtn).style.display = "inline";
            document.querySelector(UISeclectors.backBtn).style.display = "inline";
        },
        setItemInputs: function(){
            document.querySelector(UISeclectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISeclectors.itemCalorieInput).value = ItemCtrl.getCurrentItem().calorie;
        }
        // setItemInputs: function(item){
        //     document.querySelector(UISeclectors.itemNameInput).value = item.name;
        //     document.querySelector(UISeclectors.itemCalorieInput).value = item.calorie;
        // }
    }
})();




// Main Controler

const MainCtrl = (function(ItemCtrl, UICtrl) {
    // Load All Event Listner
    const loadEventListner = function() {
        const UISelector = UICtrl.getSelectors();
        document.querySelector(UISelector.addBtn).addEventListener("click", addItem);
        // Edit Btn Event 
        document.querySelector(UISelector.itemList).addEventListener("click", editItemState);

    }

    // Add Item
    const addItem = function(e) {
        e.preventDefault();
        const inputs = UICtrl.getInputs();
        if(inputs.name !== '' && inputs.calorie !== '') {
            const newItem = ItemCtrl.addItem(inputs.name, inputs.calorie);
            UICtrl.addListItem(newItem);
            UICtrl.clearInput();
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);
        }
    };
    // Edit Item State
    const editItemState = function(e) {
        e.preventDefault();
        if(e.target.classList.contains("edit-item")) {
            const itemId = e.target.parentNode.parentNode.id;
            const itemIdArr = itemId.split("-");
            const id = parseInt(itemIdArr[1]);
            const currntItem = ItemCtrl.getItemById(id);
            ItemCtrl.setCurrentItem(currntItem[0]);
            UICtrl.setItemInputs()
            // UICtrl.setItemInputs(currntItem[0])
            UICtrl.setEditState();
        }
    }
    
    // Public Method
    return {
        init: function() {
            UICtrl.clearEditState()
            // Geting Items
            const items = ItemCtrl.getItems();
            // Show Item List in UI
            UICtrl.showItems(items);

            loadEventListner();
            const totalCalories = ItemCtrl.getTotalCalories();
            UICtrl.showTotalCalories(totalCalories);

        }
    }
})(ItemCtrl, UICtrl);

MainCtrl.init();