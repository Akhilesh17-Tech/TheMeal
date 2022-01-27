//fetching the favourite item ids from local storage and converting it into an array
let item = window.localStorage.getItem("meal-favourites").split(/(\s+)/);
item.filter(function (e) {
  return e.trim().length > 0;
});
//fetching all the favourite meals from ids stored in local storage
for (let id of item) {
  getMeal(id);
}

//this function fetches a meal with a specific id
function getMeal(id) {
  // var xhrRequest = new XMLHttpRequest(); //creating a new xhr request
  // xhrRequest.onload = function () {
  //   let res = JSON.parse(xhrRequest.response).meals[0]; //parsing resultant food item returned
  //   createFoodItem(res); //creating the new item's HTML
  // };
  // //creating a get api call to fetch meal with given id
  // xhrRequest.open(
  //   "get",
  //   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
  //   true
  // );
  // //sending the request
  // xhrRequest.send();

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        createFavItem(data);
      }
    });
}

function createFavItem(res) {
  for (res of res.meals) {
    // HTML code for the individual search result/food item
    var foodItem = `<div class="item-box">
                          <div class="img-box">
                              <img src="${res.strMealThumb}" alt="">
                          </div>
                          <div class="title">${res.strMeal}</div>
                          <div class="btn-box">
                              <div class="get-recipie">
                                  <a href="mealDetail.html?id=${res.idMeal}" value="${res.idMeal}">Get Recipe</a>
                              </div>
                              <div class="favorite-button" id="${res.idMeal}">
                                  Remove Favorite
                              </div>
                          </div>
                      </div>`;
    // appending the result to the root 'recipie-list' div
    let recipieList = document.getElementById("favouriteMeal");
    recipieList.innerHTML = foodItem + recipieList.innerHTML;
  }
}

//handling click event on the 'favourite-button' to unmark an item as favourite
document.body.addEventListener("click", function (event) {
  //if the targeted div is 'favourite-button'
  if (event.target.getAttribute("class") == "favorite-button") {
    //finding the id of the current food item
    let id = event.target.getAttribute("id");
    //finding it's index in the item array
    let index = item.indexOf(id);

    //removing item from the array
    item.splice(index, 1);

    //creating the updated list of favourite items in a space sperated string
    let items = "";
    for (let i of item) {
      items = items + " " + i;
    }
    //storing the updated string in local storage
    window.localStorage.setItem("meal-favourites", items);
    
    //refreshing the page
    location.reload();
  }
});


