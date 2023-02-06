
module.exports = (sequelize, DataTypes) => {
  const Commandes = sequelize.define(
    'Commandes', {

      id_user: {
        type: DataTypes.INTEGER,
      },
      id_prod: {
        type: DataTypes.INTEGER,
      },
      qte_commande:{
type:DataTypes.INTEGER
      }
    },
    {
tableName:'commandes'
    }
  );
  return Commandes;
};
