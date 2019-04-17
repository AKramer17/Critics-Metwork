const tagCategories = [
  'pink',
  'red',
  'orange',
  'green',
  'cyan',
  'blue',
  'purple',
  'black',
  'yellow',
  'brown',
  'coral',
  'turquoise',
  'gold'
]
const genresFilter = [{
  text: 'Action',
  value: 'Action'
}]

const dictGenres = [
  {
    'id': 28,
    'name': 'Action'
  },
  {
    'id': 12,
    'name': 'Adventure'
  },
  {
    'id': 16,
    'name': 'Animation'
  },
  {
    'id': 35,
    'name': 'Comedy'
  },
  {
    'id': 80,
    'name': 'Crime'
  },
  {
    'id': 99,
    'name': 'Documentary'
  },
  {
    'id': 18,
    'name': 'Drama'
  },
  {
    'id': 10751,
    'name': 'Family'
  },
  {
    'id': 14,
    'name': 'Fantasy'
  },
  {
    'id': 36,
    'name': 'History'
  },
  {
    'id': 27,
    'name': 'Horror'
  },
  {
    'id': 10402,
    'name': 'Music'
  },
  {
    'id': 9648,
    'name': 'Mystery'
  },
  {
    'id': 10749,
    'name': 'Romance'
  },
  {
    'id': 878,
    'name': 'Science Fiction'
  },
  {
    'id': 10770,
    'name': 'TV Movie'
  },
  {
    'id': 53,
    'name': 'Thriller'
  },
  {
    'id': 10752,
    'name': 'War'
  },
  {
    'id': 37,
    'name': 'Western'
  }
]

export default {
  randomColor: () => tagCategories[Math.floor(Math.random() * (tagCategories.length + 1))],
  getGenres: (id) => dictGenres.reduce((acc, genre) => (id === genre.id) ? (acc += genre.name) : acc, ''),
  getFilter: () => genresFilter
}
