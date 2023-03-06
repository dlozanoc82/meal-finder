function startApp() {
    
    getCategory();

    function getCategory() {
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';
        fetch(url)
    }

}

document.addEventListener('DOMContentLoaded', startApp);

const buttonMenu = document.querySelector('#buttonMenu'); 
const mobileMenu = document.querySelector('.navbar__mobile');
const closeMenuButton = document.querySelector('#closeMenuButton');

buttonMenu.addEventListener('click', toggleMobileMenu);
closeMenuButton.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu(){
    mobileMenu.classList.toggle('inactive');
}