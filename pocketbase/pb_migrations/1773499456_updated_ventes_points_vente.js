/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493159402")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "number110690733",
    "max": null,
    "min": null,
    "name": "Ndjili",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493159402")

  // remove field
  collection.fields.removeById("number110690733")

  return app.save(collection)
})
