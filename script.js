const
    h    = document.querySelector('.h');
    m1   = document.querySelector('.m-1');
    m2   = document.querySelector('.m-2');
    s1   = document.querySelector('.s-1');
    s2   = document.querySelector('.s-2');
    ms   = document.querySelector('.ms');
    msgc = document.querySelector('.hehe-container');
    hehe24 = document.querySelector("body > main > div > div.h > div.hehe24");
    settingsbtn = document.querySelector('.settings-btn');
    labels = document.querySelectorAll('.label');
    qm = document.querySelector('.qm');
    rs = document.querySelectorAll('.return-set');

let hehe = false;
let timer_int = ``;
let twth = false;

function save() {
    localStorage['s'] = JSON.stringify({'12':twth});
};

function load() {
    let data;
    if (localStorage['s']) {
        data = JSON.parse(localStorage['s']);
    } else {
        data = {12:false};
    };

    if (data[12] == true) {
        document.querySelector('#sys-12').checked = true;
        document.querySelector('#sys-24').checked = false;
    } else {
        document.querySelector('#sys-24').checked = true;
        document.querySelector('#sys-12').checked = false;
    }

    twth = data[12];
}

load()

async function setH(time) {

    let offset = 40.2;
    let offset_gl = 850;

    h.style.marginTop = ( offset_gl - ( time * ( 30 + offset) ) ) + 'px';
};

async function setM1(time) {

    let offset = 40.2;
    let offset_gl = 219.71;
    m1.style.marginTop = ( offset_gl - ( time * ( 30 + offset) ) ) + 'px';
};

async function setM2(time) {

    let offset = 40.2;
    let offset_gl = 323.7;
    m2.style.marginTop = ( offset_gl - ( time * ( 30 + offset) ) ) + 'px';
};

async function setS1(time) {
    let offset = 40.2;
    let offset_gl = 219.71;
    s1.style.marginTop = ( offset_gl - ( time * ( 30 + offset) ) ) + 'px';
};

async function setS2(time) {
    let offset = 40.2;
    let offset_gl = 323.7;
    s2.style.marginTop = ( offset_gl - ( time * ( 30 + offset) ) ) + 'px';
};


async function hsH() {
    h.classList.toggle('op0');
};

async function sH() {
    h.classList.remove('op0');
};

async function setM(time) {
    let q = String(time);
    if (q.length == 1) {
        q = `0${q}`
    };
    time0 = Number(q[0]);
    time1 = Number(q[1]);
    setM1(time0);
    setM2(time1);
}

async function setS(time) {
    let q = String(time);
    if (q.length == 1) {
        q = `0${q}`
    };
    time0 = Number(q[0]);
    time1 = Number(q[1]);
    setS1(time0);
    setS2(time1);
}

function msPre(time) {
    xtime = String(time);
    if (xtime.length == 0) {xtime = '000'}
    else if (xtime.length == 1) {xtime = `00${time}`}
    else if (xtime.length == 2) {xtime = `0${time}`};
    return xtime
}



function hehe_f() {
    qmsg('he-he');
};

async function qmsg(usermsg,usermsg2) {
    let msgx = usermsg.split("");
    let ctn  = `<div style="text-align: center">`
    let aoffset = 0
    for (i in msgx) {
        let q = msgx[i];
        ctn += `<span class='fromjs' style='animation-delay: ${ 200 + (200*i) + aoffset }ms'>${q}</span>`
    };
    if (usermsg2) {
        let msgu = usermsg2.split("");
        ctn  += `</div><div>`;
        for (i in msgu) {
            let q = msgu[i];
            ctn += `<span class='fromjs small' style='animation-delay: ${ 200 + (200*i) + aoffset + ( 200 * usermsg.length ) }ms'>${q}</span>`
        }
    }
    ctn  += `<div>`;
    msgc.classList.add('active');
    msgc.innerHTML = ctn;
}

function nextDay() {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    return tomorrow;
}

async function showDate(date) {
    if (!date) {return false;};
    let date_tostr = date.toString().split(" ");
    qmsg(
        `${date.toLocaleDateString("ru-RU")}`,`${date_tostr[0]} ${date_tostr[1]}`
    );
}

let first = false;
async function set() {
    sH()


    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();

    let dd = ``;

    if (twth) {
        hehe = false;
        document.querySelector('.heh').classList.add('op0');
        dd = 'AM';
        if (h => 12) {
            h -= 12;
            dd = 'PM';
        };
    } else {document.querySelector('.heh').classList.remove('op0');}

    if (hehe && 10 >= (h*3600+m*60+s)) {setH(24);} else {setH(h);};
    setM(m);
    setS(s);
    if (hehe) {
        if (hehe24.classList.contains('op0')) {hehe24.classList.remove('op0')}
    } else {if (!hehe24.classList.contains('op0')) {hehe24.classList.add('op0')}}
    ms.innerHTML = msPre(date.getMilliseconds())+' '+dd;
    if ( ((24*60*60)-(h*3600+m*60+s)) == 1 && !first) {
        hsH();
        if (hehe) {hehe_f();} else {showDate(nextDay());};
        first = true;
    } else if ((24*60*60)-(h*3600+m*60+s) != 1 || (24*60*60)-(h*3600+m*60+s) != 0 && first) {first = false;};
}

msgc.addEventListener('click',function (e) {
    hideMsg(e.target);
});


