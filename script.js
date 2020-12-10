const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameInput = document.getElementById('website-name');
const websiteUrlInput = document.getElementById('website-url');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = {}

function validate(nameValue, urlValue) {
	const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
	const regex = new RegExp(expression);
	if (!nameValue || !urlValue) {
		alert('Please submit values for both fields');
		return false;
	}
	if (!urlValue.match(regex)) {
		alert('Please provide a valid web address');
		return false;
	}
	// Valid
	return true;
}

function displayBookmarks() {
  // Remove all bookmark elements
  bookmarksContainer.textContent = '';
  // Build items
  Object.keys(bookmarks).forEach((id) => {

    const { name, url } = bookmarks[id];

    // Item
    const item = document.createElement('div');
    item.classList.add('item');
    // Close Icon
    const closeIcon = document.createElement('i');
    closeIcon.classList.add('fas', 'fa-times');
    // Favicon / Link Container
    const linkInfo = document.createElement('div');
    linkInfo.classList.add('name');
    // Favicon
    const favicon = document.createElement('img');
    favicon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
    favicon.setAttribute('alt', 'Favicon');
    // Link
    const link = document.createElement('a');
    link.setAttribute('href', `${url}`);
    link.setAttribute('target', '_blank');
    link.textContent = name;
    // Append to bookmarks container
    linkInfo.append(favicon, link);
    item.append(closeIcon, linkInfo);
    bookmarksContainer.appendChild(item);
  });
}

function getBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    let id = `https://stackoverflow.com/`
    bookmarks[id] = {
      name: 'Stackoverflow',
      url: 'https://stackoverflow.com/'
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
  displayBookmarks()
}

function addBookmark(e) {
  e.preventDefault()
  const nameValue = websiteNameInput.value;
  let urlValue = websiteUrlInput.value;
  if (!urlValue.includes('http://', 'https://')) {
    urlValue = `https://${urlValue}`;
  }
  	// Validation
	if (!validate(nameValue, urlValue)) {
		return false;
	}
  // Set bookmark object, add to array
  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks[urlValue] = bookmark;
  // Set bookmarks in localStorage, fetch, reset input fields
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  getBookmarks();
  bookmarkForm.reset();
  websiteNameInput.focus();
}

// Event Listener for Submitting

bookmarkForm.addEventListener('submit', addBookmark);

getBookmarks()