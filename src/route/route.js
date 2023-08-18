const express=require('express')
const adminMiddleware = require('../middleware/middleware')

const router=express.Router()
const adminController = require('../controller/index')
const loginController = require('../controller/login/loginController')

//login module
router.get("/",adminMiddleware,adminController.index)
router.post("/login",loginController.Authentication)

//product module
const productAddController = require('../controller/products/addController')
const productIndexController = require('../controller/products/indexController')
const productUpdateController = require('../controller/products/updateController')
const productDeleteController = require('../controller/products/deleteController')

//user module
const userAddController = require('../controller/user/addController')
const userIndexController = require('../controller/user/indexController')
const userUpdateController = require('../controller/user/updateController')
const userDeleteController = require('../controller/user/deleteController')


//product module endpoint
router.post("/product/add",adminMiddleware,productAddController.add)
router.get("/product/get",adminMiddleware,productIndexController.index)
router.put("/product/update/:id",adminMiddleware,productUpdateController.update)
router.delete("/product/delete/:id",adminMiddleware,productDeleteController.delete)

//user module endpoint
router.post("/user/add",adminMiddleware,userAddController.add)
router.get("/user/get",adminMiddleware,userIndexController.index)
router.put("/user/update/:id",adminMiddleware,userUpdateController.update)
router.delete("/user/delete/:id",adminMiddleware,userDeleteController.delete)

module.exports=router;