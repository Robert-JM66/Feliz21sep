const NS = "http://www.w3.org/2000/svg";
const bouquet = document.getElementById("bouquet");
const flowerBed = document.getElementById("flower-bed");

const FLOWERS = [
  {x:"50%", size:"150px", rotate:"0deg", delay:".05s", sway:"6.4s"},
  {x:"38%", size:"132px", rotate:"-9deg", delay:".18s", sway:"7.2s"},
  {x:"62%", size:"132px", rotate:"9deg", delay:".24s", sway:"6.8s"},
  {x:"30%", size:"105px", rotate:"-18deg", delay:".34s", sway:"7.7s"},
  {x:"70%", size:"105px", rotate:"18deg", delay:".42s", sway:"7.3s"},
  {x:"45%", size:"108px", rotate:"-6deg", delay:".52s", sway:"8.1s"},
  {x:"55%", size:"108px", rotate:"6deg", delay:".6s", sway:"7.8s"},
  {x:"34%", size:"88px", rotate:"-16deg", delay:".7s", sway:"8.6s"},
  {x:"66%", size:"88px", rotate:"16deg", delay:".76s", sway:"8.3s"},
  {x:"25%", size:"78px", rotate:"-25deg", delay:".84s", sway:"8.8s"},
  {x:"75%", size:"78px", rotate:"25deg", delay:".9s", sway:"8.5s"}
];

function seeds(){
  let circles = "";
  for(let index = 0; index < 82; index++){
    const radius = 2.65 * Math.sqrt(index);
    const angle = index * 2.39996;
    circles += `<circle cx="${(radius * Math.cos(angle)).toFixed(1)}" cy="${(radius * Math.sin(angle)).toFixed(1)}" r="1.35" fill="#5a3a1c" opacity=".65"/>`;
  }
  return circles;
}

function createFlower(flower, index){
  const element = document.createElement("div");
  element.className = "flower";
  element.style.cssText = `--x:${flower.x};--size:${flower.size};--rotate:${flower.rotate};--delay:${flower.delay};--sway:${flower.sway}`;
  let petals = "";
  for(let petal = 0; petal < 14; petal++){
    petals += `<g transform="rotate(${petal * (360 / 14)})"><path class="floral-petal" style="--petal:${petal}" d="M0 -8 C15 -28 16 -62 0 -84 C-16 -62 -15 -28 0 -8Z" fill="url(#petal${index})" stroke="#c28b19" stroke-opacity=".4"/></g>`;
  }
  element.innerHTML = `<div class="flower-sway"><svg viewBox="0 0 200 440" xmlns="${NS}" aria-hidden="true">
    <defs>
      <linearGradient id="petal${index}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#df9916"/><stop offset=".6" stop-color="#f5c842"/><stop offset="1" stop-color="#fff0a3"/></linearGradient>
      <radialGradient id="center${index}" cx="35%" cy="30%"><stop offset="0" stop-color="#765023"/><stop offset=".7" stop-color="#3b2716"/><stop offset="1" stop-color="#21160d"/></radialGradient>
    </defs>
    <path d="M100 125 C93 235 107 340 100 440" stroke="#527c48" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M100 240 C61 225 35 258 24 291 C63 300 91 282 100 256Z" fill="#638e53"/>
    <path d="M100 315 C139 301 165 328 178 359 C137 368 109 348 100 325Z" fill="#4e7d43"/>
    <g transform="translate(100 112)">${petals}<g class="floral-center"><circle r="29" fill="url(#center${index})" stroke="#e9ae28" stroke-width="2"/>${seeds()}</g></g>
  </svg></div>`;
  return element;
}
FLOWERS.forEach((flower,index)=> flowerBed.appendChild(createFlower(flower,index)));

