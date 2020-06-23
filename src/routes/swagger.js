const express = require('express');
const path = require('path');
const swaggerUiExpress = require('swagger-ui-express');
const yamljs = require('yamljs')

const router = express.Router();
const filepathSwaggerDocument = path.resolve("src/openapi/openapi.yaml");
const swaggerDocument = yamljs.load(filepathSwaggerDocument);

router.use(swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

module.exports = router;