const mealStore = document.getElementById('meal-store');

const mealInput = async () => {
    const inputText = document.getElementById("input-text");

    if (inputText.value != "") {
        document.getElementById('meal-store').innerHTML = "";
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText.value}`);
        const data = await response.json();

        if (data.meals != null) {
            displayMeals(data.meals);
            mealDetails();
        }
        else {
            errorNotify();
        }
    }
    inputText.value = "";
};

const displayMeals = meals => {
    meals.forEach(meal => {
        const mealItem = `
            <img src="${meal.strMealThumb}/preview" />
            <p>${meal.strMeal}</p>
        `;
        const div = document.createElement('div')
        div.className = "meal-card";
        div.innerHTML = mealItem;
        mealStore.appendChild(div);
    });
};

const mealDetails = () => {
    const allMeals = document.getElementsByClassName('meal-card');
    for (let i = 0; i < allMeals.length; i++) {
        const mealItem = allMeals[i];
        mealItem.addEventListener('click', async ()=> {
          const mealName = mealItem.children[1].innerText;
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`);
          const data = await response.json();
          const meal = data.meals[0];
    
          document.getElementById('meal-details').innerText = meal.strMeal;
          document.getElementById('thumbnail-details').src = meal.strMealThumb+"/preview";
          const ul = document.getElementById('ingredient-details');
          ul.innerHTML = "";
    
          for (let i = 1; i <= 20 ; i++) {
            const ingredient = meal['strIngredient' + i];
            const measure = meal['strMeasure' + i];
    
            if (ingredient !== '') {
              let items = document.createElement('p'); 
              items.innerHTML = `<i class="fas fa-check-square"></i> ${measure} ${ingredient}`
              ul.appendChild(items);
            }
          }
    
          document.getElementById('meal-ingredient').style.display = 'block';
        })
      }
};

const errorNotify = () => {
    const h4 = document.createElement('h4');
    h4.innerText = "Sorry, no item for this search !";
    mealStore.appendChild(h4);
  };

const closeDetails = ()=> {
    document.getElementById('meal-ingredient').style.display = 'none';
  };