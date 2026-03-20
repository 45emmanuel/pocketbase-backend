/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2493159402")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number1435130432",
    "max": null,
    "min": null,
    "name": "zigida",
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
  collection.fields.removeById("number1435130432")

  return app.save(collection)
})
