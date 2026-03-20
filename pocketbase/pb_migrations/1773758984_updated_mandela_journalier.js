/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // add field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "number191230926",
    "max": null,
    "min": null,
    "name": "nombre_de_piece_restantes_vanille",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // remove field
  collection.fields.removeById("number191230926")

  return app.save(collection)
})
