const options = document.getElementById("options")
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
        question = '<h1>Pick a dish that you want to make.</h1>';
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

let pass ="?apiKey=8cff268749b8427bafa3345580f5662f"
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
                  //  console.log(response)
                    for(let index=0;index<response.length;index++){
                       if (index > 2) {
                           break
                       }
                       let button=document.createElement("button");
                       let title=response[index].title
                       let id=response[index].id
                       button.append(title)
                       button.value = id;
                       button.addEventListener('click', (e) => {
                         console.log(button.value);
                         getRecipeIgredients(button.value)
                         getRecipeInstruction(button.value);
                       })
                       options.append(button);
                   }
            
                //     console.log(response)
                //   recipeId = response[0]["id"]
                //    console.log(recipeId)
                })
               
}
function getRecipeIgredients(recipeId){
  let url="https://api.spoonacular.com/recipes/"+recipeId+"/analyzedInstructions"+pass
  fetch (url)
  .then(response => response.json())
      .then(response => {
        console.log(11111,response)
        let ingredientsList=""
        let stepsLength = (response[0] && response[0].steps && response[0].steps.length) | 0
        for(let index=0;index<stepsLength;index++){
          let ingredientsLength = (response[0].steps[index].ingredients && response[0].steps[index].ingredients.length) | 0
          for(let i=0;i<ingredientsLength;i++){
            if(index === stepsLength - 1 && i === ingredientsLength - 1) {
              ingredientsList += response[0].steps[index].ingredients[i].name + '.'
            } else {
              ingredientsList += response[0].steps[index].ingredients[i].name + ', '
            }
          }
        }
        
        
        console.log(ingredientsList);
       output.innerHTML = "";
       output.append(`${ingredientsList}`);
      })
    }
    
      function getRecipeInstruction(recipeId){
        var secondOutput = document.createElement("div");
        let url="https://api.spoonacular.com/recipes/"+recipeId+"/analyzedInstructions"+pass
        fetch (url)
        .then(response => response.json())
            .then(response => {
              console.log(response)
              let instructions=""
              for(let index=0;index<response[0].steps.length;index++){
                 instructions+=response[0].steps[index].step  
              }
              console.log(instructions);
              document.getElementById("output2").appendChild(secondOutput);
              secondOutput.className = "secondOutput";
              secondOutput.innerHTML = "";
              secondOutput.append(`${instructions}`);
            })
     }
