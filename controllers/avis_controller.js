const con = require("../db/db");


 const get_avisController=(req,res)=>{
con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM avis", function (err, result, fields) {
    if (err) throw err;
    res.json(result);
  });
});
}
module.exports = get_avisController;
