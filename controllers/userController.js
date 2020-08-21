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

                msg = {
                    results: "Usager ajouté"
                };
            }else{
                msg = {
                    results: "Usager non ajouté!",
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
    
   async updateUser(req, res){
        const user = req.body;
        let msg;
        try {
            if (user.username && user.gender && user.dob){
                const results = await userService.updateUser(
                    user.id, 
                    user.username, 
                    user.gender, 
                    user.dob, 
                    user.news, 
                    user.photo, 
                    user.photoLg, 
                    user.email);
                
                results['message'] ?
                    msg = {
                        results: results['message']
                    }
                :
                    msg = {
                        results: "Usager mis à jour!"
                    }

            }else{
                msg = {
                    message: "Usager non mis à jour!"
                };
            }

            res.json(msg);

        } catch (error) {
            res.status(400).json({
                message: error.message
            })
        }
    },
    
    async removeUser(req, res){
         const user = req.body;
         let msg;
         try {
             if (user.id){
                 const results = await userService.removeUser(user.id);
                 results['n'] == '1' 
                 ?
                    msg = {
                        results: "usager supprimé"
                    }
                 :
                    msg = {
                        results: "usager introuvable"
                    }
             }else{
                 msg = {
                    results: "Aucun usager n'a été sélectionné!"
                 };
             }
 
             res.json(msg);
 
         } catch (error) {
             res.status(400).json({
                message: error.message
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