/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1917457606")

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "number3296938234",
    "max": null,
    "min": null,
    "name": "droit_de_passage",
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
  collection.fields.removeById("number3296938234")

  return app.save(collection)
})
