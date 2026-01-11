document.addEventListener('DOMContentLoaded', () => {

    const videos = {
        "1. The Legend of Zelda: Ocarina of Time": "IIyJOp44uS4",
        "2. The Legend of Zelda: Breath of the Wild": "zw47_q9wbBE",
        "3. Super Mario Bros.": "rLjc567VDn8",
        "4. Minecraft": "MmB9b5njVbA",
        "5. GTA V": "QkkoHAzjnUs",
        "6. The Witcher 3: Wild Hunt": "c0i88t0K2k0",
        "7. Red Dead Redemption 2": "eaW0tYpxyp0",
        "8. Dark Souls": "93LFz_j5fQA",
        "9. Skyrim": "JSRtYpNRoN0",
        "10. Tetris": "-QX7FJg2FYY",
        "11. Half-Life 2": "ID1d4F040jQ",
        "12. Portal 2": "tax4e4hBBZc",
        "13. Bloodborne": "G203e1HhixY",
        "14. Metal Gear Solid": "uXcWcnX2B4k",
        "15. Final Fantasy VII": "I_U5bT3iJjo",
        "16. Resident Evil 4": "MYSj1v0479A",
        "17. Super Mario World": "D604uP1yH-4",
        "18. Doom": "iZ9iflvCwok",
        "19. Chrono Trigger": "TranL41X2pM",
        "20. World of Warcraft": "vlVSJ0AvZe0",
        "21. League of Legends": "mDYqT0_9VR4",
        "22. Counter-Strike": "edYCtaNueQY",
        "23. Pokémon Red & Blue": "fH50w7hPax4",
        "24. Halo: Combat Evolved": "4sHksYvM6Yg",
        "25. Elden Ring": "E3Huy2cdih0"
    };

    const targetes = document.querySelectorAll('.targetaJoc > div, #consoles div div');
    const buscador = document.getElementById('buscador');
    const botonsFiltre = document.querySelectorAll('.filtre');

    if (buscador) {
        buscador.addEventListener('keyup', (e) => {
            const text = e.target.value.toLowerCase();
            targetes.forEach(joc => {
                const titol = joc.querySelector('h3').innerText.toLowerCase();
                joc.style.display = titol.includes(text) ? 'block' : 'none';
            });
        });
    }

    botonsFiltre.forEach(btn => {
        btn.addEventListener('click', () => {
            botonsFiltre.forEach(b => b.classList.remove('actiu'));
            btn.classList.add('actiu');

            const categoria = btn.getAttribute('data-filter');
            
            targetes.forEach(joc => {
                const targeta = joc.getAttribute('categoria');
                if (categoria == 'tots' || targeta == categoria) {
                    joc.style.display = 'block';
                } else {
                    joc.style.display = 'none';
                }
            });
        });
    });

    document.querySelectorAll('button').forEach(boto => {
        boto.addEventListener('click', () => {
            const targeta = boto.parentElement;
            const text = boto.innerText;

            if (text == "Informació") {
                const url = targeta.getAttribute('enllac');
                if (url) window.open(url, '_blank');
            }
            else if (text == "Vídeo") {
                const titol = targeta.querySelector('h3').innerText; 
                const id = videos[titol];
                
                if (id) {
                    mostrarContingut(targeta, `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allowfullscreen></iframe>`);
                } else {
                    alert("Vídeo no trobat");
                }
            }
            else if (text == "Imatge") {
                const img = targeta.getAttribute('imatge');
                if (img) {
                    mostrarContingut(targeta, `<img src="${img}" style="width:100%">`);
                }
            }
        });
    });

    function mostrarContingut(targeta, htmlNou) {
        if (targeta.classList.contains('targeta-expandida')) return; 

        targeta.classList.add('targeta-expandida');
        
        const div = document.createElement('div');
        div.className = 'contenidor-expandit';
        div.innerHTML = htmlNou + '<button class="boto-tancar">Tancar</button>';
        
        div.querySelector('.boto-tancar').onclick = () => {
            div.remove();
            targeta.classList.remove('targeta-expandida');
            
            const imgMini = targeta.querySelector('.img-mini-flotant');
            if (imgMini) imgMini.remove();
        };

        targeta.appendChild(div);
    }

    if (document.getElementById('jocs')) {
        targetes.forEach(card => {
            card.addEventListener('mouseenter', () => {
                if (card.classList.contains('targeta-expandida') || card.querySelector('.img-mini-flotant')) return;

                const src = card.getAttribute('imatge');
                if (src) {
                    const img = document.createElement('img');
                    img.src = src;
                    img.className = 'img-mini-flotant';
                    const primerBoto = card.querySelector('button');
                    card.insertBefore(img, primerBoto); 
                }
            });

            card.addEventListener('mouseleave', () => {
                const img = card.querySelector('.img-mini-flotant');
                if (img) img.remove();
            });
        });
    }

});