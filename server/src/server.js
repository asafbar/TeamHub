const env = require('./config/env')


const connectDB = require('./config/db')
const app = require("./app")

const PORT = env.port




//Start server + db
connectDB()

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})