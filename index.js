/**
Assignment #2 - Filesystem based todo list.

Create a `cli` that lets a user

    1. Add a todo
    2. Delete a todo
    3. Mark a todo as done

    Store all the data in files (todos.json)


    1. Add a To-Do : To add a new to-do item, use the add command followed by the deadline and the to-do title:
    $ node index.js add <Todo_Ttle> <Time>
    $ node index.js add "Go to Gym" "18:00"

    2. Remove a To-Do : To remove an existing to-do item, use the remove command followed by the title and the date of the JSON file:
    $ node index.js remove <Todo_Ttle> <Date>
    $ node index.js remove "Go to Gym" "2024-08-25"

    3. Mark a To-do done : To Mark an existing to-do item done, use the mark command followed by the title and the date of the JSON file:
    $ node index.js mark <Todo_Ttle> <Date>
    $ node index.js mark "Go to Gym" "2024-08-25"

    - For help
    $ node index.js -h
 */
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