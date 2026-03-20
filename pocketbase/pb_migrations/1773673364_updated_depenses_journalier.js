/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1917457606")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number2007330954",
    "max": null,
    "min": null,
    "name": "sac_pour_argent",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1917457606")

  // remove field
  collection.fields.removeById("number2007330954")

  return app.save(collection)
})
