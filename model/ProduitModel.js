
module.exports = (sequelize, DataTypes) => {
  const Produits = sequelize.define(
    'Produits', {

      nom_prod: {
        type: DataTypes.INTEGER,
      },
      desc_prod: {
        type: DataTypes.STRING,
      },
      prix_prod:{
type:DataTypes.INTEGER
      },
qte_prod:{
type:DataTypes.INTEGER
}
    },
    {
tableName:'produits'
    }
  );
  return Produits;
};
