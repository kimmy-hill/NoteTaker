const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('./public'));

//Getting routes on server
require("./routes/index_api")(app);
require("./routes/index_html")(app);


app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))