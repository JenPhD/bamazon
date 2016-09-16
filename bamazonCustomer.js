var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8888,
    user: "root", //Your username
    password: "root", //Your password
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    list();
})

//List all items for sale
var list = function() {
	var query = 'SELECT * FROM `products`';
	connection.query(query, function (err, res) {
		for (var i = 0; i < res.length; i++) {
        	console.log("\n" + res[i].id + " | " + res[i].productname + " | " + res[i].price);
    	}
    	console.log("-----------------------------------");
    	buy();
	})

	var buy = function() {
	    inquirer.prompt([{
	        name: "id",
	        type: "input",
	        message: "Enter the id number (1-10) of the product you would like to buy: \n",
	        validate: function(value) {
	            if ((isNaN(value) == false) && (value > 0 && value < 11))  {
	                return true;
	            } else
	                console.log("Please enter a valid number (1-10).");
	                return false; 
	                buy();
	            }
	        }, {
	        name: "quantity",
	        type: "input",
	        message: "How many do you want to buy? ",
	        validate: function(value) {
	            if ((isNaN(value) == false) && (value > 0)) {
	                return true;
	            } else {
	                console.log("Please enter a valid non-negative integer.");
	                return false;
	                buy();
	            }
	        }
	    }]).then(function(answer) {
	    	var query = 'SELECT price,stockquantity FROM products WHERE ?';
	    	connection.query(query, [answer.id], function(err, res) {
	            i = answer.id - 1;
	    			var cost = (answer.quantity) * (res[i].price);
	    		if (err) {
	                console.log("Error " + err);
	                return;
	            } else if (answer.quantity > res[i].stockquantity) {
	            	console.log("Insufficient inventory! Try again later.");
	            	connection.end();
	            } else {    	
	            	var query = 'UPDATE `products` SET stockquantity = (stockquantity - ?) WHERE id = ?';
	    			connection.query(query, [answer.quantity, answer.id], function(err, res) {
	    				i = answer.id - 1;
	            		if (err) {
	                	console.log("Error " + err);
	                	return;
	                	} else {
	                		//i = answer.id - 1;
	                		console.log("cost: " + cost);
	                		//console.log("inventory: " + res[i].stockquantity);
	                		connection.end();
	                	}

	            	})
	            }
	       })
		})		
	};
}



