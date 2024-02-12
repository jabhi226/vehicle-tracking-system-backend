const DriverLocation = require("../collections/driverLocation");

const getByBusNumber = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const latLong = await DriverLocation.findOne({busNumber: req.query.busNumber})
            if (latLong == null) {
                return resolve(res.json({status: "error", result: "Bus not found"}))
            } else {
                return resolve(res.json({status: "ok", result: latLong}))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({error: e.message}))
        }
    });
};
const upsertLocation = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const upserted = await DriverLocation.updateOne({busNumber: req.body.busNumber}, {
                busNumber: req.body.busNumber,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                timestamp: req.body.timestamp
            }, {upsert: true})
            if (upserted == null) {
                return resolve(res.json({status: "error", result: "error."}))
            } else {
                return resolve(res.json({status: "ok", result: upserted}))
            }
        } catch (e) {
            console.error(e)
            return reject(res.status(500).json({error: e.message}))
        }
    });
};

const deleteLocation = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const deletedUser = await DriverLocation.find({name: req.body.username});
            const op = deletedUser.remove().exec();
            console.log('op', op)
            return resolve(res.json(deletedUser))
        } catch (e) {
            return reject(res.status(500).json({error: e.message}))
        }
    });
};


module.exports = {
    getByBusNumber,
    upsertLocation,
    deleteLocation,
};
