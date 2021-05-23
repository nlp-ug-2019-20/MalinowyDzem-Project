let pass ="?apiKey=51db09fa50d840a89812ab4301106df5"
// fetch(url="https://api.spoonacular.com/recipes/complexSearch?apiKey=51db09fa50d840a89812ab4301106df5")
//                 .then(response => response.json())
//                 .then(response => {
//                    console.log(response)
//                 })
function findByIngredients(ingredient){
   let url="https://api.spoonacular.com/recipes/findByIngredients"+pass+"&ingredients="+ingredient
   fetch (url)
   .then(response => response.json())
                .then(response => {
                   console.log(response)
                  recipeId = response[0]["id"]
                   console.log(recipeId)
                })
               
}
findByIngredients("potato")
recipeId = 1091312

function getRecipeInstruction(recipeId){
   let url="https://api.spoonacular.com/recipes/"+recipeId+"/analyzedInstructions"+pass
   fetch (url)
   .then(response => response.json())
       .then(response => {
           console.log(response)
       })
}
getRecipeInstruction(recipeId)