function createAtmosphere(){
  const stars = document.getElementById("stars");
  for(let index = 0; index < 46; index++){
    const star = document.createElement("span");
    star.className = "star";
    star.style.left = `${8 + Math.random() * 84}%`;
    star.style.top = `${5 + Math.random() * 58}%`;
    star.style.setProperty("--speed", `${2.3 + Math.random() * 3.5}s`);
    star.style.animationDelay = `${Math.random() * 4}s`;
    stars.appendChild(star);
  }
  const field = document.getElementById("petal-field");
  for(let index = 0; index < 14; index++){
    const petal = document.createElement("span");
    petal.className = "falling-petal";
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    petal.style.setProperty("--duration", `${8 + Math.random() * 9}s`);
    petal.style.setProperty("--delay", `${-Math.random() * 12}s`);
    field.appendChild(petal);
  }
  const spiral = document.getElementById("petal-spiral");
  for(let index = 0; index < 90; index++){
    const petal = document.createElement("span");
    petal.className = "spiral-petal";
    petal.style.setProperty("--angle", `${index * 28}deg`);
    petal.style.setProperty("--radius", `${24 + index * 3.15}px`);
    petal.style.setProperty("--petal-size", `${7 + (index % 4) * 2}px`);
    petal.style.setProperty("--spiral-delay", `${index * -.22}s`);
    petal.style.setProperty("--spiral-speed", `${7 + (index % 5)}s`);
    petal.style.setProperty("--petal-opacity", `${.35 + (index % 5) * .1}`);
    spiral.appendChild(petal);
  }
  for(let index = 0; index < 7; index++){
    const orbit = document.createElement("span");
    orbit.className = "spiral-orbit";
    orbit.style.setProperty("--orbit-size", `${130 + index * 44}px`);
    orbit.style.setProperty("--orbit-angle", `${index * 25 - 18}deg`);
    orbit.style.setProperty("--orbit-delay", `${index * -.9}s`);
    spiral.appendChild(orbit);
  }
  const spiralWords = ["Te amo", "Siempre tú", "Flores para ti", "Mi amor", "Sonríe", "Juntos"];
  spiralWords.forEach((word,index)=>{
    const label = document.createElement("span");
    label.className = "spiral-word";
    label.textContent = word;
    label.style.setProperty("--angle", `${index * 58 + 18}deg`);
    label.style.setProperty("--radius", `${78 + index * 26}px`);
    label.style.setProperty("--spiral-delay", `${index * -.8}s`);
    spiral.appendChild(label);
  });
  const flowerSymbols = ["✿", "✽", "❀", "✿"];
  for(let index = 0; index < 18; index++){
    const rose = document.createElement("span");
    rose.className = "spiral-flower";
    rose.textContent = flowerSymbols[index % flowerSymbols.length];
    rose.style.setProperty("--angle", `${index * 40 + 25}deg`);
    rose.style.setProperty("--radius", `${54 + index * 14}px`);
    rose.style.setProperty("--spiral-delay", `${index * -.42}s`);
    rose.style.setProperty("--flower-scale", `${.65 + (index % 4) * .14}`);
    spiral.appendChild(rose);
  }
  for(let index = 0; index < 72; index++){
    const star = document.createElement("span");
    star.className = "galaxy-star";
    star.textContent = index % 9 === 0 ? "✦" : "·";
    star.style.setProperty("--angle", `${index * 31 + (index % 4) * 8}deg`);
    star.style.setProperty("--radius", `${35 + (index % 24) * 10}px`);
    star.style.setProperty("--star-delay", `${index * -.18}s`);
    star.style.setProperty("--star-size", `${.45 + (index % 5) * .18}rem`);
    spiral.appendChild(star);
  }
}
createAtmosphere();

const revealButton = document.getElementById("reveal-bouquet");
revealButton.addEventListener("click", ()=>{
  bouquet.classList.remove("bouquet-hidden");
  bouquet.classList.add("bouquet-revealed");
  revealButton.innerHTML = "<span>♥</span> Mi regalo para ti";
  revealButton.disabled = true;
  const heroArt = document.getElementById("hero-art");
  for(let index = 0; index < 24; index++){
    const piece = document.createElement("i");
    piece.className = "confetti";
    piece.style.left = `${38 + Math.random() * 24}%`;
    piece.style.top = `${34 + Math.random() * 12}%`;
    piece.style.setProperty("--x", `${-180 + Math.random() * 360}px`);
    piece.style.setProperty("--y", `${90 + Math.random() * 260}px`);
    piece.style.setProperty("--turn", `${-360 + Math.random() * 720}deg`);
    piece.style.setProperty("--delay", `${Math.random() * .25}s`);
    heroArt.appendChild(piece);
    piece.addEventListener("animationend", ()=> piece.remove());
  }
});

