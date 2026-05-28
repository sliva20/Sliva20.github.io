function fixTime(num, howmuch){
    return String(num).padStart(howmuch, '0');
}


// Fake sale timer updater
function updateTimer(){
    const date = new Date();
    const time = (3679464358633-date.getTime()/1000 + 6767).toFixed() % 86400;
    const res = fixTime(Math.floor(time / 3600), 2) + ":" +
        fixTime(Math.floor((time % 3600) / 60), 2) + ":" +
        fixTime(time % 60, 2)
    document.getElementById("paid-sale-timer").innerText = res;
}

function updateStats(){
    const date = new Date();
    const timeSinceLaunch = Math.floor(date.getTime() / 1000 / 60 / 20 - 1483310)

    const visitors = timeSinceLaunch * 9;
    const downloadsPaid = Math.floor(timeSinceLaunch * 0.6767);
    const downloadsFree = Math.floor(timeSinceLaunch * 3.1415);
    const downloads = downloadsPaid + downloadsFree;
    document.getElementById("stat-visitors").innerText = fixTime(visitors, 6);
    document.getElementById("stat-downloads").innerText = fixTime(downloads, 6);
    document.getElementById("stat-download-paid").innerText = fixTime(Math.floor(downloadsPaid), 6);
    document.getElementById("stat-download-free").innerText = fixTime(Math.floor(downloadsFree), 6);
}

let loadtime = Math.random() * 150 + 150;
setTimeout(updateTimer, loadtime);
setTimeout(updateStats, loadtime);
setInterval(updateTimer, 1000);
setInterval(updateStats, 60000);