// Filesystem based todo list.

const fs = require("fs");
const {Command} = require("commander");
const program = new Command;
const path = require("path");
const { time } = require("console");

const todosFilePath = path.join(__dirname, "todos.json");

// helper function to read the todos from the file
function readTodos() {
  if (!fs.existsSync(todosFilePath)) {
    return [];
  }
  const data = fs.readFileSync(todosFilePath, "utf-8");
  return JSON.parse(data || "[]");
}

// Helper function to write todos to the file
function writeTodos(todos) {
  fs.writeFileSync(todosFilePath, JSON.stringify
  (todos, null, 2), "utf-8");
}

program
    .command("add")
    .description("Add a new todo item")
    .argument("<Todo_Title>", "Enter the todo title")
    .argument("<Time>", "Enter the finish time")
    .action((todoTitle, time) => {
        const todos = readTodos();
        const newTodo = {
          Title: todoTitle,
          Deadline: time,
          Done: false,
        };

        todos.push(newTodo);
        writeTodos(todos);
        console.log("Todo added successfully!");
    });

program
    .command("remove")
    .description("Mark a todo item as done")
    .argument("<Todo_Title>", "Enter the todo title to mark as done")
    .action((todoTitle) => {
      let todos = readTodos();
      let todoFound = false;

      todos = todos.map((todo) => {
        if(todo.Title === todoTitle) {
          todo.Done = true;
          todoFound = true;
        }
        return todo;
      })
      if (todoFound) {
        writeTodos(todos);
        console.log("Todo marked as done!");
      } else {
        console.log("Todo not found!");
      }
    });

    program.parse();
