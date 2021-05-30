const router = require('express').Router({ mergeParams: true });
const Client = require('./Client');
const DAO = require('./DAO');

const SerializerClient = require('../../api/Serializer').SerializerClient;

router.options('/', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'GET', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204);
  res.end();
});

router.get('/', async (req, res, next) => {
  try {
    const idMaterial = parseInt(req.material.id); //catch in request passing by route middleware
    const clientsByMaterialId = await DAO.listAllByMaterialId(idMaterial);

    res.status(200);
    const serializer = new SerializerClient(res.getHeader('Content-Type'));

    res.send(
      // JSON.stringify(clientsByMaterialId)
      serializer.serializer(clientsByMaterialId)
    );
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const idMaterial = parseInt(req.material.id);
    const clientPOSTED = req.body;

    const clientCreated = Object.assign({}, clientPOSTED, {
      material_id: idMaterial,
    });
    const client = new Client(clientCreated);
    await client.create();

    res.set('Etag', client.version);
    const timeStamp = new Date(client.date_updated).getTime();
    res.set('Last-Modified', timeStamp);
    res.set(
      'Location',
      `api/clients/${client.material_id}/client/${client.id}`
    );
    const serializer = new SerializerClient(res.getHeader('Content-Type'));

    res.status(201);
    res.send(
      // JSON.stringify(client)
      serializer.serializer(client)
    );
  } catch (error) {
    next(error);
  }
});

router.options('/:id', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'DELETE', 'GET', 'HEAD', 'PUT');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204);
  res.end();
});

router.delete('/:id', async (req, res) => {
  const datas = {
    id: req.params.id,
    material_id: req.material.id,
  };

  const client = new Client(datas);
  await client.remove();
  await client.findById();

  res.set('Etag', client.version);
  const timeStamp = new Date(client.date_updated).getTime();
  res.set('Last-Modified', timeStamp);

  res.status(204);
  res.end();
});

router.get('/:id', async (req, res, next) => {
  try {
    const datas = {
      id: req.params.id,
      material_id: req.material.id,
    };

    const client = new Client(datas);

    await client.findById();

    res.set('Etag', client.version);
    const timeStamp = new Date(client.date_updated).getTime();
    res.set('Last-Modified', timeStamp);

    const serializer = new SerializerClient(res.getHeader('Content-Type'));
    res.status(200);
    res.send(
      // JSON.stringify(client)
      serializer.serializer(client)
    );
  } catch (error) {
    next(error);
  }
});

router.head('/:id', async (req, res, next) => {
  try {
    const datas = {
      id: req.params.id,
      material_id: req.material.id,
    };

    const client = new Client(datas);

    await client.findById();

    res.set('Etag', client.version);
    const timeStamp = new Date(client.date_updated).getTime();
    res.set('Last-Modified', timeStamp);

    res.status(200);
    res.end();
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const datas = {
      id: req.params.id,
      material_id: req.material.id,
    };

    const dataUpdated = Object.assign({}, req.body, datas);
    const client = new Client(dataUpdated);
    await client.udpate();
    await client.findById();

    res.set('Etag', client.version);
    const timeStamp = new Date(client.date_updated).getTime();
    res.set('Last-Modified', timeStamp);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.options('/:id/reduce-quantity', (req, res) => {
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.status(204);
  res.end();
});

//router no used, but realize sub of quantity field in case exists
router.post('/:id/reduce-quantity', async (req, res, next) => {
  try {
    const datas = {
      id: req.params.id,
      id_material: req.material.id,
    };
    const client = new Client(datas);
    await client.findById();

    await client.sub();
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
