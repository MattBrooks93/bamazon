var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazon_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer.prompt([{
        type: "confirm",
        name: "confirm",
        message: "Welcome to Bamazon! Would you like to view our inventory?",
        default: true
    }]).then(function (user) {
        if (user.confirm === true) {
            inventory();
        } else {
            console.log("Too bad... We want your money!");
            connection.end();
        }
    });
}

function inventory() {
    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [5, 20, 20, 8, 8]
    });

    inventoryTable();
    function inventoryTable() {
        connection.query("SELECT * FROM products", function (err, res) {
            for (var i = 0; i < res.length; i++) {
                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;
                table.push(
                    [itemId, productName, departmentName, price, stockQuantity]
                );
            }
            console.log("~~~~~ Current Bamazon Inventory ~~~~~~");
            console.log(table.toString());
            purchase();
        });
    }
}

function purchase() {
    inquirer.prompt([{
        type: "confirm",
        name: "purchase",
        message: "Would you like to purchase an item?",
        default: true

    }]).then(function (user) {
        if (user.purchase === true) {
            department();
        } else {
            console.log("Too bad... We want your money!");
            connection.end();
        }
    });
}

function department() {
    inquirer.prompt([{
        type: "list",
        name: "department",
        message: "What department would you like to shop in?",
        choices: ["ELECTRONICS", "HOME AND KITCHEN", "LAWN AND GARDEN", "BEAUTY CARE", "EXIT"]

    }]).then(function (userDepartment) {
        if (userDepartment.department === "ELECTRONICS") {
            console.log("You have selected electronics! Take a look at what we have in that department.");
            var table = new Table({
                head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
                colWidths: [5, 20, 20, 8, 8]
            });
            connection.query("SELECT * FROM products WHERE department_name = 'Electronics'", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;
                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
                console.log("");
                console.log("~~~~~ Electronics ~~~~~~");
                console.log(table.toString());
                checkout();
            });
        } else if (userDepartment.department === "HOME AND KITCHEN") {
            console.log("You have selected Home and Kitchen! Take a look at what we have in that department.");
            var table = new Table({
                head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
                colWidths: [5, 20, 20, 8, 8]
            });
            connection.query("SELECT * FROM products WHERE department_name = 'Home and Kitchen'", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;
                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
                console.log("");
                console.log("~~~~~ Home and Kitchen ~~~~~~");
                console.log(table.toString());
                checkout();
            });
        } else if (userDepartment.department === "LAWN AND GARDEN") {
            console.log("You have selected Lawn and Garden! Take a look at what we have in that department.");
            var table = new Table({
                head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
                colWidths: [5, 20, 20, 8, 8]
            });
            connection.query("SELECT * FROM products WHERE department_name = 'Lawn and Garden'", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;
                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
                console.log("");
                console.log("~~~~~ Lawn and Garden ~~~~~~");
                console.log(table.toString());
                checkout();
            });
        } else if (userDepartment.department === "BEAUTY CARE") {
            console.log("You have selected Beauty Care! Take a look at what we have in that department.");
            var table = new Table({
                head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
                colWidths: [5, 20, 20, 8, 8]
            });
            connection.query("SELECT * FROM products WHERE department_name = 'Beauty Care'", function (err, res) {
                for (var i = 0; i < res.length; i++) {
                    var itemId = res[i].item_id,
                        productName = res[i].product_name,
                        departmentName = res[i].department_name,
                        price = res[i].price,
                        stockQuantity = res[i].stock_quantity;
                    table.push(
                        [itemId, productName, departmentName, price, stockQuantity]
                    );
                }
                console.log("");
                console.log("~~~~~ Beauty Care ~~~~~~");
                console.log(table.toString());
                checkout();
            });
        } else {
            console.log("Too bad... We want your money!!!");
            connection.end();
        }
    });
}

function checkout() {
    inquirer.prompt([{
        type: "input",
        name: "inputId",
        message: "Please enter the ID number of the item you would like to purchase.",
    },
    {
        type: "input",
        name: "inputNumber",
        message: "How many would you like to purchase?",

    }
    ]).then(function (userCheckout) {
        connection.query("SELECT * FROM products WHERE item_id=?", userCheckout.inputId, function (err, res) {
            for (var i = 0; i < res.length; i++) {
                if (userCheckout.inputNumber > res[i].stock_quantity) {
                    console.log("");
                    console.log("Unfortunately we don't have that many! Please enter a lower amount!");
                    console.log("");
                    checkout();
                } else {
                    console.log("");
                    console.log("You've selected [" + userCheckout.inputNumber + "] " +res[i].product_name);
                    console.log("");
                    console.log("Your total today has come to $" + res[i].price * userCheckout.inputNumber);

                    var updateQuantity = (res[i].stock_quantity - userCheckout.inputNumber);
                    var inputId = (userCheckout.inputId);
                    goodbye(updateQuantity, inputId);
                }
            }
        });
    });
}

function goodbye(updateQuantity, inputId) {
    inquirer.prompt([{

        type: "confirm",
        name: "satisfied",
        message: "Are you satisfied with your purchase?",
        default: true
    
    }]).then(function(userSatisfied) {
        if (userSatisfied.satisfied === true) {
            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: updateQuantity
            }, {
                item_id: inputId
            }], function(err, res) {});
    
            console.log("");
            console.log("~~~~~Enjoy your purchase! Please come again soon!~~~~~");
            connection.end();
        } else {
            console.log("");
            console.log("That's alright! Have another look around!");
            console.log("");
            start();
        }
    });
}