// Get Element by it's ID it is a Search button 
const serachBtn = document.getElementById("getResult");

// it is a Div element for appending search results 
const mealList = document.getElementById("mealList");

serachBtn.addEventListener("click", getmealList);

function getmealList() {
  let searchInput = document.getElementById("searchInput").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`)
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="item-box" data-id = ${meal.idMeal}>
                <div class="img-box">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="title">${meal.strMeal}</div>
                <div class="btn-box">
                   <button type="submit" onclick="functionToExecute(${meal.idMeal})"><i class="far fa-heart"></i> Favourite</button>
                    <button type="submit"><a href="mealDetail.html?id=${meal.idMeal}" value="${meal.idMeal}">Get Recipe</a></button>
                </div>
            </div>`;
        });
      } else {
        html = "Sorry, we didn't find any meal!";
      }
      mealList.innerHTML = html;
    });
}

function fetchDefault() {
  fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
    .then((Response) => Response.json())
    .then((data) => {
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `<div class="item-box" data-id = ${meal.idMeal}>
                <div class="img-box">
                    <img src="${meal.strMealThumb}" alt="">
                </div>
                <div class="title">${meal.strMeal}</div>
                <div class="btn-box">
                    <button type="submit" onclick="functionToExecute(${meal.idMeal})"><i class="far fa-heart"></i> Favourite</button>
                    <button type="submit"><a href="mealDetail.html?id=${meal.idMeal}" value="${meal.idMeal}">Get Recipe</a></button>
                </div>
            </div>`;
        });
        mealList.innerHTML = html;
      }
    });
}

fetchDefault();

//if browser dosen't have 'meal-favourites' in local storage we create one
let fav = window.localStorage.getItem("meal-favourites");
if (!fav) {
  window.localStorage.setItem("meal-favourites", "");
}
function functionToExecute(id) {
  // localStorage.setItem(
  //   "fav-Meal",
  //   JSON.stringify([
  //     ...JSON.parse(localStorage.getItem("fav-Meal") || "[]"),
  //     id,
  //   ])
  // );
  // location.href = "favouriteMeal.html";
  let items = window.localStorage.getItem("meal-favourites");

  //if id already present in local storage we do not add and return
  if (items.includes(id)) {
    window.alert("Already added to favourites!");
    return;
  }
  //appending the new id to the string
  items = items + " " + id;
  //updating the local storage
  window.localStorage.setItem("meal-favourites", items);
  window.alert("Item added to favourites");
}
