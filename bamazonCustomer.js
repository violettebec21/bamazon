var mysql = require("mysql");
var inquirer = require("inquirer");


// create the connection information for the sql database     
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "bamazonDB"
});

// connecting to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log('CONNECTION STATUS: Connection successful');
    console.log('----------------------------------------------------------')
    // run a function after the connection is made to prompt the user with inquirer
    start();
});

// function which prompts the user for what action they should take
//The first should ask them the ID of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
function start() {
    //start with a greeting 
    console.log("Welcome to Bamazon, our online pet supply store!");

    // function to connect to the database and pull the items
    connection.query("SELECT * FROM products", function (err) {
        // handle any errors
        if (err) throw err;
        promptUser();
    });

    function promptUser() {
        inquirer
            .prompt([{
                name: "whichProduct",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                //check to ensure the entered value is a number
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "please enter a number 1-10!";
                }
            }, {
                name: "whatQuantity",
                type: "input",
                message: "How many units of the product would you like to buy? Input a quantity",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return "please enter a number 1-50!";
                }
            }])

            // based on the user answer, call the corresponding whichProduct & whatQuantity 
            .then(answer => {
                connection.query("SELECT * FROM products WHERE ?", {
                        id: answer.whichProduct
                    },
                    function (err, res) {
                        if (err) throw (err);

                        //if the requested quantity is less than the available stock, fill the order
                        if (answer.whatQuantity <= res[0].stock_quantity) {
                            console.log('----------------------------------------------------------')
                            console.log("You have added " + answer.whatQuantity + " " + res[0].product_name + " to your order!")
                            console.log('----------------------------------------------------------')
                            console.log("Confirming your order!");

                            //call our dbUpdate function to update our bamazonDB database
                            dbUpdate(answer.whichProduct, answer.whatQuantity, res[0].stock_quantity, res[0].price);


                            //if the inventory is not sufficient, log a message for the user
                        } else {
                            console.log("Sorry, there is currently insufficient quantity!");
                            promptUser();
                        };
                    })
            })
    }

    //function to update out database with the new available inventory based on the amount purchased
    function dbUpdate(id, requestedQuantity, inventory, price) {
        connection.query("UPDATE products SET ? WHERE ?",
            [{
                    stock_quantity: (inventory - requestedQuantity)
                },
                {
                    id: id
                }
            ],
            function (err, res) {
                if (err) throw (err);
                console.log(res.affectedRows);
            }
        )
        //log the cost for the user
        console.log("Your total cost is: " + price * requestedQuantity);
        console.log('----------------------------------------------------------')
        complete();
    }

    function complete() {
        //prompt the user to either place another order-- if no, end the connection
        inquirer.prompt([{
                type: 'confirm',
                name: 'continue',
                message: 'Do you want to place another order?',
                default: true
            }

        ]).then(answer => {
            if (answer.continue) {
                promptUser();
            } else {
                console.log("Thank you for shopping with us!");
                connection.end();
            }
        })
    }
};