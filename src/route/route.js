const express=require('express')
const adminMiddleware = require('../middleware/middleware')

const router=express.Router()
const adminController = require('../controller/index')
const loginController = require('../controller/login/loginController')
const productAddController = require('../controller/products/addController')
const productIndexController = require('../controller/products/indexController')
const productUpdateController = require('../controller/products/updateController')
const productDeleteController = require('../controller/products/deleteController')

router.get("/",adminMiddleware,adminController.index)
router.post("/login",loginController.Authentication)
router.post("/add",adminMiddleware,productAddController.add)
router.get("/get",adminMiddleware,productIndexController.index)
router.put("/update/:id",adminMiddleware,productUpdateController.update)
router.delete("/delete/:id",adminMiddleware,productDeleteController.delete)

module.exports=router;