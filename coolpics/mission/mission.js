const themeSelector = document.querySelector('#theme-select');

function changeTheme() {
  const body = document.querySelector('body');
  const logo = document.querySelector('footer img');

  if (themeSelector.value === 'dark') {
    body.classList.add('dark');
    logo.src = 'byui-logo_dark.png';
  } else {
    body.classList.remove('dark');
    logo.src = 'byui_logo.webp';
  }
}

themeSelector.addEventListener('change', changeTheme);
