/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "number830138774",
    "max": null,
    "min": null,
    "name": "john",
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
  collection.fields.removeById("number830138774")

  return app.save(collection)
})
