const routerCreator = require('express').Router
const dbConnector = require('../database')


const router = routerCreator()


router.get("/getAllRecipes", (request,response) => {
    const sql = `
    SELECT code_fonctionnel, en, fr, image
    FROM "Translation"
    `
    dbConnector.query(sql, (err, result) => {
        if (err){
            response.status(500).send(err)
        }
        response.status(200).send(result.rows)
    })
})

module.exports = router