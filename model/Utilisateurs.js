module.exports = (sequelize, DataTypes) => {
  const Utilisateurs = sequelize.define(
    'Utilinsateurs', {

      nom_user: {
        type: DataTypes.INTEGER,
      },
      prenom_user: {
        type: DataTypes.STRING,
      },
      adress_mail:{
type:DataTypes.INTEGER
      },
password:{
type:DataTypes.INTEGER
}
    },
    {
tableName:'utilisateurs'
    }
  );
  return Utilisateurs;
};