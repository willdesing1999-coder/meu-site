const inicio = new Date("2024-06-12T00:00:00");

let cartaAberta = false;
let bloqueioCarta = false;
let musicaIniciada = false;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

/* =========================
   MÚSICA SEGURA
========================= */
function tocarMusica(){
    const audio = document.getElementById("musicaFundo");
    if(!audio || musicaIniciada) return;

    audio.volume = 0.4;
    audio.play().catch(()=>{});

    musicaIniciada = true;
}

/* =========================
   SCROLL SEGURO
========================= */
function ir(el){
    if(!el) return;
    el.scrollIntoView({
        behavior:"smooth",
        block:"center"
    });
}

/* =========================
   CARTA
========================= */
document.addEventListener("DOMContentLoaded", ()=>{

    const btnCarta = document.getElementById("abrirCarta");
    const conteudoCarta = document.getElementById("conteudoCarta");

    if(btnCarta && conteudoCarta){
        btnCarta.addEventListener("click", ()=>{
            conteudoCarta.classList.add("aberta");
            btnCarta.style.display = "none";

            cartaAberta = true;
            bloqueioCarta = true;

            ir(conteudoCarta);

            setTimeout(()=>{
                bloqueioCarta = false;
            },15000);
        });
    }

    const btn = document.getElementById("abrirHistoria");
    const transicao = document.getElementById("transicao");

    if(!btn){
        console.error("Botão abrirHistoria não encontrado");
        return;
    }

    btn.addEventListener("click",(e)=>{
        e.preventDefault();

        tocarMusica();

        if(transicao){
            transicao.classList.add("ativa");

            setTimeout(()=>{
                transicao.classList.remove("ativa");
            },1200);
        }

        iniciarCenas();
    });
});

/* =========================
   CENAS SEGURAS
========================= */
async function iniciarCenas(){

    const declaracao = document.getElementById("declaracao");
    const contador = document.querySelector(".contador");
    const galeria = document.querySelector(".galeria");
    const timeline = document.querySelector(".timeline");
    const carta = document.querySelector(".carta");
    const final = document.querySelector(".final");

    if(declaracao){ ir(declaracao); await sleep(4000); }
    if(contador){ ir(contador); await sleep(4000); }

    if(galeria){
        const fotos = galeria.querySelectorAll(".memoria");
        for(const f of fotos){
            ir(f);
            await sleep(3000);
        }
    }

    if(timeline){ ir(timeline); await sleep(4000); }

    if(carta){
        ir(carta);

        let t = 0;

        while(t < 5000 && !cartaAberta){
            await sleep(500);
            t += 500;
        }

        while(bloqueioCarta){
            await sleep(300);
        }
    }

    if(final){
        ir(final);
        await sleep(5000);
    }
}