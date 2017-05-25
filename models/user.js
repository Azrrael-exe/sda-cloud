var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name : {type : String, required: true},
    id : {type: String, required: true},
  }, {versionKey: false}
)

userSchema.statics.findUser = function(require = true) {
  return function(req, res, next){
    mongoose.model('User').findOne({id : req.body.id || req.body.params}, function(err, user){
      if(err){
        res.status(500)
        res.send(err)
      }
      else{
        if(user){
          if(required){
            req.user = user
            next();
          }
          else {
            res.status(400)
            res.send("Usuario en la base de datos")
          }
        }
        else {
          if(require){
            res.status(404)
            res.send("User Not Found");
          }
          else {
            next();
          }
        }
      }
    })
  }
}

module.exports = mongoose.model('User', userSchema);
