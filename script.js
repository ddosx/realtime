const
    h    = document.querySelector('.h');
    m1   = document.querySelector('.m-1');
    m2   = document.querySelector('.m-2');
    s1   = document.querySelector('.s-1');
    s2   = document.querySelector('.s-2');
    ms   = document.querySelector('.ms');
    msgc = document.querySelector('.hehe-container');
    hehe24 = document.querySelector("body > main > div > div.h > div")

let hehe = false;

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
    let ctn  = `<div>`
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
    if (hehe && 10 >= (h*3600+m*60+s)) {setH(24);} else {setH(h);};
    setM(m);
    setS(s);
    if (hehe) {
        if (hehe24.classList.contains('op0')) {hehe24.classList.remove('op0')}
    } else {if (!hehe24.classList.contains('op0')) {hehe24.classList.add('op0')}}
    ms.innerHTML = msPre(date.getMilliseconds());
    if ( ((24*60*60)-(h*3600+m*60+s)) == 1 && !first) {
        hsH();
        if (hehe) {hehe_f();} else {qmsg(new Date().toLocaleDateString("ru-RU"),new Date().toString().split(" ")[0]+' '+new Date().toString().split(" ")[1]) };
        first = true;
    } else if ((24*60*60)-(h*3600+m*60+s) != 1 || (24*60*60)-(h*3600+m*60+s) != 0 && first) {first = false;};
}
setInterval(() => {set()}, 12);

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
