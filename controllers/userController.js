const userService = require('../services/userServices');

module.exports = {
    async getAllUsers(req, res){
        try
        {
            const results = await userService.getAllUsers();
            let msg;

            results['message'] ?
                msg ={
                     message: results['message']
                }
            :
                msg = {
                    results
                    }
            
            res.json(msg)

        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    },

    async getUsers(req, res){
        try
        {
            let { size, page } = req.params
            size = size || 10;
            page = page || 1;

            //des info supplémentaires à envoyer au client
            const options = {
                "nombre": size,
                "page": page
            };
            const results = await userService.getUsers(size, page);
            let msg;

            results['message'] ?
                msg ={
                    message: results['message'],
                }
            :
                msg = {
                    results
                    }
            
            res.json(msg)

        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error.message
            })
        }
    },
    
    async getUser(req, res){
        try {
        const id = req.params.id;
        const results = await userService.getUser(id);
        let msg;
        results['message'] ?
            msg = {
                message: "Usager n'existe pas !",
            }
        :
            msg = {
                results
                }
            
        res.json(msg);

        } catch(error) {
            res.status(400).json({
                status: 400,
                'message': error.message
            })
        }
    },
    
   async addUser(req, res){
        const user = req.body;
        
        let msg;
        try {
            if (user.username && user.gender && user.dob){

                const newUser = await userService.addUser(user);
                
                switch (newUser['resultat']) {
                    case null:
                        msg = {
                            results: 'Usager ajouté!',
                            status: 200
                        }
                      break;
                    default:
                        msg = {
                            results: newUser['resultat'],
                            status: 400
                        }
                  } 
            }else{
                msg = {
                    results: 'Usager non ajouté!',
                    status: 400
                };
            }
            res.json(msg)
            
        } catch (error) {
            res.status(400).json({
                status: 400,
                results: newUser
            })
        }
    },
    
   async updateUser(req, res){
        const user = req.body;
        let msg;
        try {
            if (user.id && user.gender && user.dob && user.email){
                const results = await userService.updateUser(
                    user.id, 
                    user.gender, 
                    user.dob,  
                    user.email);
                
                results['message'] ?
                    msg = {
                        results: results['message'],
                        status: 400
                    }
                :
                    msg = {
                        results: "Usager mis à jour!",
                        status: 200
                    }

            }else{
                msg = {
                    results: "Usager non mis à jour!",
                    status: 400
                };
            }
            res.json(msg);

        } catch (error) {
            res.status(400).json({
                status: 400,
                results: error.message
            })
        }
    },
    
    async removeUser(req, res){
         const id = req.params.id;
         let msg;
         try {
             if (id){
                 const deleted = await userService.removeUser(id);
                 deleted['n'] == '1' 
                 ?
                    msg = {
                        results: "Usager supprimé",
                        status: 200
                    }
                 :
                    msg = {
                        results: deleted['message'],
                        status: 400
                    }
             }else{
                 msg = {
                    results: "Aucun id n'a été sélectionné!",
                    status: 400
                 };
             }
 
             res.json(msg);
 
         } catch (error) {
             res.status(400).json({
                results: error.message,
                status: 400
             })
         }
     },
    
     async searchUser(req, res){
        const username = req.params.username;
        let msg;
        try {
            if (username){
                const results = await userService.searchUser(username);
                results['message'] ?
                    msg = {
                        message: results['message']
                    }
                :
                    msg = {
                        results
                        }
            }else{
                msg = 'Erreur!'
            }
            res.json(msg);
        } catch (error) {
            res.status(400).json({
               message: error.message
            })
        }
    },    
    //  async removeAllUsers(req, res){
    //     try {
    //         const removeUser = await userService.removeAllUsers();
    //         res.json(removeUser);

    //     } catch (error) {
    //         res.status(400).json({
    //             status: 401,
    //             // message: error.message
    //         })
    //     }
    // }
}