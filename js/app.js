function startApp() {

    //Vars
    const buttonMenu = document.querySelector('#buttonMenu'); 
    const mobileMenu = document.querySelector('.navbar__mobile');
    const closeMenuButton = document.querySelector('#closeMenuButton');
    const selectCategorias = document.querySelector('#categorias');
    const resultadoCards = document.querySelector('#resultado');

    //Listers
    buttonMenu.addEventListener('click', toggleMobileMenu);
    closeMenuButton.addEventListener('click', toggleMobileMenu);
    selectCategorias.addEventListener('change', selectCategory);

    getCategory();

    // Functions 
    function toggleMobileMenu(){
        mobileMenu.classList.toggle('inactive');
    }

    function getCategory() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
            .then(response => response.json())
            .then(result => setCategory(result.categories))
    }

    function setCategory(categories = []) {
        categories.forEach(category => {
            const { strCategory } = category;
            const option = document.createElement('option');
            option.value = strCategory;
            option.textContent = strCategory;
            selectCategorias.appendChild(option);
        })
    }

    function selectCategory(e){
        const category = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        fetch(url)
            .then(response => response.json())
            .then(result => showMeals(result.meals))
    }

    function showMeals(meals = []) {
        clearHTML(resultadoCards);
        const heading = document.createElement('h2');
        heading.classList.add('text-center', 'text-black', 'my-5');
        heading.textContent = meals.length ? 'Resultados' : 'No hay resultados';
        resultadoCards.appendChild(heading);
        //Iteration Meals
        meals.forEach(meal => {

            const { idMeal, strMeal, strMealThumb } = meal;

            const mealContainer = document.createElement('div');
            mealContainer.classList.add('col-md-4');

            const mealCard = document.createElement('div');
            mealCard.classList.add('card', 'mb-4');

            const mealImage = document.createElement('img');
            mealImage.classList.add('card-img-top');
            mealImage.alt = `Image of the meal ${strMeal}`;
            mealImage.src = strMealThumb;

            const mealCardBody = document.createElement('div');
            mealCardBody.classList.add('card-body');

            const mealHeding = document.createElement('h3');
            mealHeding.classList.add('card-title', 'mb-3');
            mealHeding.textContent = strMeal;

            const mealButton = document.createElement('button');
            mealButton.classList.add('btn', 'btn-danger', 'w-100');
            mealButton.textContent = 'Show Meal';

            //Injection in HTML
            mealCardBody.appendChild(mealHeding);
            mealCardBody.appendChild(mealButton);
            
            mealCard.appendChild(mealImage);
            mealCard.appendChild(mealCardBody);

            mealContainer.appendChild(mealCard);
            resultadoCards.appendChild(mealContainer);
        })
    }

    function clearHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }

}

document.addEventListener('DOMContentLoaded', startApp);