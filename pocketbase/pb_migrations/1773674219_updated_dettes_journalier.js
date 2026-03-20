/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_536402637")

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "number995931658",
    "max": null,
    "min": null,
    "name": "djo_nyembwe",
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
  collection.fields.removeById("number995931658")

  return app.save(collection)
})
