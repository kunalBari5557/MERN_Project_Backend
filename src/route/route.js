const express=require('express')
const adminMiddleware = require('../middleware/middleware')

const router=express.Router()
const adminController = require('../controller/index')
const loginController = require('../controller/login/loginController')
const userAddController = require('../controller/users/addController')
const userIndexController = require('../controller/users/indexController')
const userUpdateController = require('../controller/users/updateController')
const userDeleteController = require('../controller/users/deleteController')

router.get("/",adminMiddleware,adminController.index)
router.post("/login",loginController.Authentication)
router.post("/add",adminMiddleware,userAddController.add)
router.get("/get",adminMiddleware,userIndexController.index)
router.put("/update/:id",adminMiddleware,userUpdateController.update)
router.delete("/delete/:id",adminMiddleware,userDeleteController.delete)

module.exports=router;