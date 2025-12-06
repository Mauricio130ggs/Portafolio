const images = [
    "img/ahora.jpeg",
    "img/this.jpeg",
    "img/good.jpeg",
    "img/oye.jpeg",
    "img/tobe.jpeg"
];

let songs = [];
let i = 0;
let playing = false;

const audio = document.getElementById('audio');
const play = document.getElementById('play');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const prog = document.getElementById('prog');
const bar = document.getElementById('bar');
const curr = document.getElementById('curr');
const dur = document.getElementById('dur');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const img = document.getElementById('img');
const vol = document.getElementById('vol');
const viz = document.getElementById('viz');
const fileInput = document.getElementById('fileInput');
const songCount = document.getElementById('songCount');

for (let j = 0; j < 30; j++) {
    const b = document.createElement('div');
    b.className = 'bar';
    viz.appendChild(b);
}
const bars = document.querySelectorAll('.bar');

let ctx, analyser, data, len;

function setup() {
    if (!ctx) {
        ctx = new (window.AudioContext || window.webkitAudioContext)();
        analyser = ctx.createAnalyser();
        const src = ctx.createMediaElementSource(audio);
        src.connect(analyser);
        analyser.connect(ctx.destination);
        analyser.fftSize = 64;
        len = analyser.frequencyBinCount;
        data = new Uint8Array(len);
    }
}

fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    songs = files.map((file, index) => ({
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: "Mi Música",
        url: URL.createObjectURL(file),
        image: images[index % images.length]
    }));
    
    if (songs.length > 0) {
        songCount.textContent = `${songs.length} canción${songs.length > 1 ? 'es' : ''} cargada${songs.length > 1 ? 's' : ''}`;
        load(0);
    }
});

function animate() {
    requestAnimationFrame(animate);
    
    if (playing && analyser) {
        analyser.getByteFrequencyData(data);
        bars.forEach((b, idx) => {
            const d = data[Math.floor(idx * len / bars.length)];
            b.style.height = (d / 255) * 60 + 'px';
        });
    } else {
        bars.forEach(b => {
            b.style.height = Math.random() * 15 + 5 + 'px';
        });
    }
}

function load(idx) {
    if (songs.length === 0) return;
    i = idx;
    const s = songs[idx];
    audio.src = s.url;
    title.textContent = s.title;
    artist.textContent = s.artist;
    img.src = s.image;
}

function toggle() {
    if (songs.length === 0) {
        alert('¡Selecciona música primero!');
        return;
    }
    if (!ctx) setup();
    
    if (playing) {
        audio.pause();
        play.textContent = '▶';
    } else {
        audio.play();
        play.textContent = '⏸';
    }
    playing = !playing;
}

function prevSong() {
    if (songs.length === 0) return;
    i = (i - 1 + songs.length) % songs.length;
    load(i);
    if (playing) audio.play();
}

function nextSong() {
    if (songs.length === 0) return;
    i = (i + 1) % songs.length;
    load(i);
    if (playing) audio.play();
}

function update() {
    const p = (audio.currentTime / audio.duration) * 100;
    prog.style.width = p + '%';
    curr.textContent = format(audio.currentTime);
    dur.textContent = format(audio.duration);
}

function format(s) {
    if (isNaN(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

function seek(e) {
    const w = bar.clientWidth;
    const x = e.offsetX;
    audio.currentTime = (x / w) * audio.duration;
}

function changeVol(e) {
    audio.volume = e.target.value / 100;
}

play.onclick = toggle;
prev.onclick = prevSong;
next.onclick = nextSong;
audio.ontimeupdate = update;
audio.onended = nextSong;
bar.onclick = seek;
vol.oninput = changeVol;

audio.volume = 0.7;
animate();