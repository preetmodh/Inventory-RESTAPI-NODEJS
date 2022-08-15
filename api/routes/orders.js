const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");

//adding controller for orders
const OrdersController = require("../controllers/orders");

// Handle incoming GET requests to /orders
router.get("/", checkAuth,OrdersController.orders_get_all);

// Handle incoming POST requests to /orders
router.post("/",checkAuth,OrdersController.orders_create_order);

//handle incoming GET requests to /orders/:orderId
router.get("/:orderId",checkAuth, OrdersController.orders_get_order);

//handle incoming DELETE requests to /orders/:orderId
router.delete("/:orderId",checkAuth, OrdersController.orders_delete_order);

module.exports = router;