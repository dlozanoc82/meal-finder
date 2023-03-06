function startApp() {

    //Vars
    const buttonMenu = document.querySelector('#buttonMenu'); 
    const mobileMenu = document.querySelector('.navbar__mobile');
    const closeMenuButton = document.querySelector('#closeMenuButton');
    const selectCategorias = document.querySelector('#categorias');

    //Listers
    buttonMenu.addEventListener('click', toggleMobileMenu);
    closeMenuButton.addEventListener('click', toggleMobileMenu);

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

}

document.addEventListener('DOMContentLoaded', startApp);