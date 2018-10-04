const express = require('express');
const chalk = require('chalk');

const PORT = 3001;

const app = express();

app.use(express.static('../client/build'));

app.listen(PORT, () => {
  console.log(chalk.bgGreen('Server up on port ') + chalk.bgBlue(PORT));
});
