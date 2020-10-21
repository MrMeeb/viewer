function defaultheader(body) {

    const token = localStorage.getItem('token')

    if (body != null) {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        }
    
        return options
    
    }
    else {

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }
    
        return options
    
    }
}

search = async(purpose) => {

    let target = $(event.target)

    var searchterm = target[0].firstChild.nextElementSibling.childNodes[3].value

    let body = {searchterm: searchterm}

    console.log(searchterm)

    if (purpose === 'search-watch') {

        console.log('Searching watch-list')

        const request = await fetch('/api/movie/search', defaultheader(body))
        const response = await request.json();

        console.log(response)

    }

    if (purpose === 'search-watched') {

        console.log('Searching watched-list')

        const request = await fetch('/api/movie/search', defaultheader(body))
        const response = await request.json();

        console.log(response)

    }

    if (purpose === 'add-watch') {

        console.log('Searching to add to watch-list')
        
        const request = await fetch('/api/movie/search', defaultheader(body))
        const response = await request.json();

        console.log(response)

    }

    if (purpose === 'add-watch') {

        console.log('Searching to add to watched-list')
        
        const request = await fetch('/api/movie/search', defaultheader(body))
        const response = await request.json();

        console.log(response)

    }

}

gettrending = async() => {

    const token = localStorage.getItem('token')

    //Check to see if token is available yet
    if (token === null){

        console.log('Waiting for token')

        setTimeout(() => {
            gettrending()
            return
        }, 100);

    }
    else {

        const request = await fetch('/api/trending', defaultheader())
        const response = await request.json();

        //console.log(response)

        displayresults(response, 'Trending this week', 'watch-search')

    }


}

getwatchlist = async() => {

    const token = localStorage.getItem('token')

    //Check to see if token is available yet
    if (token === null){

        console.log('Waiting for token')

        setTimeout(() => {
            getwatchlist()
            return
        }, 100);

    }
    else {

        const request = await fetch('/api/watchlist/get', defaultheader())
        const response = await request.json();

        console.log(response)



        //displayresults(response.results, 'Watch List', 'watch')

        if (response.status === 'success') {

            document.getElementById('watch-results-container').innerHTML = ''
            displayresults(response.lookup, 'Watch List', 'watch') 

        }

    }

}

displayresults = async (args, category, parent) => {

    let parentcontainer = document.getElementById(`${parent}-results-container`)

    let parentcategory = document.getElementById(`${parent}-results-category`)

    let categorytext = document.createElement('h3')
    categorytext.textContent = category

    parentcategory.appendChild(categorytext)

    args.forEach (a)

    function a(value) {

        let releaseDatesplit = value.release_date.split('-')[0]

        let TMDB = 'https://themoviedb.org/movie/'

        let TMDBImages = 'https://image.tmdb.org/t/p/w500'

        //console.log(value)

        let containerBackground = document.createElement("div")
        containerBackground.classList.add('results-background', 'drop-shadow-light', 'm-1')
        containerBackground.style.backgroundImage = `url(${TMDBImages}${value.backdrop_path})`
       
        let container = document.createElement("div")
        container.classList.add('d-flex', 'flex-column', 'align-items-center', 'result-container')

        let poster = document.createElement("img")
        poster.classList.add('poster', 'align-self-center', 'm-2', 'drop-shadow-light')
        poster.src = TMDBImages + value.poster_path
        poster.onerror = function(){this.src='images/poster-placeholder.jpg'}

        let title = document.createElement("h3")
        title.classList.add('pt-2', 'pb-1', 'title', 'text-center', 'text-truncate')
        title.textContent = value.title

        let subtitle = document.createElement("div")
        subtitle.classList.add('d-flex', 'flex-wrap')

        let releaseDate = document.createElement("div")
        releaseDate.classList.add('px-2')
        releaseDate.textContent = releaseDatesplit

        let rating = document.createElement("div")
        rating.classList.add('px-3', 'pink')
        rating.textContent = `${value.vote_average}/10`

        let action = document.createElement("div")

        let add = document.createElement("button")
        add.classList.add('btn', 'btn-primary', 'btn-primary-small')
        add.innerHTML = '<i class="fas fa-plus"></i>'
        add.onclick = function () {addwatch(value.id, value.title, value.release_date, value.poster_path, value.backdrop_path)}

        parentcontainer.appendChild(containerBackground)
        containerBackground.appendChild(container)
        container.appendChild(title)
        container.appendChild(subtitle)
        subtitle.appendChild(releaseDate)
        subtitle.appendChild(rating)
        container.appendChild(poster)
        container.appendChild(action)
        action.appendChild(add)

    }

}

addwatch = async(tmdbid, title, release_date, poster, backdrop) => {

    let body = {tmdbid: tmdbid, title: title, release_date: release_date, poster: poster, backdrop: backdrop}

    console.log(body)

    const request = await fetch('/api/watchlist/add', defaultheader(body))
    const response = await request.json()

    console.log(response)

    getwatchlist()

}