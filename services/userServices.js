const User = require('../database/db');

module.exports = {
    getAllUsers(){
        try {
         return Users.find({});
        } catch(error) {
            return {message: error.message}
        }
     },

   getUsers(size, page){
       try {
           const affichage = (page - 1) * size;
           return  User.find().skip(affichage).limit(Number(size));
        
       } catch(error) {
           return {message: error.message}
       }
    },

    getUser(_id){
        try {
            return User.findOne({_id});
        } catch(error) {
            return {message: error.message}
        }
    },

   async addUser(newUser){
       try {
            if(!await User.findOne({username: newUser.username})){
                const rslt = await User.insertMany([{
                    username: newUser.username, 
                    gender: newUser.gender, 
                    news: newUser.news, 
                    email: newUser.email, 
                    photo: newUser.photo, 
                    dob: newUser.dob
                    }])
                
                    return ({resultat: null})
            } else {
                return ({resultat: 'Usager existe déjà!'})
            }

        } catch(error) {
            return {resultat: error.message}
        }
    },

   updateUser(id, username, gender, dob, news, photo, photoLg, email){
       try { 
            news = news || 'false';
            //findByIdAndUpdate : 1er param c'est le critère de recherche (id) le 2eme objet représente les nvelles info username: username, etc
            // mongoose.set('useFindAndModify', true);
           return User.findByIdAndUpdate({_id: id},{username, gender, dob, news, photo, photoLg, email})
        } catch(error) {
            return {message: error.message }
        }
    },

   removeUser(id){
       try {
           return User.deleteOne({_id: id})
        } catch(error) {
            return {message: error.message}
        }
    },

    searchUser(username){
        try {
            return User.find({username: {'$regex' : username, '$options' : 'i'}});
         } catch(error) {
             return {message: error.message}
         }
     },

//    removeAllUsers(){
//        try {
//            return User.remove({})
//         } catch(error) {
//             return error.message
//         }
//     }
}