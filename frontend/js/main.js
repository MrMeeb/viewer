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

    const request = await fetch('/api/gettoken', options)
    const response = await request.json();

    localStorage.setItem('token', response)
  
}

function reload() {

    location.reload()

}