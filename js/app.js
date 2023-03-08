function startApp() {

    //Vars
    const buttonMenu = document.querySelector('#buttonMenu'); 
    const mobileMenu = document.querySelector('.navbar__mobile');
    const closeMenuButton = document.querySelector('#closeMenuButton');
    const selectCategorias = document.querySelector('#categorias');
    const resultadoCards = document.querySelector('#resultado');
    const spinner = document.querySelector(' .sk-chase');
    const modal = new bootstrap.Modal('#modal', {});

    //Listers
    buttonMenu.addEventListener('click', toggleMobileMenu);
    closeMenuButton.addEventListener('click', toggleMobileMenu);
    selectCategorias.addEventListener('change', selectCategory);

    getCategory();

    // Functions 
    function toggleMobileMenu(){
        mobileMenu.classList.toggle('inactive');
    }

    async function getCategory () {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        await fetch(url)
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
        //resultadoCards.classList.remove('u--fadeIn');
        clearHTML(resultadoCards);
        const category = e.target.value;
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
        fetch(url)
            .then(response => response.json())
            .then(async result => {
                spinner.classList.remove('inactive');
                setTimeout(() => {
                    spinner.classList.add('inactive');
                    showMeals(result.meals);
                }, 2000);
                
            })
    }

    function showMeals(meals = []) {  
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
                mealImage.loading = 'lazy';
                mealImage.src = strMealThumb;

                const mealCardBody = document.createElement('div');
                mealCardBody.classList.add('card-body');

                const mealHeding = document.createElement('h3');
                mealHeding.classList.add('card-title', 'mb-3');
                mealHeding.textContent = strMeal;

                const mealButton = document.createElement('button');
                mealButton.classList.add('btn', 'btn-danger', 'w-100');
                mealButton.textContent = 'Show Meal';
                // mealButton.dataset.bsTarget = "#modal";
                // mealButton.dataset.bsToggle = "modal";
                mealButton.onclick = function(){
                    selectMeal(idMeal);
                }


                //Injection in HTML
                mealCardBody.appendChild(mealHeding);
                mealCardBody.appendChild(mealButton);
                
                mealCard.appendChild(mealImage);
                mealCard.appendChild(mealCardBody);

                mealContainer.appendChild(mealCard);
                mealContainer.classList.add('u--fadeIn');

                resultadoCards.appendChild(mealContainer);
        })
    }

    function selectMeal(idMeal){
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
        fetch(url)
            .then(response => response.json())
            .then(result => showMealModal(result.meals[0]))
    }

    function showMealModal(meal){
        const {idMeal, strMeal, strInstructions, strMealThumb} = meal;

        //Add global content
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');

        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src=${strMealThumb} alt="Meal ${strMeal}" />
            <h3 class="my-3">Instructions</h3>
            <p>${strInstructions}</p>
            <h3>Ingredients and Measures</h3>
        `;

        const listGroup = document.createElement('ul');
        listGroup.classList.add('list-group');
         //Cantidades e ingredientes
        for(let i=1; i<=20; i++){
            if (meal[`strIngredient${i}`]) {
                const ingrediente = meal[`strIngredient${i}`];
                const cantidad = meal[`strMeasure${i}`];

                const ingredienteLi = document.createElement('li');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `${ingrediente} - ${cantidad}`;

                listGroup.appendChild(ingredienteLi);

            }
        }

        modalBody.appendChild(listGroup);

        //Show modal
        modal.show();
    }

    function clearHTML(selector) {
        while (selector.firstChild) {
            selector.removeChild(selector.firstChild);
        }
    }

}

document.addEventListener('DOMContentLoaded', startApp);