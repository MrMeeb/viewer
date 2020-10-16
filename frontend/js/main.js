

//Form grabber

/* const form = document.querySelector('form')
if (form !== null) {
    form.addEventListener('submit', event => {
        // submit event detected
        event.preventDefault()
      })
} */

// --------------
// Visual Elements
// --------------

function toggleSlide(...args) {
 
    args.forEach(b)

    function b(value, index, array) {

        //console.log(value)

        function getHeight() {
            value.style.height = 'auto'
            var height = value.offsetHeight
            value.style.height = '0'
            return height
        }

        if (value.offsetHeight == 0) {
            //if already hidden, unhide
            var height = `${getHeight()}px`
            setTimeout(() => {value.style.height = height;}, 50) //was 1
            setTimeout(() => {value.style.height = 'auto'; value.style.overflow = 'visible'}, 200)   
//            value.classList.add('unhidden')
//            value.classList.remove('hidden')
//            setTimeout(() => {value.style.height = ''}, 200)
        }
/*         else if (value.classList.contains('no-rehide')){

        } */
        else {
            //if already visible, hide
            value.style.overflow = 'hidden'
            value.style.height = `${value.offsetHeight}px`
            setTimeout(() => {value.style.height = `0`}, 2)
//            value.classList.add('hidden')
//            value.classList.remove('unhidden')
//            setTimeout(() => {value.style.height = ''}, 1)
        }


      }
}

function formFeedback(location, message, type){
 
    const messageContainer = document.getElementById(location)

    const messageType = messageContainer.classList.add(type)
    
    const messageText = messageContainer.textContent = message

    messageType

    messageText

    toggleSlide(messageContainer)

}

const fetchBackground = function() {
    let fallbackNum = ["1","2","3"],
    fallbackNumChoice = fallbackNum[Math.floor(Math.random() * fallbackNum.length)];

    document.getElementById("mainBackground").style.backgroundImage = 'url(/images/backgrounds/' + fallbackNumChoice + '.jpg)';
}


//Sign Up

signup = async () => {

    let username = document.getElementById('username').value

    let password = document.getElementById('password').value

    if (username.length === 0 || password.length === 0) {
        
        return null

    }

    else {

        const body = {username: username, password: password}

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            },
            body: JSON.stringify(body)
        }

        const request = await fetch('/api/signup', options)
        const response = await request.json()

        console.log(response)

        if (response.status === false) {
            console.log('username already taken')

            formFeedback('username-feedback', 'User already exists', 'invalid-feedback')

        }

        else {
            let formContainer = document.getElementById('signup-form')

            let successContainer = document.getElementById('signup-success')
    
            toggleSlide(formContainer, successContainer)
        }
    }
}

//Sign In

signin = async () => {

    let username = document.getElementById('username').value

    let password = document.getElementById('password').value

    if (username.length === 0 || password.length === 0) {
        
        return null

    }

    else {

        const body = {username: username, password: password}

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
            },
            body: JSON.stringify(body)
        }

        const request = await fetch('/api/signin', options)
        const response = await request.json()

        console.log(response)

        localStorage.setItem('token', response)
    }
}