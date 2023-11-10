// Importation du module express
const express=require('express');
 
// Importation de la connection
const connectDB=require('../mongoDb/MongoConnect')

connectDB();

const app=express()
app.use(express.json());
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
// Récupération de tout les utilisateurs
app.get('/api/Utilisateur', (req, res) => {
  // limit(nombrelimite) permet d'indiquer le nombre que l'on désire afficher
  Utilisateur.find({}).limit(10)
    .then(users => res.status(200).json(users))
    .catch(error => {
      res.status(404).json({ error: error.message });
    });
});


app.post('/api/Utilisateur', async (req, res) => {
  try {
    const nouvelUtilisateur = new Utilisateur({
      nom: req.body.nom,
      prenom: req.body.prenom,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      telephone: req.body.telephone,
      description: req.body.description
    });
    const savedUser = await nouvelUtilisateur.save();
    res.status(201).json(savedUser);
    console.log("Succès");
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log("Échec");
  }
});



// Authentification d'un utilisateur
app.get('/api/Utilisateur/:id', (req, res) => {
  const userId = req.params.id;
  Utilisateur.findOne({ _id:userId })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json(user);
    })
    .catch(error => res.status(500).json({ error: "Erreur serveur" }));
});

// Mise ajour d'un utilisateur
app.put('/api/Utilisateur/:id', async (req, res) => {
  const userId = req.params.id; // Récupérez l'ID de l'utilisateur à mettre à jour depuis les paramètres de l'URL.
  const { nom, prenom, username, password, email, telephone, description } = req.body;

  // Recherchez l'utilisateur existant en utilisant son ID, puis mettez à jour ses informations.
  Utilisateur.findByIdAndUpdate(userId, {
    nom,
    prenom,
    username,
    password,
    email,
    telephone,
    description
  }, { new: true }) // L'option { new: true } renvoie la version mise à jour de l'utilisateur.
    .then(updatedUser => {
      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json(updatedUser);
      console.log("Mise à jour réussie");
    })
    .catch(error => {
      res.status(400).json({ error: error.message });
      console.log("Échec de la mise à jour");
    });
});


// Suppression d'un utilisateur par username
app.delete('/api/Utilisateur/:id', (req, res) => {
  const id = req.params.id;

  Utilisateur.deleteOne({ _id:id })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }
      res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    })
    .catch(error => res.status(500).json({ error: "Erreur serveur" }));
});

/***************************************Routes Services******************************************************************** */

// Récuperer tout les services
app.get('/api/Services/', (req, res, next) => {
  Service.find({})
    .then(think => res.status(200).json(think))
    .catch(error => res.status(404).json(error))
    next()
});



/*****************************************Routes Commentaires**************************************************************** */

// Récuperation de tout les commenteur
app.get('/api/Commentaire/:id',(req,res,next)=>{
  Commentaire.find({}).limit(1)
  .then(think=>res.status(200).json(think))
  .catch(error=>res.status(404).json(error))
})


/****************************************Routes Messages******************************************************************************/
// app.get('/api/Message/:idSender/:idReceiver',(req,res,next)=>{
//   Message.find([{_idSender:req.params.idSender,_idReceiver:req.params.idReceiver}])
//   .then(think=>res.status(200).json(think))
//   .catch(error=>res.status(404).json(error))
// })

/****************************************Routes Notes******************************************************************************/
app.post('/api/Note/', (req, res) => {
  // Création d'une nouvelle instance de Note en utilisant le modèle
  const newNote = new Note({
    _id: 'teste2',
    _idPrestateur: 'testePresta',
    _idClient: 'testeCli2',
    Note: 5
  });

  app.get('/api/Note/:idUser',(req,res)=>{
    const id=req.params.idUser;
    Note.findOne({_id:idUser})
    .then(Note=>res.status(200).json(Note))
    .catch(error=>res.status(404).json(error))
  })
  
});


// Récupperation de toute les notes
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

app.delete('/api/Note/:id', (req, res) => {
  const id = req.params.id;
  Note.deleteOne({ _id: id })
    .then(result => {
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Note non trouvé" });
      }
      res.status(200).json({ message: "Note supprimé avec succès" });
      
    })
    .catch(error => {
      console.error("Error deleting the note:", error);
      res.status(500).json({ error: "Erreur serveur" });
    });
});


module.exports =app;