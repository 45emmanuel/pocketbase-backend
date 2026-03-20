/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // remove field
  collection.fields.removeById("number1628546091")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number1628546091",
    "max": null,
    "min": null,
    "name": "nombre_de_piece_restantes",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
