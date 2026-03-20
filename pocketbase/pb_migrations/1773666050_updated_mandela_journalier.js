/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // remove field
  collection.fields.removeById("text2304437555")

  // remove field
  collection.fields.removeById("text1628546091")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1523469487",
    "max": null,
    "min": null,
    "name": "nombre_de_pieces_vendues",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number2304437555",
    "max": null,
    "min": null,
    "name": "nombre_de_piece_degradees",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1628546091",
    "max": null,
    "min": null,
    "name": "nombre_de_piece_restantes",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2304437555",
    "max": 0,
    "min": 0,
    "name": "nombre_de_piece_degradees",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text1628546091",
    "max": 0,
    "min": 0,
    "name": "nombre_de_piece_restantes",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("number1523469487")

  // remove field
  collection.fields.removeById("number2304437555")

  // remove field
  collection.fields.removeById("number1628546091")

  return app.save(collection)
})
