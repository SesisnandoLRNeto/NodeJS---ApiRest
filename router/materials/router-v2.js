const router = require('express').Router();
const TableMaterials = require('./DAO');

const SerializerMaterial = require('../../api/Serializer').SerializerMaterial;

router.options('/', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204);
  res.end();
});

router.get('/', async (req, res) => {
  const resource = await TableMaterials.listAll();

  res.status(200);
  const serializerHeader = new SerializerMaterial(
    res.getHeader('Content-Type')
  );
  res.send(
    // JSON.stringify(resource)
    serializerHeader.serializer(resource)
  );
});

module.exports = router;
