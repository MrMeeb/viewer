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

search = async(purpose, focus) => {

    let target = $(event.target)

    var searchterm = target[0].firstChild.nextElementSibling.childNodes[3].value

    let body = {searchterm: searchterm, focus: focus}

    console.log(searchterm)

    if (purpose === 'search-watch') {

        let feedback = document.getElementById('watch-search-feedback')
        let clearSearchParent = document.getElementById('watch-clear-search')
        feedback.textContent = ''
        toggleSlide(feedback)

        if (searchterm.length != 0) {

            document.getElementById('watch-clear-search').innerHTML = '';

            console.log('Searching watch-list')

            const request = await fetch('/api/watchlist/get', defaultheader(body))
            const response = await request.json();

            clearSearchParent.classList.add('text-right')
            clearSearchParent.style.marginBottom = '-24px'

            let clearSearch = document.createElement("a")
            clearSearch.classList.add('text-decoration-none', 'font-italic')
            clearSearch.style.cursor = 'pointer'
            clearSearch.textContent = 'Clear Search'
            clearSearch.onclick = function(){
                getwatchlist(); 
                document.getElementById('watch-clear-search').innerHTML = '';
                document.getElementById('watch-search-input').value = ''
            }

            clearSearchParent.appendChild(clearSearch)
    
            console.log(response)

            if (response.status === 'success') {

                displayresults(response.array, 'Watch List', 'watch') 
    
            }
            if (response.status === 'empty') {

                let parent = document.getElementById('watch-results-container')
                parent.innerHTML = ''
                parent.textContent = 'No results found'

            }

        } else {

            console.log('is empty')

            formFeedback('watch-search-feedback', 'Please enter a search term', 'invalid-feedback')

        }

    }

    if (purpose === 'search-watched') {

        let feedback = document.getElementById('watched-search-feedback')
        let clearSearchParent = document.getElementById('watched-clear-search')
        feedback.textContent = ''
        toggleSlide(feedback)

        if (searchterm.length != 0) {

            document.getElementById('watched-clear-search').innerHTML = '';

            console.log('Searching watched-list')

            const request = await fetch('/api/watchedlist/get', defaultheader(body))
            const response = await request.json();

            clearSearchParent.classList.add('text-right')
            clearSearchParent.style.marginBottom = '-24px'

            let clearSearch = document.createElement("a")
            clearSearch.classList.add('text-decoration-none', 'font-italic')
            clearSearch.style.cursor = 'pointer'
            clearSearch.textContent = 'Clear Search'
            clearSearch.onclick = function(){
                getwatchedlist(); 
                document.getElementById('watched-clear-search').innerHTML = '';
                document.getElementById('watched-search-input').value = ''
            }

            clearSearchParent.appendChild(clearSearch)
    
            console.log(response)

            if (response.status === 'success') {

                displayresults(response.array, 'Watched List', 'watched') 
    
            }
            if (response.status === 'empty') {

                let parent = document.getElementById('watched-results-container')
                parent.innerHTML = ''
                parent.textContent = 'No results found'

            }

        } else {

            console.log('is empty')

            formFeedback('watched-search-feedback', 'Please enter a search term', 'invalid-feedback')

        }

    }

    if (purpose === 'add-watch') {

        let feedback = document.getElementById('watch-add-search-feedback')
        let clearSearchParent = document.getElementById('watch-add-clear-search')
        feedback.textContent = ''
        toggleSlide(feedback)

        if (searchterm.length != 0) {

            document.getElementById('watch-add-clear-search').innerHTML = '';

            console.log('Searching to add to watch-list')

            const request = await fetch('/api/movie/search', defaultheader(body))
            const response = await request.json();

            clearSearchParent.classList.add('text-right')
            clearSearchParent.style.marginBottom = '-24px'

            let clearSearch = document.createElement("a")
            clearSearch.classList.add('text-decoration-none', 'font-italic')
            clearSearch.style.cursor = 'pointer'
            clearSearch.textContent = 'Clear Search'
            clearSearch.onclick = function(){
                gettrending(); 
                document.getElementById('watch-add-clear-search').innerHTML = '';
                document.getElementById('watch-add-search-input').value = ''
            }

            clearSearchParent.appendChild(clearSearch)
    
            console.log(response)

            if (response.status === 'success') {

                displayresults(response.array, 'Search Results', 'watch-search') 
    
            }
            if (response.status === 'empty') {

                let parent = document.getElementById('watch-add-results-container')
                parent.innerHTML = ''
                parent.textContent = 'No results found'

            }

        } else {

            console.log('is empty')

            formFeedback('watch-add-search-feedback', 'Please enter a search term', 'invalid-feedback')

        }

    }

    if (purpose === 'add-watched') {


        //RE DO FOR WATCHED

        let feedback = document.getElementById('watched-add-search-feedback')
        let clearSearchParent = document.getElementById('watched-add-clear-search')
        feedback.textContent = ''
        toggleSlide(feedback)

        if (searchterm.length != 0) {

            console.log('Searching to add to watched-list')

            const request = await fetch('/api/movie/search', defaultheader(body))
            const response = await request.json();

            document.getElementById('watched-add-clear-search').innerHTML = '';

            clearSearchParent.classList.add('text-right')
            clearSearchParent.style.marginBottom = '-24px'

            let clearSearch = document.createElement("a")
            clearSearch.classList.add('text-decoration-none', 'font-italic')
            clearSearch.style.cursor = 'pointer'
            clearSearch.textContent = 'Clear Search'
            clearSearch.onclick = function(){
                document.getElementById('watched-add-clear-search').innerHTML = '';
                document.getElementById('watched-add-search-input').value = ''
                document.getElementById('watched-search-results-category').innerHTML = '';
                document.getElementById('watched-search-results-container').innerHTML = '';
            }

            clearSearchParent.appendChild(clearSearch)
    
            console.log(response)

            if (response.status === 'success') {

                displayresults(response.array, 'Search Results', 'watched-search') 
    
            }
            if (response.status === 'empty') {

                let parent = document.getElementById('watched-add-results-container')
                parent.innerHTML = ''
                parent.textContent = 'No results found'

            }

        } else {

            console.log('is empty')

            formFeedback('watched-add-search-feedback', 'Please enter a search term', 'invalid-feedback')

        }

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

        console.log(response)

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

        //displayresults(response.results, 'Watch List', 'watch')

        if (response.status === 'success') {

            document.getElementById(`watch-results-container`).innerHTML = ''

            console.log(response)

            displayresults(response.array, 'Watch List', 'watch') 

        } 
        if (response.status === 'empty') {

            let parent = document.getElementById('watch-results-container')

            parent.innerHTML = ''

            let container = document.createElement('div')
            container.classList.add('text-center', 'subtext', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center')
            container.textContent = `Looks like you haven't added any movies to your watch list.`

            let button = document.createElement('button')
            button.classList.add('btn', 'btn-primary', 'mt-3')
            button.textContent = 'Add movie'
            button.onclick = function(){$('#add-movie-watch-modal').modal('show')}

            parent.appendChild(container)
            container.appendChild(button)

        }

    }

}

getwatchedlist = async() => {

    const token = localStorage.getItem('token')

    //Check to see if token is available yet
    if (token === null){

        console.log('Waiting for token')

        setTimeout(() => {
            getwatchedlist()
            return
        }, 100);

    }
    else {

        const request = await fetch('/api/watchedlist/get', defaultheader())
        const response = await request.json();

        //displayresults(response.results, 'Watch List', 'watch')

        if (response.status === 'success') {

            document.getElementById(`watched-results-container`).innerHTML = ''

            console.log(response)

            displayresults(response.array, 'Watched List', 'watched') 

        }
        if (response.status === 'empty') {

            let parent = document.getElementById('watched-results-container')

            parent.innerHTML = ''

            let container = document.createElement('div')
            container.classList.add('text-center', 'subtext', 'd-flex', 'flex-column', 'align-items-center', 'justify-content-center')
            container.textContent = `Looks like you haven't added any movies to your watched list.`

            let button = document.createElement('button')
            button.classList.add('btn', 'btn-primary', 'mt-3')
            button.textContent = 'Add movie'
            button.onclick = function(){$('#add-movie-watched-modal').modal('show')}

            parent.appendChild(container)
            container.appendChild(button)

        }

    }

}

displayresults = async (args, category, parent, extras) => {

    let parentcontainer = document.getElementById(`${parent}-results-container`)

    parentcontainer.innerHTML = ''

    let parentcategory = document.getElementById(`${parent}-results-category`)

    parentcategory.innerHTML = ''

    let categorytext = document.createElement('h3')
    categorytext.textContent = category

    parentcategory.appendChild(categorytext)

    args.forEach(a)

    function a(value) {
       
        let releaseDatesplit = value.release_date.split('-')[0]

        let TMDB = 'https://themoviedb.org/movie/'

        let TMDBImages = 'https://image.tmdb.org/t/p/w500'

        //console.log(value)

        let containerBackground = document.createElement("div")
        containerBackground.classList.add('results-background', 'drop-shadow-light', 'm-1')
        containerBackground.id = value.tmdb_id
        containerBackground.style.backgroundImage = `url(${TMDBImages}${value.backdrop_path})`
       
        let container = document.createElement("div")
        container.classList.add('d-flex', 'flex-column', 'align-items-center', 'result-container')

        let poster = document.createElement("img")
        poster.classList.add('poster', 'align-self-center', 'mt-2', 'drop-shadow-light')
        poster.src = TMDBImages + value.poster_path
        poster.onerror = function(){this.src='images/poster-placeholder.jpg'}

        let title = document.createElement("h3")
        title.classList.add('pt-2', 'pb-1', 'title', 'text-center', 'text-truncate')
        title.textContent = value.title

        let subtitle = document.createElement("div")
        subtitle.classList.add('d-flex', 'flex-wrap', 'justify-content-center')
        subtitle.id = `${value.tmdb_id}-subtitle`

        let releaseDate = document.createElement("div")
        releaseDate.classList.add('mx-1', 'text-center', 'badge', 'badge-pink')
        releaseDate.textContent = releaseDatesplit

        let rating = document.createElement("div")
        rating.classList.add('mx-1', 'text-center', 'badge', 'badge-pink')
        rating.textContent = `${value.vote_average}/10`

        let action = document.createElement("div")
        action.classList.add('d-flex')
        action.id = `${value.tmdb_id}-action`

        let add = document.createElement("button")
        add.classList.add('btn', 'btn-primary', 'btn-primary-action', 'mb-2', 'order-0')
        add.innerHTML = '<i class="fas fa-plus"></i>'

        let info = document.createElement("a")
        info.classList.add('btn', 'btn-primary', 'btn-primary-action', 'mb-2', 'order-1')
        info.href = TMDB + value.tmdb_id
        info.target = "_blank"
        info.style.padding = '0.275rem'
        info.innerHTML = '<i class="fas fa-info"></i>'

        let remove = document.createElement("button")
        remove.classList.add('btn', 'btn-primary', 'btn-primary-action', 'mb-2', 'order-2')
        remove.innerHTML = '<i class="fas fa-minus"></i>'
        remove.id = `${value.tmdb_id}-remove`

        parentcontainer.appendChild(containerBackground)
        containerBackground.appendChild(container)
        container.appendChild(title)
        container.appendChild(subtitle)
        subtitle.appendChild(releaseDate)
        subtitle.appendChild(rating)
        container.appendChild(poster)
        container.appendChild(action)
        action.appendChild(info)

        if (value.focus === 'watch') {
            if(value.watch == false){

                add.id = `${value.tmdb_id}-add`
                add.onclick = function () {addwatch(value.tmdb_id, value.title, value.release_date, value.poster_path, value.backdrop_path, value.vote_average);}
                action.appendChild(add)
                $(`#${value.tmdb_id}-add`).tooltip({title: "Add to watch list"});
    
            }
            else if (value.watch === 'added') {
    
                add.innerHTML = '<i class="fas fa-eye"></i>'
                add.id = `${value.tmdb_id}-add-watched`
                add.onclick = function () {removewatch(value.tmdb_id); addwatched(value.tmdb_id, value.title, value.release_date, value.poster_path, value.backdrop_path, value.vote_average);}
                remove.onclick = function() {removewatch(value.tmdb_id);}
                action.appendChild(add)
                action.appendChild(remove)
                $(`#${value.tmdb_id}-add-watched`).tooltip({title: "Mark as watched"});
                $(`#${value.tmdb_id}-remove`).tooltip({title: "Remove from list"});
    
            }
            else if (value.watch) {
    
                let add = document.createElement("button")
                add.classList.add('btn', 'btn-primary', 'btn-primary-action', 'mb-2', 'disabled')
                add.innerHTML = '<i class="fas fa-check"></i>'
                action.appendChild(add)
    
            }
        }
        if (value.focus === 'watched') {
            if(value.watched == false){

                add.innerHTML = '<i class="fas fa-eye"></i>'
                add.id = `${value.tmdb_id}-add`
                add.onclick = function () {addwatched(value.tmdb_id, value.title, value.release_date, value.poster_path, value.backdrop_path, value.vote_average);}
                action.appendChild(add)
                $(`#${value.tmdb_id}-add`).tooltip({title: "Mark as watched"});
    
            }
            else if (value.watched === 'added') {

                remove.onclick = function() {removewatched(value.tmdb_id)}
                action.appendChild(remove)
                $(`#${value.tmdb_id}-remove`).tooltip({title: "Remove from list"});

            }
            else if (value.watched) {
    
                let add = document.createElement("button")
                add.classList.add('btn', 'btn-primary', 'btn-primary-action', 'mb-2', 'disabled')
                add.innerHTML = '<i class="fas fa-check"></i>'
                action.appendChild(add)
    
            }
        }
        if (value.date_added_watch !== undefined) {

            const date = new Date(value.date_added_watch)
            let dateAdded = document.createElement("div")
            dateAdded.classList.add('mx-1', 'text-center', 'badge', 'badge-blue')
            dateAdded.textContent = 'Added: '
    
            let dateAddedValue = document.createElement("span")
            dateAddedValue.textContent = date.toDateString()

            subtitle.appendChild(dateAdded)
            dateAdded.appendChild(dateAddedValue)
    

        }
        if (value.date_added_watched !== undefined) {

            const date = new Date(value.date_added_watched)
            let dateAdded = document.createElement("div")
            dateAdded.classList.add('mx-1', 'text-center', 'badge', 'badge-success')
            dateAdded.textContent = 'Watched: '
    
            let dateAddedValue = document.createElement("span")
            dateAddedValue.textContent = date.toDateString()

            subtitle.appendChild(dateAdded)
            dateAdded.appendChild(dateAddedValue)
    

        }

    }

}

addwatch = async(tmdb_id, title, release_date, poster, backdrop, rating) => {

    console.log(title)
    console.log(tmdb_id)

    let subtitle = document.getElementById(`${tmdb_id}-subtitle`)
    let button = document.getElementById(`${tmdb_id}-add`)
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`

    let date = new Date

    let dateAdded = document.createElement("div")
    dateAdded.classList.add('mx-1', 'text-center', 'badge', 'badge-blue')
    dateAdded.textContent = 'Added: '

    let dateAddedValue = document.createElement("span")
    dateAddedValue.textContent = date.toDateString()

    //console.log(rating)

    let body = {tmdb_id: tmdb_id, title: title, release_date: release_date, poster: poster, backdrop: backdrop, rating: rating}

    console.log(body)

    const request = await fetch('/api/watchlist/add', defaultheader(body))
    const response = await request.json()

    console.log(response)

    button.innerHTML = `<i class="fas fa-check"></i>`
    button.classList.add('disabled')

    subtitle.appendChild(dateAdded)
    dateAdded.appendChild(dateAddedValue)

    getwatchlist()

}

removewatch = async(tmdb_id) => {

    console.log(tmdb_id)

    let body = {tmdb_id: tmdb_id}

    const request = await fetch('/api/watchlist/remove', defaultheader(body))
    const response = await request.json()

    console.log(response)

    if (response.status === 'success'){

        console.log('getting watch list')

        getwatchlist()

    }

}

addwatched = async(tmdb_id, title, release_date, poster, backdrop, rating) => {

    console.log(title)
    console.log(tmdb_id)

    let subtitle = document.getElementById(`${tmdb_id}-subtitle`)
    let button = document.getElementById(`${tmdb_id}-add`)
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`

    let date = new Date

    let dateAdded = document.createElement("div")
    dateAdded.classList.add('mx-1', 'text-center', 'badge', 'badge-success')
    dateAdded.textContent = 'Watched: '

    let dateAddedValue = document.createElement("span")
    dateAddedValue.textContent = date.toDateString()

    //console.log(rating)

    let body = {tmdb_id: tmdb_id, title: title, release_date: release_date, poster: poster, backdrop: backdrop, rating: rating}

    console.log(body)

    const request = await fetch('/api/watchedlist/add', defaultheader(body))
    const response = await request.json()

    console.log(response)

    button.innerHTML = `<i class="fas fa-check"></i>`
    button.classList.add('disabled')

    subtitle.appendChild(dateAdded)
    dateAdded.appendChild(dateAddedValue)

    getwatchedlist()

}

removewatched = async(tmdb_id) => {

    console.log(tmdb_id)

    let body = {tmdb_id: tmdb_id}

    const request = await fetch('/api/watchedlist/remove', defaultheader(body))
    const response = await request.json()

    console.log(response)

    if (response.status === 'success'){

        console.log('getting watch list')

        getwatchedlist()

    }

}
