/* ----- script file ------ */
const mealContainer = document.getElementById("meal-container");
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", function () {
    const searchInputTxt = document.getElementById("search-input");
    const getSearchValue = searchInputTxt.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${getSearchValue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let html = '';
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                        <div class="card-detail">
                            <img src="${meal.strMealThumb}" alt="">
                            <h3>${meal.strMeal}</h3>
                            <button onclick = "singleMealDetail('${meal.idMeal}')" class="btn btn-outline-success">detail</button>
                        </div>
                    `
                })
            }
            else {
                html = "Sorry we didn't find any meal"
            }
            mealContainer.innerHTML = html;
        })
    document.getElementById("search-input").value = ''
    document.getElementById("display-list").style.display = "block"
})

/* --- function form onclick event handler---- */
const singleMealDetail = mealList => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealList}`
    fetch(url)
        .then(response => response.json())
        .then(data => {
            singleMeal(data.meals);
        })
}

/* --- function calling --- */
const singleMeal = ingredient => {
    // console.log(ingredient)
    ingredient = ingredient[0]

    const detailInfo = document.getElementById("single-meal-detail");
    detailInfo.innerHTML = `
        <img src="${ingredient.strMealThumb}">
        <p>meal-Id: ${ingredient.idMeal}</p>
        <p>meal name: ${ingredient.strMeal}</p>
        <p>meal-catagories: ${ingredient.strCategory}</p>
        <p>meal-detail: ${ingredient.strIngredient1}</p>
        <strong>ingredient list</strong>
        <ul>
            <li>${ingredient.strIngredient1}</li>
            <li>${ingredient.strIngredient2}</li>
            <li>${ingredient.strIngredient3}</li>
            <li>${ingredient.strIngredient4}</li>
            <li>${ingredient.strIngredient5}</li>
            <li>${ingredient.strIngredient6}</li>
            <li>${ingredient.strIngredient7}</li>
            <li>${ingredient.strIngredient8}</li>
            <li>${ingredient.strIngredient9}</li>
        </ul>
    `
}
