/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1917457606")

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "number2540580607",
    "max": null,
    "min": null,
    "name": "bande_de_frein_moto",
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
  collection.fields.removeById("number2540580607")

  return app.save(collection)
})
