const books = [
    {
        ISBN : "gita",
        title : "Kanha",
        pubDate : "2023-08",
        language : "sanskrit",
        numpage : 600,
        authors : [1,2],
        publications : [1,2],
        category : ["dharma","parmatma"]
    }
]

const authors = [
    {
        id : 1,
        name : "Madhav",
        books : ["gita","mahabharat"]
    },
    {
        id : 2,
        name : "Mahadev",
        books : ["mahabharat"]
    }
]

const publications = [
    {
        id : 1,
        pubName : "vaikunth",
        books : ["gita"]
    },
    {
        id: 2,
        pubName: "dwarka",
        books: [ ]
    }
]

module.exports = {books, authors, publications};