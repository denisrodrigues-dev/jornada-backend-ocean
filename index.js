const express = require('express');
const app = express();

app.use(express.json());

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/oi', function (req, res) {
  res.send('Olá mundo!')
})

const heroes = [
  { id: '1', nome: 'Superman' },
  { id: '2', nome: 'Batman' },
  { id: '3', nome: 'Mulher Maravilha' },
  { id: '4', nome: 'Homem-Aranha' },
  { id: '5', nome: 'Homem de Ferro' },
  { id: '6', nome: 'Thor' },
  { id: '7', nome: 'Capitão América' },
  { id: '8', nome: 'Hulk' },
  { id: '9', nome: 'Flash' },
  { id: '10', nome: 'Lanterna Verde' },
  { id: '11', nome: 'Viúva Negra' },
  { id: '12', nome: 'Pantera Negra' },
  { id: '13', nome: 'Aquaman' },
  { id: '14', nome: 'Wolverine' },
  { id: '15', nome: 'Mulher-Gato' },
  { id: '16', nome: 'Deadpool' },
  { id: '17', nome: 'Doutor Estranho' },
  { id: '18', nome: 'Capitã Marvel' },
  { id: '19', nome: 'Homem-Formiga' },
  { id: '20', nome: 'Viúva Negra' }
];

app.get('/heroes', (req, res) => res.send(heroes));

app.post('/heroes', (req, res) => { 
  const hero = req.body;
  heroes.push(hero);
  
  res.send('Registro criado com sucesso!') 
});

app.get('/heroes/:id', (req, res) => {
  const id = req.params.id;
  const hero = heroes.find((hero) => hero.id === id);

  res.send(hero);
});

app.put('/heroes/:id', (req, res) => {
  const id  = req.params.id;
  const hero = req.body.nome;

  const indexHero = heroes.findIndex((hero) => hero.id === id);
  heroes[indexHero].nome = hero;

  res.send('Item atualizado com sucesso');
});

app.delete('/heroes/:id', (req, res) => {
  const id = req.params.id;
  indexHero = heroes.findIndex((hero) => hero.id === id);
  heroes.splice(indexItem, 1);
  
  res.send('Item excluído com sucesso');
});

app.listen(3000)