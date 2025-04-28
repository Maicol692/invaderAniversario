import { Nave } from "./nave.js";
import { Invader } from "./invader.js";
import { Bullet } from "./bullet.js";
import { UI } from "./ui.js";

class Game {
    constructor() {
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");

        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        this.nave = new Nave(this.canvas);
        this.bullets = [];
        this.invaders = [];
        this.keys = {};
        this.spawnTimer = 0;
        this.spawnInterval = 1000;

        this.ui = new UI(this.canvas);

        this.stars = this.createStars(100);

        this.specialMessages = [
            {
                type: "text",
                title: "Paraguay",
                text: "Uy amor esa vez me reí bastante porque de verdad para la geografía soy muy malo, Y TU TAN CONFIADA DIJISTE PARAGUAY UY AMOR, es uno de mis recuerdos favoritos porque te escuche reir bastante me dieron tantas ganas de verte en persona y ver esa sonrisota que tenias, porque de verdad me enamoraste más de lo que ya estaba, tenemos la misma neurona para unas cosas, pero esa vez sentí que eramos uno mismo al reírnos la misma tonteria y fue hermoso"
            },
            {
                type: "text",
                title: "Hiplplen",
                text: "amor se que es tonto, sin embargo amo tu hipo, esa vez me dolio muchísimo la cara de la sonrisa que tenia, me gusto escucharte con ese hipo y mas como te quejabas del hipo, sentí mariposas escucharte, me enamore de ti sin verte, tu ser me enamoro y me atrajo de una forma tan intensa que antes de enamorarme de tu físico me enamore de tu escencia, me enamore de Hellen por quien es y de su hipo."
            },
            {
                type: "text",
                title: "MMM PUES",
                text: "dijiste un 29 de septiembre a las 10 de la noche para que te pasara mi ig y poder hablar de tg, la mejor noche de mi vida, porque conocí al amor de mi vida, y lo mejor es que desde el momento uno ya me regañabas JAJAJAJAJAJ, desde un inicio que es lo más hermoso, me enamoraste contándome el lore de tg, que buena técnica amor, lastima que no podras probarla de nuevo porque sere tu ultimo amor, no planeo dejarte ir nunca, planeo esforzarme para que las cosas salgan bien y nos casemos, si, si nos veo casandonos en un futuro mientras bailamos mientras escuchamos him en el primer baile y en el segundo Morat obvio jijiji"
            },
            {
                type: "text",
                title: "Te llamaría pero seguro estas cansado",
                text: "te juro por lo que más importante que tengo en mi vida y es que me hizo muy feliz ver ese mensaje, sentí una alegría imensa, sentí que te importaba muchísimo con poco tiempo de haber hablado, porque yo ya te quería, yo ya me imaginaba aja juntos, me ilusione muy rápido ser tu pareja porque eres mi tipo literalmente, una loloca con un carácter fuerte, amable y que se preocupa y que dice las cosas como son sin pelos en la lengua, pero a la vez la persona mas dulce y timida posible, pensé que seria imposible encontrar alguien asi y mira, me voy a casar con la persona con tanto soñe, te amo amor y me alegro de haberte conocido."
            },
            {
                type: "text",
                title: "COJANLOS COJANLOS",
                text: "EN MI JUSTIFICACION, AME ESE DIA, ESA NOCHE, ESE INSTANTE SENTI MARIPOSAS, AMOR, que usaras el nosotros uy amor, literal, me emocione muchísimo y en lugar de sentir que me estabas tirando hate me estaba enamorando más, porque nos imagine agarrados de la mano escapando de unos vagabundos juntos JAJAJAJJAJAJAJAJAJJA, te amo y también es un lindo recuerdo que tengo de los dos, fue el 30 de noviembre justo unos días de tu cumpleaños asi que también lo voy a recordar con mucho amor y cariño"
            },
            {
                type: "text",
                title: "¿Y si existe 100 años de seriedad o no?",
                text: "amor esa vez AME ENSERIO LO AMO, preguntaste con tanta inocencia JAJAJAJAJJA, que hermosa toda chiquitita, bonita te amo, me dio mucha ternura, pero aproveche para tirarte jait."
            },
            {
                type: "image",
                image: "img/foto1.jpeg",
                text: "Esta es la primera foto que compartimos juntos, LITERAL DESDE EL INICIO hemos compartido muchas cosas sin llevar meses hablando, me gustaria creer que es porque tuvimos una gran conexión desde un inicio, tal vez haya sido coincidencia, sin embargo, para mi fue y es algo que recuerdo con mucho cariño porque si no era con amigos no había compartido cosas de ese estilo y que mi primera vez compartiendo foto con una mujer haya sido contigo, es lo mejor del mundo, desde ese entonces ya nos decíamos us en videos de gatos y me gusta mucho que aun lo hagamos, porque tu eres el gato naranja y yo el negro, pero tu eres mi luna y yo soy tu sol, porque los dos se necesitan para que el mundo funcione, nuestro mundo funcione, te amo"
            },
            {
                type: "image",
                image: "img/foto2.jpeg",
                text: "Cuando colocaste esa canción de Morat, uy amor, literal JAJAJAJAJJA ya sabia que habias caído, porque odias a Morat y para que lo hicieras e incluso mandarme cap una vez de que la estabas escuchando uyyyy amor, ya sabia yo que no te ibas a resistir, mentiras, nunca pensé que accederías a escuchar, pero lo hiciste e incluso te gusto (primeras veces) por eso te entre todas mis primeras veces a ti y no me arrepiento de hacerlo y nunca lo hare, porque te amo y siempre quise entregar esas pequeñas que para muchos puede ser algo tonto y que no debería tener tanta importancia, pero porque perder el significado, porque no valorar esas (pequeñeces) si es algo que es hermoso con la persona correcta y tu eres mi persona correcta, por eso se que hice bien en confiar en ti y dare todo de mi para que seas feliz"
            },
            {
                type: "image",
                image: "img/foto3.jpeg",
                text: "7 de diciembre, el dia de las velitas, estuviste con tos aun y se acercaban fechas no tan lindas para ti y estaba muy preocupado por ti, porque siempre me preocupe por como te sentias y de tu bienestar, por eso quería prender una velita para ti sin saber los colores, pero si pedi porque tuvieras un buen año y que independientemente de lo que sucediera que fueras muy feliz, que encontras paz y que pudieras afrontar todas esas situaciones con la fuerza asombrosa que siempre vi en ti, que si no eres capaz de ver adelante, pudieras ver una luz y seguir, asi como lo has hecho y siempre lo haras, porque eres una mujer asombrosa que no se deja por nada ni nadie, asi de increíble es mi mujer y ver que tu vela haya durado tanto me dio mucha alegría y que te gustara también."
            },
            {
                type: "image",
                image: "img/foto4.jpeg",
                text: "AJJAJAJJAJAJ SABES MUY BIEN PORQUE ESTA AMOR, es que noviembre fue un mes que no hablamos mucho en especial a la mitad de mes, pero te dio la tos, me contaste hablamos como siempre, hubo hate, preocupaciones, llanto porque alguien no se quería tomar los sobres, pero siempre estuvimos en contacto y muchas risas, por eso aunque odie que te haya durado tanto esa tos y aparte se complicara tanto, ese pequeño detalle hizo que nos varias noches fueran risas, enojos e incluso escucharte mediante audios que te quejabas pero fue muy hermoso, pero que no te pase de nuevo, no quiero verte toser hasta las 2 am MUAAAA"
            },
            {
                type: "image",
                image: "img/foto5.jpeg",
                text: "adoro, que me digas amor y esa primera vez que me lo dijiste fue muy lindo y especial, porque se me aguaron los ojos te lo juro, que casi lloro porque me dijiste amor, me emocione mcho y le tome captura fue inevitable porque me sentí tan feliz y a la vez tan nervioso, porque es la primera vez que me llaman asi y si quería y tenia ilusión de que me llamaran de esa forma, incluso ahora me gusta muchísimo que me digas mi niño, mi amor. mi cejon, se me forma una sonrisa, aunque me haga el rudo y haga como que no me afecta, si lo hace aun, me sigue poniendo nervioso, una gran sonrisa y siento mariposas, sigo sintiendo como si fuera la primera vez y quiero que me llames asi hasta nuestros últimos días, porque quiero que me ames solo a mi, no quiero que tengas otro amor, no quiero que te vuelvas a enamorar, no quiero que sientas lo mismo con alguien más y de la forma mas egosita quiero que vivas por mi y respires por mi, porque yo lo hago por ti mi rarita, quiero hacerte muy feliz y que nadie conozca tu hermosa y honesta forma de amar, quiero que seamos tu y yo por siempre."
            }
        ];
        this.shownMessages = [];

        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));
        this.canvas.addEventListener("click", () => this.shoot());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth * 0.9;
        this.canvas.height = window.innerHeight * 0.8;
    }

    handleKeyDown(event) {
        this.keys[event.key.toLowerCase()] = true;
        if (event.key === " ") {
            this.shoot();
        }
    }

    handleKeyUp(event) {
        this.keys[event.key.toLowerCase()] = false;
    }

    createStars(count) {
        const stars = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2,
                speed: Math.random() * 0.5 + 0.2
            });
        }
        return stars;
    }

    moveStars() {
        for (let star of this.stars) {
            star.y += star.speed;
            if (star.y > this.canvas.height) {
                star.y = 0;
                star.x = Math.random() * this.canvas.width;
            }
        }
    }

    drawStars() {
        this.ctx.fillStyle = "white";
        for (let star of this.stars) {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    shoot() {
        let bullet = new Bullet(this.nave.x + this.nave.width / 2 - 2, this.nave.y);
        this.bullets.push(bullet);
    }

    spawnInvader() {
        const invader = new Invader(this.canvas);
        invader.isSpecial = Math.random() < 0.2;
        this.invaders.push(invader);
    }

    showSpecialMessage() {
        if (this.specialMessages.length === 0) {
            this.endGame();
            return;
        }
    
        const randomIndex = Math.floor(Math.random() * this.specialMessages.length);
        const message = this.specialMessages.splice(randomIndex, 1)[0];
    
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.background = "linear-gradient(135deg, #000000 0%, #4b0000 100%)";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.alignItems = "center";
        modal.style.justifyContent = "flex-start"; // Ahora el contenido empieza arriba
        modal.style.color = "white";
        modal.style.zIndex = "9999";
        modal.style.padding = "50px 20px 20px"; // Espacio arriba
        modal.style.animation = "fadeIn 1s ease forwards";
        modal.style.overflowY = "auto"; // Scroll si el contenido es largo
        modal.style.boxSizing = "border-box";
    
        const content = document.createElement("div");
        content.style.background = "rgba(0, 0, 0, 0.6)";
        content.style.borderRadius = "20px";
        content.style.padding = "30px";
        content.style.maxWidth = "700px";
        content.style.width = "90%";
        content.style.display = "flex";
        content.style.flexDirection = "column";
        content.style.alignItems = "center";
        content.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.5)";
        content.style.textAlign = "center";
    
        if (message.type === "text") {
            content.innerHTML = `
                <h1 style="font-size: 2.2rem; font-weight: bold; margin-bottom: 20px; text-shadow: 2px 2px 5px rgba(0,0,0,0.5);">${message.title}</h1>
                <p style="font-size: 1.3rem; max-width: 600px; margin-bottom: 20px; text-shadow: 1px 1px 4px rgba(0,0,0,0.4);">${message.text}</p>
            `;
        } else if (message.type === "image") {
            content.innerHTML = `
                <h1 style="font-size: 2.2rem; font-weight: bold; margin-bottom: 20px; text-shadow: 2px 2px 5px rgba(0,0,0,0.5);">Foto Especial</h1>
                <p style="font-size: 1.3rem; max-width: 600px; margin-bottom: 20px; text-shadow: 1px 1px 4px rgba(0,0,0,0.4);">${message.text}</p>
                <img src="${message.image}" alt="Foto Especial" style="max-width: 100%; height: auto; border-radius: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.5); margin-top: 20px;">
            `;
        }
    
        const closeButton = document.createElement("button");
        closeButton.id = "closeModal";
        closeButton.textContent = "Cerrar";
        closeButton.style.marginTop = "20px";
        closeButton.style.padding = "12px 24px";
        closeButton.style.fontSize = "1.2rem";
        closeButton.style.cursor = "pointer";
        closeButton.style.background = "#ff6f91";
        closeButton.style.border = "none";
        closeButton.style.borderRadius = "10px";
        closeButton.style.color = "white";
        closeButton.style.transition = "background 0.3s";
    
        closeButton.onmouseover = () => closeButton.style.background = "#ff4e73";
        closeButton.onmouseout = () => closeButton.style.background = "#ff6f91";
    
        closeButton.onclick = () => {
            modal.style.animation = "fadeOut 1s ease forwards";
            setTimeout(() => {
                modal.remove();
                if (this.specialMessages.length === 0) {
                    this.endGame();
                }
            }, 1000);
        };
    
        content.appendChild(closeButton);
        modal.appendChild(content);
        document.body.appendChild(modal);
    }
    

    endGame() {
        const finalModal = document.createElement("div");
        finalModal.style.position = "fixed";
        finalModal.style.top = "0";
        finalModal.style.left = "0";
        finalModal.style.width = "100%";
        finalModal.style.height = "100%";
        finalModal.style.background = "radial-gradient(circle, #000000, #4b0000)";
        finalModal.style.display = "flex";
        finalModal.style.flexDirection = "column";
        finalModal.style.justifyContent = "center";
        finalModal.style.alignItems = "center";
        finalModal.style.color = "white";
        finalModal.style.zIndex = "9999";
        finalModal.style.padding = "20px";
        finalModal.style.animation = "zoomIn 1s ease forwards";
        finalModal.innerHTML = `
            <h1 style="font-size: 3rem; font-weight: bold; text-align: center; text-shadow: 3px 3px 8px rgba(0,0,0,0.6); margin-bottom: 20px;">
                Fue un pequeño juego para recordar unos momentos felices y especiales que tuvimos juntos
            </h1>
            <p style="font-size: 1.8rem; text-align: center; max-width: 700px; text-shadow: 2px 2px 6px rgba(0,0,0,0.4);">
                ¡Siempre te amaré sin importar nada! estare siempre a tu lado y nunca me voy alejar 
            </p>
        `;

        document.body.appendChild(finalModal);
    }

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.moveStars();
        this.drawStars();

        const left = this.keys["arrowleft"] || this.keys["a"];
        const right = this.keys["arrowright"] || this.keys["d"];
        const up = this.keys["arrowup"] || this.keys["w"];
        const down = this.keys["arrowdown"] || this.keys["s"];
        this.nave.move(left, right, up, down);
        this.nave.draw();

        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.move();
            bullet.draw(this.ctx);

            if (bullet.y + bullet.height < 0) {
                this.bullets.splice(i, 1);
            }
        }

        for (let i = this.invaders.length - 1; i >= 0; i--) {
            const invader = this.invaders[i];
            invader.move();
            invader.draw();

            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bullet = this.bullets[j];
                if (
                    bullet.x < invader.x + invader.width &&
                    bullet.x + bullet.width > invader.x &&
                    bullet.y < invader.y + invader.height &&
                    bullet.y + bullet.height > invader.y
                ) {
                    if (invader.isSpecial) {
                        this.showSpecialMessage();
                    } else {
                        this.ui.score += 100;
                    }
                    this.invaders.splice(i, 1);
                    this.bullets.splice(j, 1);
                    break;
                }
            }

            if (invader.y > this.canvas.height) {
                this.invaders.splice(i, 1);
            }
        }

        if (Date.now() - this.spawnTimer > this.spawnInterval) {
            this.spawnInvader();
            this.spawnTimer = Date.now();
        }

        this.ui.updateScore(this.ctx);

        requestAnimationFrame(() => this.update());
    }

    start() {
        this.spawnTimer = Date.now();
        this.update();
    }
}

const game = new Game();
game.start();

/* Animaciones CSS */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
}

@keyframes zoomIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}
`;
document.head.appendChild(style);

