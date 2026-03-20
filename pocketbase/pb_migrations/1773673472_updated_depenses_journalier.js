/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1917457606")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "number1713647251",
    "max": null,
    "min": null,
    "name": "reparation_pneu",
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
  collection.fields.removeById("number1713647251")

  return app.save(collection)
})
