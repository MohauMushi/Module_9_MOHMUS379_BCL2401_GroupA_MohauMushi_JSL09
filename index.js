fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
    .then(response => response.json())
    .then(data => {
        console.log(data.urls.regular)
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err =>{
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE3MTI2NjE1OTR8&ixlib=rb-4.0.3&q=80&w=1080)`;
        document.getElementById("author").textContent = `By: John Johnson`;
    });

/*
    Pulling down the cryptocurrency data for dogecoin from the 
    CoinGecko API and log it to the console 
    Also adding a .catch() method to console any errors that might occur to the console
*/
    fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
    .then(response => {
        if(!response.ok){
            throw Error("Something went wrong")
        }
        // console.log(response.ok)
        return response.json()
    })
    .then(data =>{
        /**
         * Add the name and icon of the cryptocurrency
         * to the upper-left of the dashboard page
         * Use `data.name` and `data.image.small` to access that info
         */
        document.getElementById("crypto-top").innerHTML = `
        <img src = ${data.image.small}/>
        <span> ${data.name}</span>
        `
        // 
        document.getElementById("crypto").innerHTML += `
        <p> 🎯: R ${data.market_data.current_price.zar}</P>
        <p> ☝️: R ${data.market_data.high_24h.zar}</P>
        <p> 👇: R ${data.market_data.low_24h.zar}</P>
        `
    })
    .catch(error => console.log(error))