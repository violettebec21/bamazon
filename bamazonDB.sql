DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR (50) NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("dog brush", "dog grooming", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("cat brush", "cat grooming", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("grain-free dog food", "dog food", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("grain-free cat food", "cat food", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("healthy cat treats", "cat food", 30, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("peanut butter dog treats", "dog food", 15, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("tennis ball squeaky toy", "dog toys", 5, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("catnip mouse cat toy", "cat toys", 6, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("chicago cubs dog collar", "dog accessories", 10, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("purple cat collar", "cat accessories", 5, 50);

