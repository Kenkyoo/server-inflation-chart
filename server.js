const express = require('express');
const axios = require('axios').default;
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors())

app.get('/api', async (req, res) => {
    try {
        const response = await axios.get(`https://api.argentinadatos.com/v1/finanzas/indices/inflacion`);
        const data = response.data;
        const formatData = data.slice(-12);
        const fechas = [];
        const valores = [];
        formatData.forEach(element => {
            fechas.push(element.fecha);
            valores.push(element.valor);
        });
        res.json({ fechas, valores });
    } catch (error) {
        console.error(error);
        res.status(500).send('Hubo un error al obtener los datos.');
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


