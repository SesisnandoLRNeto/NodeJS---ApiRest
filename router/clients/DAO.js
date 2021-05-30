const NotFound = require('../../errors/NotFound');
const Model = require('./Model');
const instance = require('../../db');

module.exports = {
  listAllByMaterialId(idMaterial) {
    return Model.findAll({
      where: {
        material_id: idMaterial,
      },
      raw: true,
    });
  },
  async findById(id, material_id) {
    const findRegister = await Model.findOne({
      where: {
        id: id,
        material_id: material_id,
      },
      raw: true, //bring without sequelize datas unecessaries
    });

    if (!findRegister) {
      throw new NotFound();
    }
    return findRegister;
  },
  insert(client) {
    return Model.create(client);
  },
  delete(id, material_id) {
    return Model.destroy({
      where: {
        id: id,
        material_id: material_id,
      },
    });
  },
  updateRegister(ids, datasUpdated) {
    return Model.update(datasUpdated, {
      where: {
        id: ids.id,
        material_id: ids.material_id,
      },
    });
  },
  sub(id, material_id, field, quantity) {
    return instance.transaction(async (transaction) => {
      const client = await Model.findOne({
        where: {
          id: id,
          material_id: material_id,
        },
      });

      client[field] = quantity;

      await client.save();

      return client;
    });
  },
};
