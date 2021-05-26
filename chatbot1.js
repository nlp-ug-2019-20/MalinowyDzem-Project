var options = document.getElementById("options")
var qNumb = 0;
var question = '<h1>Hello, I am Foodbot. What is your name?</h1>';
var output = document.getElementById('output');
output.innerHTML = question;

function chatBot() {
  var input = document.getElementById('input').value;
  console.log(input);
  
  if (qNumb == 0) {
    output.innerHTML = '<h1>Awesome! Nice to meet you, ' + input + '.</h1>';
    document.getElementById('input').value = "";
    question = '<h1>Type in the name of the dish or ingredient</h1>';
    setTimeout(timedQuestion, 1000);
  }
    else if (qNumb == 1) {
        output.innerHTML = '<h1>...</h1>';
        findByIngredients(input);
        document.getElementById('input').value = "";
        setTimeout(timedQuestion, 1000);
    }
}

function timedQuestion() {
  output.innerHTML = question;
}


document.getElementById('input').addEventListener('keypress', pressKey);

function pressKey(event) {
  if (event.which == 13) {
    chatBot();
    qNumb++
  }
}

let pass ="?apiKey=51db09fa50d840a89812ab4301106df5"
// fetch(url="https://api.spoonacular.com/recipes/complexSearch?apiKey=51db09fa50d840a89812ab4301106df5")
//                 .then(response => response.json())
//                 .then(response => {
//                    console.log(response)
//                 })
function findByIngredients(ingredient){
   let url="https://api.spoonacular.com/recipes/findByIngredients"+pass+"&ingredients="+ingredient
   let buttonBox=document.getElementById("recipies")

   fetch (url)
   .then(response => response.json())
                .then(response => {
                   buttonBox.innerHTML=""
                   console.log(response)
                    for(let index=0;index<response.length;index++){
                       if (response.length>2){
                           break
                       }
                        let button=document.createElement("button")
                       let title=response[index].title
                       let id=response[index].id
                       button.append(title)
                       button.value(id)
                       button.onclick = getRecipeInstruction(e.value)
                       options.appendChild(button);
                       console.log(button)
                   }
            
                //     console.log(response)
                //   recipeId = response[0]["id"]
                //    console.log(recipeId)
                })
               
}

function getRecipeInstruction(recipeId){
   let url="https://api.spoonacular.com/recipes/"+recipeId+"/analyzedInstructions"+pass
   fetch (url)
   .then(response => response.json())
       .then(response => {
           let instructions=""
        for(let index=0;index<response.steps.length;index++){
            instructions+=response.steps[index].step
            
        }
        output=`<h1>${instructions}</h1>`
           console.log(response)
       })
}
getRecipeInstruction(recipeId)

