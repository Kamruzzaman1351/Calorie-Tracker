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
        }
    }

})();





// UI Controler

const UICtrl = (function() {
    const UISeclectors = {
        itemList: "#item-list",
        addBtn: ".add-btn",
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
        }
    }
})();




// Main Controler

const MainCtrl = (function(ItemCtrl, UICtrl) {
    // Load All Event Listner
    const loadEventListner = function() {
        const UISelector = UICtrl.getSelectors();
        document.querySelector(UISelector.addBtn).addEventListener("click", addItem);

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
    }
    
    // Public Method
    return {
        init: function() {
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