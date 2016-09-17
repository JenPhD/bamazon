# bamazon
A node app that updates a mysql inventory list with purchases.

### Overview
A mock amazon store that runs in node and uses mysql to maintain an inventory and the node package inquirer to prompt users for the items they want to purchase. Users are instructed to choose a product by id number and to enter the quantity they want to buy. The app calculates the total cost and updates the inventory in the mysql database. If the product is out of stock, it notifies users that there is insufficient inventory and encourages users to try again later. The app also accounts for user error requiring a non-negative integer for the item number and quantity.

A demo of the bamazon app can be found on youtube. 
[click here](https://www.youtube.com/watch?v=6gI_3dQ84fw)