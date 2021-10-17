const router = require("express").Router();

const {
  userTodos,
  singleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todos");
const authorisation = require("../middleware/authorisation");

router.get("/", authorisation, userTodos);

router.get("/:id", authorisation, singleTodo);

router.post("/", authorisation, createTodo);

router.put("/:id", authorisation, updateTodo);

router.delete("/:id", authorisation, deleteTodo);

module.exports = router;
