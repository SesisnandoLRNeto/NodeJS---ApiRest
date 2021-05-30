const ValueNotSupport = require('../errors/ValueNotSupport');
const jsontoxml = require('jsontoxml');

class Serializer {
  json(datas) {
    return JSON.stringify(datas);
  }

  xml(datas) {
    let tag = this.tagSingle;

    if (Array.isArray(datas)) {
      tag = this.tagPlure;
      datas = datas.map((data) => {
        return { [this.tagSingle]: data };
      });
    }

    return jsontoxml({ [tag]: datas });
  }

  serializer(datas) {
    const data = this.filter(datas);
    if (this.contentType === 'application/json') {
      // return this.json(this.filter(datas))
      return this.json(data);
    }
    if (this.contentType === 'application/xml') {
      return this.xml(data);
    }
    throw new ValueNotSupport(this.contentType);
  }

  filterDatas(datas) {
    const newObj = {};

    this.fieldsFiltredDTO.forEach((field) => {
      if (datas.hasOwnProperty(field)) {
        newObj[field] = datas[field];
      }
    });

    return newObj;
  }

  filter(datas) {
    if (Array.isArray(datas)) {
      datas = datas.map((data) => {
        return this.filterDatas(data);
      });
    } else {
      datas = this.filterDatas(datas);
    }

    return datas;
  }
}

class SerializerMaterial extends Serializer {
  constructor(contentType, fieldsExtras) {
    super();
    this.contentType = contentType;
    this.fieldsFiltredDTO = ['id', 'material', 'price', 'description'].concat(
      fieldsExtras || []
    );
    this.tagSingle = 'material';
    this.tagPlure = 'materials';
  }
}

class SerializerProvider extends Serializer {
  constructor(contentType, fieldsExtras) {
    super();
    this.contentType = contentType;
    this.fieldsFiltredDTO = [
      'id',
      'name',
      'description',
      'cellPhone',
      'address',
    ].concat(fieldsExtras || []);
    this.tagSingle = 'provider';
    this.tagPlure = 'providers';
  }
}

class SerializerClient extends Serializer {
  constructor(contentType, fieldsExtras) {
    super();
    this.contentType = contentType;
    this.fieldsFiltredDTO = ['id', 'name', 'address', 'cellPhone'].concat(
      fieldsExtras || []
    );
    this.tagSingle = 'client';
    this.tagPlure = 'clients';
  }
}

class SerializerErrors extends Serializer {
  constructor(contentType, fieldsExtras) {
    super();
    this.contentType = contentType;
    this.fieldsFiltredDTO = ['id', 'message'].concat(fieldsExtras || []);
    this.tagSingle = 'error';
    this.tagPlure = 'errors';
  }
}

module.exports = {
  Serializer: Serializer,
  SerializerMaterial: SerializerMaterial,
  SerializerClient: SerializerClient,
  SerializerErrors: SerializerErrors,
  formatsAccepted: ['application/json', 'application/xml'],
};
