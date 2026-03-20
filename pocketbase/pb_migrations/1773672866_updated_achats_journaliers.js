/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1884769979")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number3822703281",
    "max": null,
    "min": null,
    "name": "savon",
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
  collection.fields.removeById("number3822703281")

  return app.save(collection)
})
