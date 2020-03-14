const mongoose = require('mongoose')

const mongoConnectString = process.env.MONGODB_URL

mongoose.connect(mongoConnectString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})