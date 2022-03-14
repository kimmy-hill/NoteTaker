const express = require('express');

const app = express();

const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

//Getting routes on server
app.use(require("./routes/index_api"));
app.use(require("./routes/index_html"));



app.listen(PORT, () => console.log(`App listening on PORT: ${PORT}`))