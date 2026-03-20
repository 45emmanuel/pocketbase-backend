/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1884769979")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number4231239338",
    "max": null,
    "min": null,
    "name": "sac_sucre",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2242750402",
    "max": null,
    "min": null,
    "name": "sac_lait",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1884769979")

  // remove field
  collection.fields.removeById("number4231239338")

  // remove field
  collection.fields.removeById("number2242750402")

  return app.save(collection)
})
