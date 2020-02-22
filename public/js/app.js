const form = document.querySelector('form')
form.addEventListener('submit', (event)=>{
    msgData.textContent = ''
    const address = document.querySelector('input')
    console.log(address.value)
    const loader = document.querySelector('.loader')
    loader.setAttribute("style", "display:block;")
    if(address!==""){
        fetch('http://localhost:3000/weather?address='+address.value).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    console.log("Unable to fetch the Weather")
                    const errData = document.querySelector('#errData')
                    loader.setAttribute("style", "display:none;")
                }else{
                    const msgData = document.querySelector('#msgData')
                    msgData.textContent = 'The current temperature is '+data.temperature;
                    loader.setAttribute("style", "display:none;")
                }
            })
        })
    }else{
        console.log("Enter Address")
    }

        event.preventDefault()
})