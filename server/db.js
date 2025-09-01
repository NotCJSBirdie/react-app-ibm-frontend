const mongoose = require('mongoose');
// Updated mongoURI with correct host IP from your credentials
const mongoURI = "mongodb://root:wQBv7sS6ucRAheUd08JBRAAu@172.21.104.147:27017";

// Add this line to suppress the deprecation warning
mongoose.set('strictQuery', false);

const connectToMongo = async (retryCount) => {
    const MAX_RETRIES = 3;
    const count = retryCount ?? 0;
    try {
        await mongoose.connect(mongoURI, { dbName: 'stayhealthybeta1'});
        console.info('Connected to Mongo Successfully')

        return;
    } catch (error) {
        console.error(error);

        const nextRetryCount = count + 1;

        if (nextRetryCount >= MAX_RETRIES) {
            throw new Error('Unable to connect to Mongo!');
        }

        console.info(`Retrying, retry count: ${nextRetryCount}`)

        return await connectToMongo(nextRetryCount);

    }
};

module.exports = connectToMongo;