const express = require("express");
const bodyParser = require("body-parser");
const m = require('./controllers/Music_controller');
const PORT = 4200;

const app = express();
app.use(bodyParser.json());
app.get('/api/viewPlaylist',m.read);
app.post('/api/addSong',m.create);
app.put('/api/updateSong/:id',m.update);
app.delete('/api/deleteSong/:id',m.delete);

app.listen(PORT, ()=> console.log(`You are running on Port " ${PORT}`));



// app.get('/api/test',(req,res) => {
//     res.status(200).send('Hello from the backend!');
// })
