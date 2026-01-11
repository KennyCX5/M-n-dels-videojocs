document.addEventListener('DOMContentLoaded', () => {

    const videos = {
        "1. The Legend of Zelda: Ocarina of Time": "Jfg6RfClZJg",
        "2. The Legend of Zelda: Breath of the Wild": "zw47_q9wbBE",
        "3. Super Mario Bros.": "dhrLoM6UqGI",
        "4. Minecraft": "MmB9b5njVbA",
        "5. GTA V": "QkkoHAzjnUs",
        "6. The Witcher 3: Wild Hunt": "53MyR_Z3i1w",
        "7. Red Dead Redemption 2": "gmA6MrX81z4",
        "8. Dark Souls": "o1780AqAa20",
        "9. Skyrim": "6umhTJQltak",
        "10. Tetris": "uccXwNSGDNU",
        "11. Half-Life 2": "UKA7JkV51Jw",
        "12. Portal 2": "tax4e4hBBZc",
        "13. Bloodborne": "TmZ5MTIu5hU",
        "14. Metal Gear Solid": "z7fhvnjo-Hs",
        "15. Final Fantasy VII": "utVE4aUKYuY",
        "16. Resident Evil 4": "O75Ip4o1bs8",
        "17. Super Mario World": "-WpgCFSLtLo",
        "18. Doom": "-fsz6b3IBJY",
        "19. Chrono Trigger": "2fl-AylaHY8",
        "20. World of Warcraft": "vlVSJ0AvZe0",
        "21. League of Legends": "IzMnCv_lPxI",
        "22. Counter-Strike": "edYCtaNueQY",
        "23. Pokémon Red & Blue": "PFp23ioZsCI",
        "24. Halo: Combat Evolved": "AMGJ7OMqyvI",
        "25. Elden Ring": "9SOnJrVPHJo"
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