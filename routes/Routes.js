// Importation du module express
const express=require('express');
 
// Importation de la connection
const connectDB=require('../mongoDb/MongoConnect')

connectDB();

const app=express()

// Importation des  schéma de base de donnée [utilisateur,service,commentaire]
const Utilisateur=require('../models/Utilisateur')
const Service=require('../models/Service')
const Commentaire=require('../models/Commentaire');
// const Message=require('../models/Message');
const Note=require('../models/Note')
const { error } = require('console');



// Pour eviter les erreur de  CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

/********************************************Routes Utilisateurs******************************************************/
// Recupération de la liste de tout les utilisateurs
  app.get('/api/Utilisateur', (req, res, next) => {
    // limit(nombrelimite) permet d'indiquer le nombre que lon desire afficher
    Utilisateur.find({}).limit(10)
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });

// Ajout d'un utilisateur
app.post('/api/Utilisateur', (req, res, next) => {
  delete req.body._id
  const  utilisateur=new Utilisateur({
    ...req.body
  })
  utilisateur.save()
  .then(think=>res.status(201).json({message:"Objet enregistré avec success!"}))
  .catch(error=>res.status(404).json({error}))
});

// Recherche d'un utilisateur
app.get('/api/Utilisateur/:id',(req,res,next)=>{
  Utilisateur.findOne({_id:req.params.id})
  .then(think=>res.status(200).json(think))
  .catch(error=>res.status(404).json({error}))
})


// Teste Authentification
app.get('/api/Utilisateur/:username',(req,res,next)=>{
  Utilisateur.findOne({username:req.params.username})
  .then(think=>res.status(201).json(think))
  .catch(error=>res.status(404).json({error}))
})

// Suppression d'un utilisateur par son nom d'utilisateur
app.delete('/api/Utilisateur/:username',(req,res,next)=>{
  Utilisateur.deleteOne({username:req.params.username})
  .then(thing=>res.status(200).json(thing))
  .catch(error=>res.status(404).json({error}))
})

/***************************************Routes Services******************************************************************** */

// Récuperer tout les services
app.get('/api/Service/',(req,res,next)=>{
  Service.find({})
  .then(think=>res.status(200).json(think))
  .catch(error=>res.status(404).json(error))
  next()
})


/*****************************************Routes Commentaires**************************************************************** */

// Récuperation de tout les commenteur
app.get('/api/Commentaire/',(req,res,next)=>{
  Commentaire.find({}).limit(10)
  .then(think=>res.status(200).json(think))
  .catch(error=>res.status(404).json(error))
})


/****************************************Routes Messages******************************************************************************/
// app.get('/api/Message/:idSender/:idReceiver',(req,res,next)=>{
//   Message.find([{_idSender:req.params.idSender,_idReceiver:req.params.idReceiver}])
//   .then(think=>res.status(200).json(think))
//   .catch(error=>res.status(404).json(error))
// })

/****************************************Routes Messages******************************************************************************/
app.post('/api/Note/', (req, res, next) => {
  // Création d'une nouvelle instance de Note en utilisant le modèle
  const newNote = new Note({
    _id: 'teste2',
    _idPrestateur: 'testePresta',
    _idClient: 'testeCli2',
    Note: 5
  });

  // Enregistrement la nouvelle note dans la base de données
  newNote.save()
    .then(savedNote => {
      res.status(201).json(savedNote); //Code 201 pour indiquer que la ressource a été créée avec succès
    })
    .catch(error => {
      res.status(400).json({ error: error.message }); //Code 400 pour indiquer une mauvaise requête
    });
});

app.get('/api/Note', (req, res, next) => {
  //Méthode find du modèle pour récupérer toutes les notes de la base de données
  Note.find({})
    .then(Note => {
      res.status(200).json(Note);
    })
    .catch(error => {
      res.status(500).json({ error: error.message }); //Code 500 pour indiquer une erreur interne du serveur
    });
});


module.exports =app;