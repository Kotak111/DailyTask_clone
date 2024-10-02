const taskController= require("../controller/user/task.controller")
const router=require("express").Router();
router.post("/taskadd",taskController.createTask)
router.get("/taskview",taskController.getAllTasks)
router.get("/:id",taskController.getTaskById)
router.delete("/:id",taskController.deleteTaskById)
router.put("/:id",taskController.updateTaskById)
router.get('/', taskController.filterSorting);
module.exports=router;