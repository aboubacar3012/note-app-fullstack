const express = require('express');
const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2022-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2022-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true,
  },
  {
    id: 4,
    content: 'La Capsule',
    date: '2022-05-30T19:20:14.298Z',
    important: true,
  },
  {
    id: 5,
    content: 'IronHack',
    date: '2022-05-30T19:20:14.298Z',
    important: false,
  },
];

app.get('/', (request, response) => {
  response.redirect('/api/notes');
});

app.get('/api/notes', (request, response) => {
  response.json(notes);
});

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (!note) return response.status(404).json({ message: 'Not Found !!!' });
  return response.json(note);
});

app.post('/api/notes', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(200).json({ success: false, error: { code: 404, type: 'Missing', message: 'Content missing' } });
  }

  const maxId = notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  const noteObject = {
    id: maxId + 1,
    content: body.content,
    date: new Date().toISOString(),
    important: body.important || false,
  };
  notes = notes.concat(noteObject);
  return response.status(200).json({ message: 'note created successfully' });
});

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(200).json({ message: 'Note deleted successfully' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
