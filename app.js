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
        }
    }

})();





// UI Controler

const UICtrl = (function() {
    const UISeclectors = {
        itemList: "#item-list",
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
        }
    }
})();




// Main Controler

const MainCtrl = (function(ItemCtrl, UICtrl) {
    
    
    // Public Method
    return {
        init: function() {
            // Geting Items
            const items = ItemCtrl.getItems();
            // Show Item List in UI
            UICtrl.showItems(items);
        }
    }
})(ItemCtrl, UICtrl);

MainCtrl.init();