(function() {

    const cursor = document.querySelector('.inner-cursor');
    
    const followCursor = e => {
      const { clientX: x, clientY: y} = e;
      cursor.style.left = x + 'px';
      cursor.style.top = y + 'px';
    }
    
    window.addEventListener('mousemove', followCursor);
})();

function hideMsg(e) {
    if (e.classList.contains('active')) {
        e.classList.remove('active');
    };
}

async function openmenu() {
    qm.classList.remove('active');
    if (settingsbtn.classList.contains('active')) {
        setTimeout(() => {settingsbtn.classList.toggle('active2');}, 10);
        setTimeout(() => {settingsbtn.classList.toggle('active');}, 150);
        setTimeout(() => {document.querySelector('main').classList.toggle('blur');}, 200);
    } else {
        setTimeout(() => {settingsbtn.classList.toggle('active');document.querySelector('main').classList.toggle('blur');}, 10);
        setTimeout(() => {settingsbtn.classList.toggle('active2');}, 150);
    };
};


async function timeIO() {
    clearInterval(timer_int);
    timer_int = setInterval(() => {set()}, 12);
};

function timerIO(endTime) {
    hehe = false;
    hehe24.classList.add('op0');
    document.querySelector('.heh').classList.remove('op0');
    clearInterval(timer_int);
    let diffTime; // Difference time 
    timer_int = setInterval(function() {
        let currentTime = new Date(); // Take actual time 
        diffTime = endTime - currentTime; // Calculate how much time left 
        let hours = Math.floor(diffTime / (1000 * 60 * 60)) % 24; // Calculate hours 
        let minutes = Math.floor(diffTime / (1000 * 60)) % 60; // Calculate minutes
        let seconds = Math.floor(diffTime / 1000) % 60; // Calculate seconds
        let xms = diffTime % 1000; // Calculate milliseconds 
        setS(seconds);
        setM(minutes);
        setH(hours);
        if (0 > xms) {console.log('False');clearInterval(timer_int);qmsg('Время вышло!');timeIO()};
        ms.innerHTML = msPre(xms);
    },12);
}

function sIO() {
    hehe = false;
    hehe24.classList.add('op0');
    document.querySelector('.heh').classList.remove('op0');
    clearInterval(timer_int);
    let xms = 0;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    setS(seconds);
    setM(minutes);
    setH(hours);

    let startTime = Date.now();

    timer_int = setInterval(() => {
        let now = Date.now() - startTime;
        xms = now%1000;
        seconds = Math.floor(now/1000)%60;
        minutes = Math.floor((now/1000)/60)%60;
        hours = Math.floor(((now/1000)/60)/60);
        setS(seconds);
        setM(minutes);
        setH(hours);
        ms.innerHTML = msPre(xms);
    }, 1);
}

function addTimeToDate(hours, minutes, seconds) {
    let timeInMillis = Date.now() + (1000 * 60 * 60 * hours) + (1000 * 60 * minutes) + (1000 * seconds);
    return new Date(timeInMillis);
}
document.querySelector('.closeline').addEventListener("click",function () {
    if (settingsbtn.classList.contains('active')) {openmenu();};
});

document.querySelector('#mode-clock').addEventListener(`change`,function (e) {
    if (e.target.checked) {timeIO();};
})
document.querySelector('#mode-timer').addEventListener(`change`,function (e) {
    if (e.target.checked) {

        let v = document.querySelector('#appt').value;
        let x = v.split(":");


        if (isNaN(Number(x[2])) || isNaN(Number(x[1])) || isNaN(Number(x[0])) ) {
            qmsg('По человечески написали введи время. Но нет, ты его не ввёл...');
            document.querySelector('#mode-clock').checked = true;
            document.querySelector('#mode-secundomer').checked = false;
            document.querySelector('#mode-timer').checked = false;
        } else {
            timerIO(addTimeToDate(Number(x[0]),Number(x[1]),Number(x[2])));
            openmenu();
            qmsg(`Таймер запущен`,`на ${v}`)
        }
    }
})

document.querySelector('#mode-secundomer').addEventListener(`change`,function (e) {
    if (e.target.checked) {sIO();};
})

document.querySelector('#mode-clock').checked = true;
document.querySelector('#mode-secundomer').checked = false;
document.querySelector('#mode-timer').checked = false;

document.querySelector('#sys-12').addEventListener('change',function (e) {
    if (e.target.checked){
        twth = true;
        save();
    }  
})
document.querySelector('#sys-24').addEventListener('change',function (e) {
    if (e.target.checked){
        twth = false;
        save();
    }
})


let alll = []

for (let i = 0;i<(labels.length-1);i++) {

    alll.push(labels[i].getAttribute('data-set'))

    labels[i].addEventListener('click',function (e) {
        document.querySelector('.welcome-set').classList.add('s-close');
        for (let j = 0;j<alll.length;j++) {
            document.querySelector(alll[j]).classList.add('s-close');
        };
        document.querySelector(e.target.getAttribute('data-set')).classList.remove('s-close');
        qm.classList.add('active');
    })
}

for (let i = 0;i<rs.length;i++) {
    rs[i].addEventListener(`click`,function () {
        qm.classList.remove('active')
    })
}

document.querySelector('#hehehehe').addEventListener('click',function (e) {
    hehe = e.target.checked;
    openmenu();
});

timeIO();