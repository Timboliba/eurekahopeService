// Importation du module http
const http=require('http')

// Importation de l'app express
const app=require('./routes/Routes')

// Innitialisation du port d'ecoute
const PORT=process.env.PORT || 8081

app.set('port',PORT)

//Créationdu serveur 
const serveur=http.createServer(app)

//Demarage du serveur
serveur.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})