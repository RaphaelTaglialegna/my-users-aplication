require('dotenv').config();
import app from './app'

const PORT = process.env.PORT || 5432;
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});