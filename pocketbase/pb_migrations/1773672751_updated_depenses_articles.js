/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4124840889")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number1710568209",
    "max": null,
    "min": null,
    "name": "sac_de_sel",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4124840889")

  // remove field
  collection.fields.removeById("number1710568209")

  return app.save(collection)
})
