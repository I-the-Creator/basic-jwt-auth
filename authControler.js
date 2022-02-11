// describing 'user interactions' functions - registration, authorization and getting users - взаимодейтсвие с пользователем 

class authContrloller {
    async registration(req, res) {
        try {
           
        } catch (error) {
            
        }
    }

    async login(req, res) {
        try {
            
        } catch (error) {
            
        }
    }   

    async getUsers(req, res) {
        try {
            res.json('server working')
        } catch (error) {
            
        }
    }
}

// export object of 'authContloller' class
module.exports = new authContrloller()