console.log(window.location.href);

function fetchRecipe() {
  var url = window.location.href;
  var id = url.substring(url.lastIndexOf("=") + 1);
  // alert(id);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      html = "";
      if (data.meals) {
        // createFavItem(data);
        console.log("hello ", data.meals);
        data.meals.forEach((meal) => {
          html += `
                <div class="image-container">
                    <img src="${meal.strMealThumb}" alt="image">
                </div>
                <div class="detail-container">
                    <div class="common"><b>Food Name : </b> ${meal.strMeal}</div>
                    <div class="common"><b>Food Category : </b> ${meal.strCategory}</div>
                    <div class="common"><b>Instructions : </b>${meal.strInstructions}</div>
                    <div class="common">
                        <b>Ingredieants Required :</b>
                        <ul>
                            <li>${meal.strIngredient1}</li>
                            <li>${meal.strIngredient2}</li>
                            <li>${meal.strIngredient3}</li>
                            <li>${meal.strIngredient4}</li>
                            <li>${meal.strIngredient5}</li>
                        </ul>
                    </div>
                    <div class="common"><b>Watch : </b> For more details please watch on <a href="${meal.strYoutube}" target= "blank">Youtube</a></div>
                </div>
            `;
        });
        let recipecontainer = document.getElementById("recipe-container");
        recipecontainer.innerHTML = html;
      }
    });
}

fetchRecipe();
