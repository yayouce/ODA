const express= require('express')
const mysql = require('mysql2')
const dotenv = require('dotenv')
// const {Sequelize} = require('sequelize')
// const Utilisateurs = require('./model/Utilisateurs')
// const Commandes = require('./model/CommandeModel')
// const Avis = require('./model/AvisModel')
// const Produits = require('./model/ProduitModel')
// const  sequelize = new Sequelize(process.env.DATA_BASE, process.env.USER,process.env.PASSWORD, {
//   host: process.env.HOST,
//   dialect: 'mysql'
// });






dotenv.config();
const app = express();
app.use(express.json())

const con = mysql.createConnection({
  host: process.env.HOST,
  user:process.env.USER,
  password: process.env.PASSWORD,
  database:process.env.DATA_BASE
});


//////////////operation sur user/////////////////////////////////
//get sur utilisateurs
app.get('/api/user',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM utilisateurs", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})

//post sur utilisateur
app.post('/api/user',(req,res)=>{
const{nom_user,prenom_user,adress_mail,password}=req.body

const sql = 'INSERT INTO utilisateurs (nom_user, prenom_user, adress_mail,password) VALUES (?, ?, ?,?)';
const values = [nom_user, prenom_user, adress_mail,password];

// Execute the prepared statement
con.execute(sql, values, (error, results) => {
  if (error) throw error;
  console.log(results.affectedRows + ' row(s) affected');
});

// Close the connection
con.end();
})
// delete utilisateur
app.delete('/api/user/:id', (req, res) => {
  var id = req.params.id;

  con.query(`SET FOREIGN_KEY_CHECKS=0`, function (err) {
    if (err) throw err;

    con.query(`DELETE FROM utilisateurs WHERE id_user=${id}`, function (err, result) {
      if (err) throw err;

      console.log(`Number of records deleted: ${result.affectedRows}`);

      con.query(`SET FOREIGN_KEY_CHECKS=1`, function (err) {
        if (err) throw err;

        res.send(`User with id ${id} was successfully deleted.`);
      });
    });
  });
});
// update utilisateurs
app.put('/api/utilisateurs/:id',(req,res)=>{
const id = req.params.id;
const data = req.body;

con.query('SELECT * FROM utilisateurs WHERE id_user = ?', [id], (error, result) => {
  if (error) {
    return res.status(500).json({ error });
  }

  const oldData = result[0];
  const nom_user = data.nom_user || oldData.nom_user;
  const prenom_user = data.prenom_user || oldData.prenom_user;
  const adress_mail = data.adress_mail || oldData.adress_mail;
  const password = data.password || oldData.password;

  const sql = `UPDATE utilisateurs SET nom_user = ?, prenom_user=?, adress_mail= ?,password=? WHERE id_user = ?`;
  const params = [nom_user, prenom_user, adress_mail, password, id];

  con.query(sql, params, (error, result) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ result });
  });
});
})


/////////////////operation sur produits////////////////////////

// get produits
app.get('/api/produits',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM produits", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})
//post sur produits
app.post('/api/produits',(req,res)=>{
const{nom_prod, desc_prod, prix_prod,qte_prod}=req.body

const sql = 'INSERT INTO produits (nom_prod, desc_prod, prix_prod,qte_prod) VALUES (?, ?, ?,?)';
const values = [nom_prod, desc_prod, prix_prod,qte_prod];

// Execute the prepared statement
con.execute(sql, values, (error, results) => {
  if (error) throw error;
res.json(results)
  console.log(results.affectedRows + ' row(s) affected');
});

// Close the connection
con.end();
})
// delete sur produits
app.delete('/api/produits/:id', (req, res) => {
  var id = req.params.id;

  con.query(`SET FOREIGN_KEY_CHECKS=0`, function (err) {
    if (err) throw err;

    con.query(`DELETE FROM produits WHERE id_prod=${id}`, function (err, result) {
      if (err) throw err;

      console.log(`Number of records deleted: ${result.affectedRows}`);

      con.query(`SET FOREIGN_KEY_CHECKS=1`, function (err) {
        if (err) throw err;

        res.send(`User with id ${id} was successfully deleted.`);
      });
    });
  });
});
// update produits
app.put('/api/produits/:id',(req,res)=>{
const id = req.params.id;
const data = req.body;

con.query('SELECT * FROM produits WHERE id_prod = ?', [id], (error, result) => {
  if (error) {
    return res.status(500).json({ error });
  }

  const oldData = result[0];
  const nom_prod = data.nom_prod || oldData.nom_prod;
  const desc_prod = data.desc_prod|| oldData.desc_prod;
  const prix_prod = data.prix_prod || oldData.prix_prod;
  const qte_prod = data.qte_prod || oldData.qte_prod;

  const sql = `UPDATE produits SET nom_prod = ?, desc_prod=?, prix_prod= ?,qte_prod=? WHERE id_prod = ?`;
  const params = [nom_prod, desc_prod, prix_prod,qte_prod, id];

  con.query(sql, params, (error, result) => {
    if (error) {
      return res.status(500).json({ error });
    }
    res.json({ result });
  });
});
})



/////////////operation sur commandes///////////////////////////
// get commandes
app.get('/api/commandes',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM commandes", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})
//post sur commandes
app.post('/api/commandes',(req,res)=>{
const{id_user, id_prod,qte_commande}=req.body

const sql = 'INSERT INTO commandes (id_user, id_prod,qte_commande) VALUES (?, ?, ?)';
const values = [id_user, id_prod,qte_commande];

// Execute the prepared statement
con.execute(sql, values, (error, results) => {
  if (error) throw error;
res.json(results)
  console.log(results.affectedRows + ' row(s) affected');
});

// Close the connection
con.end();
})
//statistique su rcomandes
app.get('/api/commandes',(req,res)=>{

})


//////////////////operation sur avis///////////////////////////

//get avis
app.get('/api/avis',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM avis", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})
//post sur avis
app.post('/api/avis',(req,res)=>{
const{id_user, id_prod,avis}=req.body

const sql = 'INSERT INTO avis (id_user, id_prod,avis) VALUES (?, ?, ?)';
const values = [id_user, id_prod,avis];

// Execute the prepared statement
con.execute(sql, values, (error, results) => {
  if (error) throw error;
res.json(results)
  console.log(results.affectedRows + ' row(s) affected');
});

// Close the connection
con.end();
})



//////////deux statisques sur les données//////////////////////////

//tous les produits ayant un prix superieur à 20
app.get('/api/produits/filtrebyprice',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM produits WHERE prix_prod > 20;", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})

//tous les produits ayant une quantitécomprise entre 150 et 300
app.get('/api/produits/filtrebyqte',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM produits WHERE qte_prod BETWEEN 150 AND 300", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})

// le nombre total utilsasteur dans la base de données
app.get('/api/utilisateur/stattotal',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT COUNT (*) as total FROM utilisateurs", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})
// le nombre d'utilisateur ayant passer une commande(id_user est referencer dans la  table commande comme clé etrangère) et afficher les utilisateurs avec  le produit commandé(id_prod est referencer dans la table commande comme clé etrangèr)
app.get('/api/globalstat',(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query(`SELECT utilisateurs.id_user, utilisateurs.nom_user, COUNT(commandes.id_commande) AS nb_commandes, produits.nom_prod
FROM utilisateurs
JOIN commandes ON utilisateurs.id_user = commandes.id_user
JOIN produits ON commandes.id_prod = produits.id_prod
GROUP BY utilisateurs.id_user, produits.nom_prod;`, function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
})







app.listen(5000,()=>{
console.log(`listen on port ${process.env.PORT}`)
})
