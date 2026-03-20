/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "number4280487851",
    "max": null,
    "min": null,
    "name": "wesley",
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
  collection.fields.removeById("number4280487851")

  return app.save(collection)
})
