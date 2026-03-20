/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1884769979")

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "number1452916136",
    "max": null,
    "min": null,
    "name": "gout_poudre",
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
  collection.fields.removeById("number1452916136")

  return app.save(collection)
})