const LETTERS = [
  {kind:"amor", label:"carta de amor", title:"Donde estés tú", text:"Mi lugar favorito no es un sitio: es cualquier momento en el que puedo compartir una sonrisa contigo.", note:"Para guardar cerca"},
  {kind:"amor", label:"carta de amor", title:"Lo que provocas", text:"Desde que llegaste, los días normales tienen algo extraordinario. Gracias por hacer tan bonito mi mundo.", note:"Con todo mi corazón"},
  {kind:"amor", label:"carta de amor", title:"Mi deseo", text:"Que nunca nos falten abrazos largos, conversaciones sin prisa y razones para volver a elegirnos.", note:"Siempre tú"},
  {kind:"amor", label:"carta de amor", title:"Mi calma", text:"Contigo entendí que el amor también puede sentirse como paz, confianza y un abrazo que llega justo a tiempo.", note:"Sin prisa"},
  {kind:"amor", label:"carta de amor", title:"Tu sonrisa", text:"Tu sonrisa tiene la costumbre de encender incluso mis días más nublados. Nunca dejes de regalarla.", note:"Mi luz favorita"},
  {kind:"amor", label:"carta de amor", title:"Te elegiría", text:"Entre todos los caminos, volvería a elegir el que me lleve a encontrarte. Una y otra vez.", note:"Una y mil veces"},
  {kind:"amor", label:"carta de amor", title:"Nuestro pequeño mundo", text:"Me gustan nuestras bromas, nuestras conversaciones y la forma en que hacemos especial cualquier momento sencillo.", note:"Solo nosotros"},
  {kind:"amor", label:"carta de amor", title:"Gracias por llegar", text:"Gracias por llegar a mi vida y dejar en ella una versión más alegre, más valiente y más bonita de mí.", note:"Con gratitud"},
  {kind:"amor", label:"carta de amor", title:"Un abrazo pendiente", text:"Guardo para ti un abrazo largo, de esos que dicen todo lo que las palabras no alcanzan a explicar.", note:"Cuando nos veamos"},
  {kind:"amor", label:"carta de amor", title:"Mi pensamiento bonito", text:"A veces apareces en mis pensamientos sin avisar y conviertes un instante cualquiera en un momento feliz.", note:"Siempre presente"},
  {kind:"amor", label:"carta de amor", title:"Lo nuestro", text:"Lo nuestro merece cuidado, risas, paciencia y muchos recuerdos nuevos. Me encanta construirlo contigo.", note:"Cuidemos esto"},
  {kind:"amor", label:"carta de amor", title:"Mi lugar seguro", text:"Gracias por ser ese lugar donde puedo ser yo, hablar sin miedo y sentirme querido de verdad.", note:"Cerca de ti"},
  {kind:"amor", label:"carta de amor", title:"Tu forma de ser", text:"Admiro tu corazón, tu fuerza y esa forma tan tuya de hacer que las personas se sientan importantes.", note:"Te admiro"},
  {kind:"amor", label:"carta de amor", title:"Hasta lo simple", text:"Hasta hacer nada contigo se siente como un plan perfecto. Esa es una de mis cosas favoritas de nosotros.", note:"Lo cotidiano"},
  {kind:"amor", label:"carta de amor", title:"Mi promesa", text:"Prometo seguir celebrando tus sueños, cuidando tus días y buscando nuevas formas de hacerte sonreír.", note:"Con todo mi cariño"},
  {kind:"amistad", label:"carta de amistad", title:"Qué suerte tenerte", text:"Tu amistad es de esas luces que aparecen justo cuando hacen falta. Gracias por estar y por hacer más ligeros mis días.", note:"Una amistad bonita"},
  {kind:"amistad", label:"carta de amistad", title:"Gracias por tanto", text:"Por las risas, los consejos, las historias y cada pequeño momento que terminamos convirtiendo en recuerdo.", note:"Para celebrar lo nuestro"},
  {kind:"amistad", label:"carta de amistad", title:"Siempre hay espacio", text:"Pase lo que pase, siempre habrá un lugar para ti en mis días, una conversación pendiente y una razón para sonreír.", note:"De corazón a corazón"},
  {kind:"amistad", label:"carta de amistad", title:"Mi persona cómplice", text:"Gracias por entender mis silencios, celebrar mis locuras y acompañarme sin pedir explicaciones.", note:"Cómplices siempre"},
  {kind:"amistad", label:"carta de amistad", title:"Risas aseguradas", text:"Contigo cualquier plan puede terminar en una historia que recordaremos durante años.", note:"Que nunca falten risas"},
  {kind:"amistad", label:"carta de amistad", title:"En los días difíciles", text:"Gracias por estar también cuando no tengo mi mejor día. Tu compañía hace que todo pese un poquito menos.", note:"Gracias por estar"},
  {kind:"amistad", label:"carta de amistad", title:"Una amistad de verdad", text:"Las amistades bonitas no necesitan hablar todos los días para seguir sintiéndose cerca.", note:"Sin distancias"},
  {kind:"amistad", label:"carta de amistad", title:"Nuestro álbum", text:"Cada conversación, salida y tontería compartida merece un espacio en nuestro álbum de recuerdos.", note:"Momentos que guardo"},
  {kind:"amistad", label:"carta de amistad", title:"Tu consejo", text:"A veces tus palabras llegan justo cuando las necesito. Gracias por escucharme y decirme la verdad con cariño.", note:"Siempre te escucho"},
  {kind:"amistad", label:"carta de amistad", title:"Una celebración", text:"Hoy celebro tu forma de ser, tu alegría y la suerte de poder llamarte mi amigo o mi amiga.", note:"Hoy y siempre"},
  {kind:"amistad", label:"carta de amistad", title:"Mi refugio", text:"Hay amistades que se sienten como casa. La tuya es una de ellas.", note:"Aquí estoy"},
  {kind:"amistad", label:"carta de amistad", title:"Aventuras pendientes", text:"Todavía nos quedan muchas historias, lugares y aventuras por descubrir. Esta amistad apenas sigue floreciendo.", note:"Lo mejor continúa"},
  {kind:"amistad", label:"carta de amistad", title:"Gracias por hacerme reír", text:"Tu humor tiene un talento especial para rescatar cualquier día gris.", note:"Mi risa favorita"},
  {kind:"amistad", label:"carta de amistad", title:"De los que permanecen", text:"Gracias por ser de esas personas que no solo pasan por la vida, sino que dejan algo bonito en ella.", note:"Una huella bonita"},
  {kind:"amistad", label:"carta de amistad", title:"Cuenta conmigo", text:"En los planes grandes y en los días pequeños, cuenta conmigo. La amistad también se demuestra estando.", note:"Siempre cerca"}
];

