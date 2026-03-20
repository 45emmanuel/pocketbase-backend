/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "number1092386408",
    "max": null,
    "min": null,
    "name": "louison",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // remove field
  collection.fields.removeById("number1092386408")

  return app.save(collection)
})
