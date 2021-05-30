const TableClient = require('./DAO');
const DataIsEmpty = require('../../errors/DatasIsEmpty');
const InvalidField = require('../../errors/InvalidField');

class Client {
  constructor({
    id,
    name,
    cellPhone,
    address,
    gender,
    email,
    status,
    material_id,
    date_created,
    date_updated,
    version,
  }) {
    this.id = id;
    this.name = name;
    this.cellPhone = cellPhone;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.status = status;
    this.material_id = material_id;
    this.date_created = date_created;
    this.date_updated = date_updated;
    this.version = version;
  }

  async create() {
    this.valid();
    const result = await TableClient.insert({
      name: this.name,
      cellPhone: this.cellPhone,
      address: this.address,
      gender: this.gender,
      email: this.email,
      status: 'NEW',
      material_id: this.material_id,
    });

    this.id = result.id;
    this.date_created = result.date_created;
    this.date_updated = result.date_updated;
    this.version = result.version;
  }

  valid() {
    if (typeof this.name !== 'string' || this.name.length === 0) {
      throw new InvalidField('name');
    }
    if (typeof this.address !== 'string' || this.address.length === 0) {
      throw new InvalidField('address');
    }
    if (typeof this.email !== 'string' || this.email.length === 0) {
      throw new InvalidField('email');
    }
    if (typeof this.gender !== 'string' || this.gender.length === 0) {
      throw new InvalidField('gender');
    }
    if (typeof this.cellPhone !== 'string' || this.cellPhone === 0) {
      throw new InvalidField('cellPhone');
    }
  }

  async remove() {
    return TableClient.delete(this.id, this.material_id);
  }

  async findById() {
    const client = await TableClient.findById(this.id, this.material_id);
    this.name = client.name;
    this.email = client.email;
    this.address = client.address;
    this.cellPhone = client.cellPhone;
    this.gender = client.gender;
    this.date_created = client.date_created;
    this.date_updated = client.date_updated;
    this.version = client.version;
  }

  async udpate() {
    const datasUpdated = {};

    if (typeof this.name === 'string' && this.name.length > 0) {
      datasUpdated.name = this.name;
    }
    if (typeof this.email === 'string' && this.email.length > 0) {
      datasUpdated.email = this.email;
    }
    if (typeof this.gender === 'string' && this.gender.length > 0) {
      datasUpdated.gender = this.gender;
    }
    if (typeof this.cellPhone === 'number' && this.cellPhone > 0) {
      datasUpdated.cellPhone = this.cellPhone;
    }
    if (typeof this.address === 'string' && this.address.length > 0) {
      datasUpdated.address = this.address;
    }

    if (Object.keys(datasUpdated).length === 0) {
      throw new DataIsEmpty();
    }
    const ids = { id: this.id, material_id: this.material_id };
    return TableClient.updateRegister(ids, datasUpdated);
  }

  async sub() {
    return TableClient.sub(
      this.id,
      this.material_id,
      'sub_field',
      this.field_quantity
    );
  }
}

module.exports = Client;
