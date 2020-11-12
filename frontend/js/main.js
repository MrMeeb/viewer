// --------------
// Visual Elements
// --------------

function toggleSlide(...args) {
 
    args.forEach(b)

    function b(value, index, array) {

        function getHeight() {
            value.style.height = 'auto'
            var height = value.offsetHeight
            value.style.height = '0'
            return height
        }

        if (value.offsetHeight == 0) {
            //if already hidden, unhide
            var height = `${getHeight()}px`
            setTimeout(() => {value.style.height = height;}, 50)
            setTimeout(() => {value.style.height = 'auto'; value.style.overflow = 'visible'}, 200)   
        }

        else {
            //if already visible, hide
            value.style.overflow = 'hidden'
            value.style.height = `${value.offsetHeight}px`
            setTimeout(() => {value.style.height = `0`}, 2)
        }


      }
}

function formFeedback(location, message, type) {
 
    const messageContainer = document.getElementById(location)

    const messageType = messageContainer.classList.add(type)
    
    const messageText = messageContainer.textContent = message

    messageType

    messageText

    toggleSlide(messageContainer)

}

function fetchBackground() {
    let fallbackNum = ["1","2","3"],
    fallbackNumChoice = fallbackNum[Math.floor(Math.random() * fallbackNum.length)];

    document.getElementById("mainBackground").style.backgroundImage = 'url(/images/backgrounds/' + fallbackNumChoice + '.jpg)';
}


//Get Token for API access

gettoken = async (username, password, id) => {

    const body = {username: username, password: password, id: id}

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        },
        body: JSON.stringify(body)
    }

    try {

        const request = await fetch('/api/token/get', options)
        const response = await request.json();
        localStorage.setItem('token', response)
        checktoken()

    } catch (error) {
        console.error('An error occured')
        console.log('Retrying')

        let grandparent = document.getElementById('watch-results-container')

        const countdownno = function() {

            var i = 4

            function loop() {
                setTimeout(function() {
                    console.log(i)
                    countdownval.textContent = ` ${i}`
                    i--
                    if (i > 0) {
                        loop()
                    }
                }, 1000)
            }

            loop()

        }

        const countdownval100 = function() {

            var i = 0

            function loop() {
                setTimeout(function() {
                    console.log(i)
                    progressbar.style.width = `${i}%`
                    i++
                    if (i < 101) {
                        loop()
                    }
                }, 40)
            }

            loop()

        }


        grandparent.innerHTML = ''

        let parent = document.createElement("div")
        parent.classList.add('d-flex', 'flex-column', 'justify-contents-center', 'text-center')

        let countdown = document.createElement("div")
        countdown.textContent = 'An error occured. Page reloading in'

        let countdownval = document.createElement("span")
        countdownval.textContent = ' 5'

        countdownno()

        let progress = document.createElement("div")
        progress.classList.add('progress', 'mt-2')

        let progressbar = document.createElement("div")
        progressbar.classList.add('progress-bar', 'progress-bar-pink', 'progress-bar-striped', 'progress-bar-animated')

        let countdown100 = document.createElement("div")
        countdownval100()

        grandparent.appendChild(parent)
        parent.appendChild(countdown)
        countdown.appendChild(countdownval)
        parent.appendChild(countdown100)
        parent.appendChild(progress)
        progress.appendChild(progressbar)

        setTimeout(() => {
           console.log('reloading')
           location.reload()
       }, 5000)
    }

  
}

checktoken = async () => {

    const token = localStorage.getItem('token')

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    if (token === null) {

        console.log('Waiting for token')

        setTimeout(() => {
            checktoken()
            return
        }, 100);

    }
    else {
        const request = await fetch('api/token/check', options)
        const response = await request.json()
    
        console.log(response)

        if (response.status === 'success') {

            gettrending()
            getwatchlist()
            getwatchedlist()

        }
        if (response.status === 'error') {

            gettoken()

        }

    }

}

function reload() {

    location.reload()

}