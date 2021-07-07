// BUDGET CONTROLLER 
var budgetController = (function(){
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    }
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.precentage = -1
    }
    Expense.prototype.calculatePercentage = function(total){
        if (total > 0) {
            this.precentage = Math.round((this.value / total) * 100);
        }else {
            this.precentage = -1;
        }
    }
    Expense.prototype.getPrecentage = function(){
        return this.precentage;
    }
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(cur){
            sum += cur.value;
        })
        data.totals[type] = sum;
    }
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc:0
        },
        budget:0,
        precentage: -1
    };
    return {
        addItem: function(type, des, val){
            var ID, newItem;
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            }else{
                ID = 0
            }
            // Crate new Item based on inc or exp type
            if (type == 'inc') {
                newItem = new Income(ID, des, val);
            }else if(type == 'exp'){
                newItem = new Expense(ID, des, val);
            }
            data.allItems[type].push(newItem);
            return newItem
        },
        calculateBudget: function(){
            // calculate inc and exp
            calculateTotal('inc');
            calculateTotal('exp');
            // caculate budget
            data.budget = data.totals.inc - data.totals.exp;
            // calculate precentage
            data.precentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
        },
        calculatePercentage: function(){
             data.allItems.exp.forEach(function(current){
                 current.calculatePercentage(data.totals.inc);
             })
        },
        getPrecentage: function(){
            var allPrec = data.allItems.exp.map(function(curr){
                return curr.getPrecentage();
            })
            return allPrec
        },
        deleteItem: function(type, id){
            var ids, index
            ids = data.allItems[type].map(current => {
                return current.id
            })
            index = ids.indexOf(id);
            if(index > -1){
                data.allItems[type].splice(index, 1);
            }

        },
        getBudget: function(){
            return {
                budget: data.budget,
                precentage: data.precentage,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },
        budgetTest: function(){
            console.log(data)
        }
    }
})();


// User Interface Controller
var UIController = (function(){
    var DOMstrings = {
        inputType: '.add__type',
        description: '.add__description',
        inputValue: '.add__value',
        addBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        precentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expPrecentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    var formatNumber = function(type, num){
        var numSplited, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplited = num.split('.');

        int = numSplited[0];
        dec = numSplited[1];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' +  int.substr(int.length - 3, 3) + '.' + dec;
        }
        return (type == "inc" ? '+' + int : '-' + int);
    }
    var forEachNodeList = function(list, calback){
        for(var i = 0; i < list.length; i++){
            calback(list[i], i);    
        }
    }
    return {
        getInputValue: function(){
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.description).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
            }
        },
        getDOMstrings:function(){
               return DOMstrings               
        },
        addListItems: function(obj, type){
            var html, newHtml, element;
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value"> %value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(type, obj.value));
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function(){
            var fields, fieldsArr;
            fields = document.querySelectorAll(DOMstrings.description + ', ' + DOMstrings.inputValue);
            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            fields[0].focus();
        },
        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(type, obj.budget);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber('inc',obj.totalInc);
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber('exp', obj.totalExp);
            if(obj.precentage > -1){
                document.querySelector(DOMstrings.precentageLabel).textContent = obj.precentage + "%"
            }else{
                document.querySelector(DOMstrings.precentageLabel).textContent = "---"
            }
        },
        displayPrecentage: function(precentages){
            var fields = document.querySelectorAll(DOMstrings.expPrecentageLabel);
            forEachNodeList(fields, function(current, index){
                if (precentages[index] > 0) {
                    current.textContent = precentages[index] + "%";
                }else{
                    current.textContent = "---";                
                }
            })
        },
        deleteItem: function(selectorID){
            var ele;
            ele = document.getElementById(selectorID);
            ele.parentNode.removeChild(ele)
        },
        dispalyDate: function(){
            var now, month, year, months
            months = ["Jun", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year

        },
        chageInputStyle: function(){
            var inputs = document.querySelectorAll(DOMstrings.inputType + ',' + DOMstrings.description + ',' + DOMstrings.inputValue);
            forEachNodeList(inputs, function(curr){
                curr.classList.toggle('red-focus');

            })
        }
    }
})();

// Main Project Controller
var controller = (function(budgetCtrl, UICtrl){
    var setupEventListener = function(){
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.addBtn).addEventListener('click', addItem);
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteitem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.chageInputStyle);
        document.addEventListener('keypress', function(event){
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        })
    }
    var updateBadget = function(){
        //1. calculate Budget
        budgetCtrl.calculateBudget();

        //2. return the budget
        var budget = budgetCtrl.getBudget();

        //3. display the budget UI
        UICtrl.displayBudget(budget)
    }
    var updatePrecentage = function(){
        //1. calculate the Precentage
        budgetCtrl.calculatePercentage();

        //2.Read Precentage from Budget Controller
        var precentages = budgetCtrl.getPrecentage();

        //3. update UI
        UICtrl.displayPrecentage(precentages)
    } 
    var addItem = function(){
        var Data, newItem;
        // 1. get items value
        Data = UICtrl.getInputValue();
        if (Data.description !== "" && Data.value > 0 && !isNaN(Data.value)) {
             //2. Add item to budget controller
            var newItem = budgetCtrl.addItem(Data.type, Data.description, Data.value);
            // 3. Display the resault
            UICtrl.addListItems(newItem, Data.type);
            // 4. Clear Fields
            UICtrl.clearFields();
            // 5. calculate and update budget   
            updateBadget();
            //6. update precentages
            updatePrecentage();
        }
    };
    var ctrlDeleteitem = function(event){
        var itemID, splitID, type, ID
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
        }
        // delete item from data structure
        budgetCtrl.deleteItem(type, ID);
        // delete item from UI
        UICtrl.deleteItem(itemID);
        // update UI
        updateBadget();
        // update precentages
        updatePrecentage();
    }
    return {
        init: function(){
            UICtrl.dispalyDate();
            UICtrl.displayBudget({
                budget: 0,
                precentage: -1,
                totalInc: 0,
                totalExp: 0
            })
            setupEventListener();
        }
    }
})(budgetController, UIController);

// Call init function 
controller.init();