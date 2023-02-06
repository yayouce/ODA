
module.exports = (sequelize, DataTypes) => {
  const Avis = sequelize.define(
    'Avis', {

      id_user: {
        type: DataTypes.INTEGER,
      },
      id_prod: {
        type: DataTypes.INTEGER,
      },
      avis:{
type:DataTypes.STRING
      }
    },
    {
tableName:'avis'
    }
  );
  return Avis;
};


