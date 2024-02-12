const Parent = require("../collections/parent");

const login = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Parent.findOne({username: req.query.username, password: req.query.password})
            if (user === null) {
                return resolve(res.json({status: "error", result: "Username or Password mismatch."}))
            } else {
                return resolve(res.json({status: "ok", result: user}))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({error: e.message}))
        }
    });
};
const save = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const newParent = new Parent({
            id: req.body.id,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            busNumber: req.body.busNumber,
        })
        try {
            const exitingParentByUsername = await Parent.find({username: req.body.username});
            if (exitingParentByUsername.length === 0) {
                const savedParent = await newParent.save()
                return resolve(res.json(savedParent))
            } else {
                return resolve(res.status(200).json({result: 'Username already exist'}))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({error: e.message}))
        }
    });
};

const deleteDriver = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedUser = await Parent.find({name: req.body.username});
            const op = deletedUser.remove().exec();
            return resolve(res.json(deletedUser))
        } catch (e) {
            return reject(res.json(res.status(500).json({error: e.message})))
        }
    });
};


module.exports = {
    login,
    save,
    deleteDriver,
};
