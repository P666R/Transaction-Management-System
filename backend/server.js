const app = require('./app');
require('dotenv').config();
const connectDB = require('./utils/database');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server started on port ${PORT}...`);
});
