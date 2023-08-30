const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://root:root@localhost:27017/admin';
const dbName = 'jornada-backend'
const client = new MongoClient(url);

const main = async () => {
  console.log("Conectando ao banco de dados...");
  await client.connect();
  console.log("Banco de dados conectado com sucesso!");

  const db = client.db(dbName);
  const collection = db.collection('heroes');

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

  app.get('/heroes', async (req, res) => {
    const itens = await collection.find().toArray();
    console.log(itens);
    res.send(itens);
  });

  app.post('/heroes', async (req, res) => { 
    const item = req.body;
    
    await collection.insertOne(item);

    res.send(item);
  });

  app.get('/heroes/:id', async (req, res) => {
    const id = req.params.id;
    const item = await collection.findOne({
      _id: new ObjectId(id)
    });

    res.send(item);
  });

  app.put('/heroes/:id', async (req, res) => {
    const id  = req.params.id;
    const item = req.body.nome;

    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: item }
    )

    res.send(item);
  });

  app.delete('/heroes/:id', (req, res) => {
    const id = req.params.id;
    
    collection.deleteOne(
      { _id: new ObjectId(id) },
      { $set: item }
    );
    
    res.send('Item excluído com sucesso');
  });

  app.listen(3000);
}

main();