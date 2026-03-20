/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number1455698805",
    "max": null,
    "min": null,
    "name": "mbochi",
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
  collection.fields.removeById("number1455698805")

  return app.save(collection)
})
