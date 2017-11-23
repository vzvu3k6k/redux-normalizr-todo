/* eslint-env node */

const express = require("express");
const babelify = require("express-babelify-middleware");
const Immutable = require("immutable");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

let todos = Immutable.List();
let users = Immutable.List();

users = users.push(
  Immutable.fromJS({
    id: 1,
    name: "john",
    status: 1
  }),
  Immutable.fromJS({
    id: 2,
    name: "abbie",
    status: 0
  })
);

todos = todos.push(
  Immutable.fromJS({
    id: 1,
    body: "ticket #1",
    status: 1,
    userId: 1
  }),
  Immutable.fromJS({
    id: 2,
    body: "ticket #2",
    status: 1,
    userId: 2
  })
);

app.use("/bundle.js", babelify("./src/index.js"));
app.use(express.static("public"));
app.listen(3000, function(error) {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // eslint-disable-next-line no-console
    console.info("Open up http://localhost:3000/ in your browser");
  }
});

app.get("/users.json", function(req, res) {
  res.json({
    users: users.map(user => {
      return { user: user.toJS() };
    })
  });
});

app.get("/todos.json", function(req, res) {
  res.json({
    todos: todos.map(todo => {
      const user = users.find(user => {
        return todo.get("userId") === user.get("id");
      });
      return { todo: todo.merge({ user }).toJS() };
    })
  });
});

app.post("/todos.json", function(req, res) {
  const lastElem = todos.get(-1);
  const nextId = lastElem.get("id") + 1;
  const newTodo = Immutable.fromJS({
    id: nextId,
    body: req.body.body,
    status: 1,
    userId: req.body.userId
  });
  todos = todos.push(newTodo);
  const user = users.find(user => {
    return newTodo.get("userId") === user.get("id");
  });
  res.json({ todo: newTodo.merge({ user }).toJS() });
});

app.put("/todos/:id.json", function(req, res) {
  const todoId = parseInt(req.params.id, 10);
  let todo = todos.find(todo => {
    return todo.get("id") === todoId;
  });
  todo = todo.set("status", req.body.status);
  todos = todos.set(todoId - 1, todo);
  res.sendStatus(200);
});
