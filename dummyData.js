const authors = [
  { id: 1, name: 'J. K. Rowling' },
  { id: 2, name: 'J. R. R. Tolkien' },
  { id: 3, name: 'Brent Weeks' },
]

const books = [
  { id: 1, authorId: 1, name: 'Harry Potter and the Chamber of Secrets' },
  { id: 2, authorId: 1, name: 'Harry Potter and the Prisoner of Azkaban' },
  { id: 3, authorId: 1, name: 'Harry Potter and the Goblet of Fire' },
  { id: 4, authorId: 2, name: 'The Fellowship of the Ring' },
  { id: 5, authorId: 2, name: 'The Two Towers' },
  { id: 6, authorId: 2, name: 'The Return of the King' },
  { id: 7, authorId: 3, name: 'The Way of Shadows' },
  { id: 8, authorId: 3, name: 'Beyond the Shadows' },
]
module.exports = { authors, books }
