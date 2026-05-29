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
    const timeSinceLaunch = Math.floor(date.getTime() / 1000 / 60 / 60 - 494455)

    const visitors = Math.floor(timeSinceLaunch * 4.425);
    const downloadsPaid = Math.floor(timeSinceLaunch * 0.167);
    const downloadsFree = Math.floor(timeSinceLaunch * 1.267);
    const downloads = downloadsPaid + downloadsFree;
    document.getElementById("stat-visitors").innerText = fixTime(visitors, 6);
    document.getElementById("stat-downloads").innerText = fixTime(downloads, 6);
    document.getElementById("stat-download-paid").innerText = fixTime(Math.floor(downloadsPaid), 6);
    document.getElementById("stat-download-free").innerText = fixTime(Math.floor(downloadsFree), 6);
}

function createPopup(titletext, text, btntext, link, btntext2){

    const puCont = document.createElement("div")
    puCont.classList.add("popup-container")

    function removepopup(){
        puCont.remove()
    }

    const msg = document.createElement("div")
    msg.classList.add("pricing-card")
    msg.classList.add("popup")

    const header = document.createElement("h1")
    header.innerText = titletext;

    const textel = document.createElement("p")
    textel.innerText = text;
    
    msg.append(header)
    msg.append(textel)

    const btn1 = document.createElement("button")
    btn1.innerText = btntext;
    btn1.addEventListener("click", removepopup)

    if (btntext2){
        btn1.addEventListener("click", () => {window.open(link, '_blank');})

        const btncont = document.createElement("div")
        btncont.classList.add("popup-btn-cont")

        const btn2 = document.createElement("button")
        btn2.innerText = btntext2;
        btn2.addEventListener("click", () => {
            puCont.remove()
        })
        btncont.append(btn1)
        btncont.append(btn2)
        msg.append(btncont)
    }
    else {
        msg.append(btn1)
    }

    puCont.append(msg)
    document.body.append(puCont)
}

let loadtime = Math.random() * 150 + 150;

setTimeout(updateTimer, loadtime);
setTimeout(updateStats, loadtime);
setInterval(updateTimer, 1000);
setInterval(updateStats, 60000);

document.getElementById("paid-btn").addEventListener("click", () => {
    createPopup("Поддержка", "На самом деле здесь нету FileFlow Pro, но если вы хотите поддержать автора, то можно пожертвовать эти $2. Вы желаете это сделать?", "Ну давай", "https://funpay.com/lots/offer?id=69529450", "Не буду")
})

document.getElementById("debug").addEventListener("click", () => createPopup("title", "Test msg", "BTN", "BTN2"))
document.getElementById("contact-form").addEventListener("submit", (event) => {
    event.preventDefault();

    let isFormValid = true;
    let reason = 0;
    
    if (!document.getElementById("contact-email").value.includes(".")){
        isFormValid = false;
        reason = 1;
    }
    else if (document.getElementById("contact-text").value.length < 24){
        isFormValid = false;
        reason = 2;
    }

    if (isFormValid) {
        this.submit()
    } else {
        switch (reason){
            case 1:
                createPopup("Неправильное заполнение формы", "Пожалуйста, введите правильный адрес эл. почты.", "Хорошо")
                break
            case 2:
                createPopup("Неправильное заполнение формы", "Пожалуйста, напишите более длинное сообщение в поддержку.", "Хорошо")
                break
        }
    }
})



window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash === '#sent') {
        createPopup("Отправлено", "Ваше сообщение было отправлено разработчику! Он вам ответит на указанную электронную почту в скором времени.", "Ура")
    }
});