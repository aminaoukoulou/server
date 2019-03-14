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

router.get("/user", (request, response) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    var user = 'where username = ' + "'" + request.query.username + "'";
    var password = ' and password = ' + "'" + request.query.password + "'";
    var sql = `
    SELECT *
    FROM "user"
    `
    var sqlReq = sql + user + password;
    dbConnector.query(sqlReq, (err, result) => {
      if (err) {
        response.status(500).send(err)
      }
      response.status(200).send(result.rows)
    });
})

router.get("/users", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  var sql = `
    SELECT *
    FROM "user"
    `
  dbConnector.query(sqlReq, (err, result) => {
    if (err) {
      response.status(500).send(err)
    }
    response.status(200).send(result.rows)
  });
})

router.get("/getAllCategories", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  var sql = `
    SELECT *
    FROM "categories"
    `
  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err)
    }
    response.status(200).send(result.rows)
  });
})

router.get("/getCategoryByType", (request, response) => {
  var sql = `
    SELECT *
    FROM "categories"
    where type_categorie = ` + "'" + request.query.type + "'";

  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

router.get("/getIngredientsByType", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  var sql = `
    SELECT *
    FROM "ingredients"
    where type_categorie = ` + "'" + request.query.type+ "'";

  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

router.get("/getAllRecettes", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  var sql = `
    SELECT *
    FROM "recettes"
    `;
  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

router.get("/getRecetteByName", (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  var sql = `
    SELECT *
    FROM "recettes"
    where name_recette=` + "'" + request.query.name + "'";
  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

router.get("/getAllIngredientsRecetteByName", (request, response) => {
  var sql =
    `
    SELECT *
    FROM "recettes_ingredients"
    where name_recette=` +
    "'" +
    request.query.name +
    "'";
  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

router.get("/getRecettesByIngredients", (request, response) => {
 
  var ingredients = request.query.ingredients; 
  console.log(ingredients);
  var sql =
    `
    SELECT name_recette
    FROM "recettes_ingredients"
    where name_ingredient in ('` +
    ingredients.join("','") +
    "')" + " and (" +"priorite = 3 or priorite = 2" +")";
   console.log(sql);     
  dbConnector.query(sql, (err, result) => {
    if (err) {
      response.status(500).send(err);
    }
    response.status(200).send(result.rows);
  });
});

module.exports = router