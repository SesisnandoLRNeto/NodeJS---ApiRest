const TableMaterial = require('./DAO');
const InvalidField = require('../../errors/InvalidField');
const DataIsEmpty = require('../../errors/DatasIsEmpty');

class Materials {
  constructor({
    id,
    material,
    description,
    quantity,
    type,
    price,
    date_created,
    date_updated,
    version,
  }) {
    this.id = id;
    this.material = material;
    this.description = description;
    this.quantity = quantity;
    this.type = type;
    this.price = price;
    this.date_created = date_created;
    this.date_updated = date_updated;
    this.version = version;
  }

  async create() {
    this.valid();
    const result = await TableMaterial.insert({
      material: this.material,
      description: this.description,
      quantity: this.quantity,
      type: this.type,
      price: this.price,
    });

    this.id = result.id;
    this.date_created = result.date_created;
    this.date_updated = result.date_updated;
    this.version = result.version;
  }

  async searchRegister() {
    const findMaterial = await TableMaterial.findById(this.id);

    this.material = findMaterial.material;
    this.description = findMaterial.description;
    this.price = findMaterial.price;
    this.quantity = findMaterial.quantity;
    this.type = findMaterial.type;
    this.date_created = findMaterial.date_created;
    this.date_updated = findMaterial.date_updated;
    this.version = findMaterial.version;
  }

  async updatedRegister() {
    await TableMaterial.findById(this.id);

    const fields = ['material', 'description', 'quantity', 'type', 'price'];
    const dataUpdated = {};

    fields.forEach((field) => {
      const value = this[field];

      if (typeof value === 'string' && value.length > 0) {
        dataUpdated[field] = value;
      }
    });

    if (Object.keys(dataUpdated).length === 0) throw new DataIsEmpty();
    await TableMaterial.updateRegister(this.id, dataUpdated);
  }

  async deleteRegister() {
    return TableMaterial.delete(this.id);
  }

  valid() {
    const fields = ['material', 'description', 'quantity', 'type', 'price'];

    fields.forEach((field) => {
      const value = this[field];

      if (typeof value !== 'string' || value.length === 0) {
        throw new InvalidField(field);
      }
    });
  }
}

module.exports = Materials;
