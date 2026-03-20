/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_613542802")

  // add field
  collection.fields.addAt(17, new Field({
    "hidden": false,
    "id": "number2940930974",
    "max": null,
    "min": null,
    "name": "nombre_de_piece_restantes_chocolat",
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
  collection.fields.removeById("number2940930974")

  return app.save(collection)
})
