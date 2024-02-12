const Driver = require("../collections/driver");

const login = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Driver.findOne({username: req.query.username, password: req.query.password})
            if (user === null){
                return resolve(res.json({ status: "error", result: "Username or Password mismatch." }))
            } else {
                return resolve(res.json({ status: "ok", result: user}))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({ error: e.message }))
        }
    });
};
const save = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const newDriver = new Driver({
            id: req.body.id,
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            busNumber: req.body.busNumber,
            test: req.body.test
        })
        try {
            const exitingUserByUsername = await Driver.find({username: req.body.username});
            if (exitingUserByUsername.length === 0){
                const savedUser = await newDriver.save()
                return resolve(res.json(savedUser))
            } else {
                return resolve(res.status(200).json({ reuslt: 'Username already exist' }))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({ error: e.message }))
        }
    });
};

const deleteDriver = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedUser = await Driver.find({name: req.body.username});
            const op = deletedUser.remove().exec();
            console.log('op', op)
            return resolve(res.json(deletedUser))
        } catch (e) {
            return reject(res.status(500).json({ error: e.message }))
        }
    });
};


module.exports = {
    login,
    save,
    deleteDriver,
};
