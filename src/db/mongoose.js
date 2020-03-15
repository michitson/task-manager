const mongoose = require('mongoose')

//const mongoConnectString = process.env.MONGODB_URL

const mongoConnectString = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@docdb-2020-03-14-20-41-35.cluster-cxzwyo0p9ajk.eu-west-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false`

mongoose.connect(mongoConnectString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})