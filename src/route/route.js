const express=require('express')
const adminMiddleware = require('../middleware/middleware')

const router=express.Router()
const adminController = require('../controller/index')
const loginController = require('../controller/login/loginController')

//product module
const productAddController = require('../controller/products/addController')
const productIndexController = require('../controller/products/indexController')
const productUpdateController = require('../controller/products/updateController')
const productDeleteController = require('../controller/products/deleteController')

//user module
const userAddController = require('../controller/user/addController')
const userIndexController = require('../controller/user/indexController')

router.get("/",adminMiddleware,adminController.index)
router.post("/login",loginController.Authentication)

//product module
router.post("/add",adminMiddleware,productAddController.add)
router.get("/product/get",adminMiddleware,productIndexController.index)
router.put("/update/:id",adminMiddleware,productUpdateController.update)
router.delete("/delete/:id",adminMiddleware,productDeleteController.delete)

//user module
router.post("/user/add",adminMiddleware,userAddController.add)
router.get("/user/get",adminMiddleware,userIndexController.index)

module.exports=router;