const express = require('express');
const promClient = require('prom-client');
const pidusage = require('pidusage');

const mongoose = require('mongoose');
const router = express.Router();
require('marko/node-require').install();
require('marko/express');

let Piloto = require('../models/Piloto');
let indexTemplate = require('../views/index.marko');

const register = new promClient.Registry();
register.setDefaultLabels({
  app: "node-aplication"
})


const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'status_code'],
});

const errorCounter = new promClient.Counter({
  name: 'app_errors_total',
  help: 'Total number of application errors',
});

const histogram = new promClient.Histogram({
    name: 'app_request_duration',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'status_code'],
    buckets: [0.1, 5, 15, 50, 100, 500]
  });

const gauge = new promClient.Gauge({
  name: "users",
  help:  "user online"
})

register.registerMetric(histogram);

router.get('/error', (req, res) => {
    res.status(500).json({ error: "Error Test" });
    errorCounter.inc();
});

router.get('/metrics', (async (request, response) => {
  response.set('Content-Type', promClient.register.contentType);
    response.send(await promClient.register.metrics());
  }));

router.get('/', (req, res) => {
  if (mongoose.connection.readyState) {
    Piloto.find({}).then((pilotos) => {
      httpRequestCounter.labels(req.method, res.statusCode).inc();
      gauge.inc()
      res.marko(indexTemplate, { pilotos: pilotos });
    });
  } else {
    res.marko(indexTemplate);
  }
});

router.get('/:id', (req, res) => {
  const pilotoId = req.params.id;
  if (mongoose.connection.readyState) {
    Piloto.find({ number: pilotoId }).then((pilotos) => {
      httpRequestCounter.labels(req.method, res.statusCode).inc();
      gauge.inc()
      res.marko(indexTemplate, { pilotos: pilotos });
    });
  } else {
    res.marko(indexTemplate);
  }
});


module.exports = router;
