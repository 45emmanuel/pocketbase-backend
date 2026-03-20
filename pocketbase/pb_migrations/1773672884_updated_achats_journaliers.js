/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1884769979")

  // add field
  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "number3756139910",
    "max": null,
    "min": null,
    "name": "scotch",
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
  collection.fields.removeById("number3756139910")

  return app.save(collection)
})
