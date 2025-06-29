import recipes from './recipes.mjs';

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
  const listLength = list.length;
  const randomIndex = random(listLength);
  return list[randomIndex];
}

function tagsTemplate(tags) {
  return tags
    .map((tag) => `<span class="tag">${tag}</span>`)
    .join('');
}

function ratingTemplate(rating) {
  let html = `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5 stars">`;

  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
      html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
  }

  html += `</span>`;
  return html;
}

function recipeTemplate(recipe) {
  return `
    <article class="recipe">
      <img src="${recipe.image}" alt="${recipe.name}" />
      <div class="recipe-content">
        ${tagsTemplate(recipe.tags)}
        <h2>${recipe.name}</h2>
        ${ratingTemplate(recipe.rating)}
        <p class="description">${recipe.description}</p>
      </div>
    </article>
  `;
}

function renderRecipes(recipeList) {
  const recipesElement = document.getElementById('recipes');
  const recipeHTML = recipeList.map(recipeTemplate).join('');
  recipesElement.innerHTML = recipeHTML;
}

function init() {
  const recipe = getRandomListEntry(recipes);
  renderRecipes([recipe]);
}

init();



function filterRecipes(query) {
  const lowerQuery = query.toLowerCase();

  const filtered = recipes.filter((recipe) => {
    const nameMatch = recipe.name.toLowerCase().includes(lowerQuery);
    const descriptionMatch = recipe.description.toLowerCase().includes(lowerQuery);
    const tagsMatch = recipe.tags.find((tag) =>
      tag.toLowerCase().includes(lowerQuery)
    );
    const ingredientsMatch = recipe.recipeIngredient.find((ingredient) =>
      ingredient.toLowerCase().includes(lowerQuery)
    );

    return nameMatch || descriptionMatch || tagsMatch || ingredientsMatch;
  });

  return filtered.sort((a, b) => a.name.localeCompare(b.name));
}


function searchHandler(event) {
  event.preventDefault();

  const input = document.getElementById('searchInput');
  const query = input.value.trim();

  if (query === '') {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]);
  } else {
    const results = filterRecipes(query);
    renderRecipes(results);
  }
}


const searchForm = document.querySelector('.search');
searchForm.addEventListener('submit', searchHandler);

