import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Task structure with a status field
function createTask(title, category) {
  return { title, category, status: 'active' };
}

let dayTasks = [];
let workTasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks: dayTasks, title: 'To Do List' });
});

app.post('/add', (req, res) => {
  const taskTitle = req.body.task;
  const category = req.body.category;

  if (category === 'day') {
    dayTasks.push(createTask(taskTitle, category));
  } else if (category === 'work') {
    workTasks.push(createTask(taskTitle, category));
  }

  res.redirect('/');
});

app.post('/complete', (req, res) => {
  const taskIndex = req.body.taskIndex;
  const category = req.body.category;

  if (category === 'day') {
    dayTasks[taskIndex].status = 'completed';
  } else if (category === 'work') {
    workTasks[taskIndex].status = 'completed';
  }

  res.redirect('/');
});

app.post('/delete', (req, res) => {
  const taskIndex = req.body.taskIndex;
  const category = req.body.category;

  if (category === 'day') {
    dayTasks.splice(taskIndex, 1);
  } else if (category === 'work') {
    workTasks.splice(taskIndex, 1);
  }

  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});