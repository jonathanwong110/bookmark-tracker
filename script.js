let bookmarks = {}

function getBookmarks() {
  if (localStorage.getItem('bookmarks')) {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  } else {
    let id = `https://www.github.com/`
    bookmarks[id] = {
      name: 'GitHub',
      url: 'https://www.github.com/',
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }
}

getBookmarks()