const modal = document.getElementById("letter-modal");
const modalKicker = document.getElementById("modal-kicker");
const modalTitle = document.getElementById("modal-title");
const modalCopy = document.getElementById("modal-copy");
let currentLetter = 0;
let activeKind = "amor";
function visibleLetters(){
  return LETTERS.filter(letter=> letter.kind === activeKind);
}
function updateLetterDots(){
  document.querySelectorAll(".letter-dot").forEach((dot,index)=> dot.classList.toggle("active", index === currentLetter));
}
function openLetter(index = currentLetter){
  const collection = visibleLetters();
  currentLetter = (index + collection.length) % collection.length;
  const letter = collection[currentLetter];
  modalKicker.textContent = letter.label;
  modalTitle.textContent = letter.title;
  modalCopy.textContent = letter.text;
  modal.hidden = false;
  updateLetterDots();
  document.getElementById("close-modal").focus();
}
function closeLetter(){
  modal.hidden = true;
}
document.getElementById("close-modal").addEventListener("click", closeLetter);
document.querySelector("[data-close-modal]").addEventListener("click", closeLetter);
document.addEventListener("keydown", event=> { if(event.key === "Escape" && !modal.hidden) closeLetter(); });

const letterDots = document.getElementById("letter-dots");
function renderLetterDots(){
  letterDots.innerHTML = "";
  visibleLetters().forEach((letter,index)=>{
  const dot = document.createElement("button");
  dot.className = "letter-dot";
  dot.type = "button";
  dot.setAttribute("aria-label", `Abrir carta ${index + 1}`);
  dot.addEventListener("click", ()=> openLetter(index));
  letterDots.appendChild(dot);
  });
  updateLetterDots();
}
renderLetterDots();
document.getElementById("open-letters").addEventListener("click", ()=> openLetter(0));
document.getElementById("previous-letter").addEventListener("click", ()=> openLetter(currentLetter - 1));
document.getElementById("next-letter").addEventListener("click", ()=> openLetter(currentLetter + 1));

document.querySelectorAll("[data-letter-kind]").forEach(button=> button.addEventListener("click", ()=>{
  activeKind = button.dataset.letterKind;
  currentLetter = 0;
  document.querySelectorAll("[data-letter-kind]").forEach(item=> item.classList.toggle("type-active", item === button));
  renderLetterDots();
  openLetter(0);
}));

document.addEventListener("keydown", event=> {
  if(modal.hidden) return;
  if(event.key === "ArrowLeft") openLetter(currentLetter - 1);
  if(event.key === "ArrowRight") openLetter(currentLetter + 1);
});

