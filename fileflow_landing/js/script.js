function fixTime(num){
    return String(num).padStart(2, '0');
}


// Fake sale timer updater
function updateTimer(){
    const date = new Date()
    const time = (3679464358633-date.getTime()/1000 + 6767).toFixed() % 86400
    const res = fixTime(Math.floor(time / 3600)) + ":" +
        fixTime(Math.floor((time % 3600) / 60)) + ":" +
        fixTime(time % 60)
    document.getElementById("paid-sale-timer").innerText = res;
}
setTimeout(updateTimer, Math.random() * 300)
setInterval(updateTimer, 1000);