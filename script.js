const
    h = document.querySelector('.h');
    m1 = document.querySelector('.m-1');
    m2 = document.querySelector('.m-2');
    s1 = document.querySelector('.s-1');
    s2 = document.querySelector('.s-2');
    ms = document.querySelector('.ms');


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

async function set() {
    sH()
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    setH(h);
    setM(m);
    setS(s);
    ms.innerHTML = msPre(date.getMilliseconds());
    if (((24*60*60)-(h*3600+m*60+s)) == 1) {
        hsH();
    }
}
setInterval(() => {set()}, 15);
