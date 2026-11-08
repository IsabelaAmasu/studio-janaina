/* ==========================================================================
   Studio Janaina Oficiall — Landing Page
   JavaScript puro (sem bibliotecas).

   1. Fotos ausentes (placeholder)
   2. Menu mobile
   3. Rolagem suave nos links âncora
   4. Animação de entrada ao rolar
   5. Ano do rodapé
   ========================================================================== */

(function () {
  'use strict';

  /* 1. FOTOS AUSENTES ----------------------------------------------------
     Se uma foto de img/ ainda não existir (ou falhar ao carregar), ela é
     escondida e o quadro mostra um fundo roxo com o texto "Foto do portfólio". */
  document.querySelectorAll('img[data-photo]').forEach(function (img) {
    function markMissing() {
      img.classList.add('is-missing');
    }

    img.addEventListener('error', markMissing);

    // A imagem pode já ter falhado antes deste script rodar
    if (img.complete && img.naturalWidth === 0) {
      markMissing();
    }
  });

  /* 2. MENU MOBILE ------------------------------------------------------- */
  var menuButton = document.getElementById('mobile-menu-button');
  var menu = document.getElementById('mobile-menu');

  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  }

  menuButton.addEventListener('click', function () {
    setMenu(!menu.classList.contains('is-open'));
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', function (e) {
    if (!menuButton.contains(e.target) && !menu.contains(e.target)) {
      setMenu(false);
    }
  });

  // Fecha ao tocar em um link do menu
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
    });
  });

  /* 3. ROLAGEM SUAVE ----------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* 4. ANIMAÇÃO DE ENTRADA ----------------------------------------------
     Adiciona .is-visible (uma única vez) quando o elemento .reveal chega
     a 100px da parte inferior da tela. */
  var revealItems = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -100px 0px' });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // Navegadores antigos: mostra tudo sem animar
    revealItems.forEach(function (item) {
      item.classList.add('is-visible');
    });
  }

  /* 5. ANO DO RODAPÉ ----------------------------------------------------- */
  var year = document.getElementById('current-year');
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }
})();

document.addEventListener("DOMContentLoaded", function () {
    const viewport = document.querySelector(".reviews__viewport");
    const track = document.getElementById("reviewsTrack");

    if (viewport && track) {
        // Clona os elementos da faixa para preencher o loop infinito perfeitamente
        const items = Array.from(track.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            clone.classList.add("review-card--clone");
            track.appendChild(clone);
        });

        // Ativa as classes que iniciam a animação via CSS
        viewport.classList.add("is-ready");
    }
});