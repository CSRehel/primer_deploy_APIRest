const { errorHandler, boomErrorHandler } = require('./middleware/error');
const routerApi = require('./routes');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Ruta raíz del proyecto :)');
})

routerApi(app);

app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port);

