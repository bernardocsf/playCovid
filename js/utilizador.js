document.addEventListener("DOMContentLoaded", () => {
  const utilizadores = JSON.parse(localStorage.getItem("userList"));
  const lastLogado = localStorage.getItem("lastLoggedInUser");

  if (!lastLogado) {
    window.location.href = "index.html";
    return;
  } else {
    const user = utilizadores.find((user) => user.userName === lastLogado);

    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("lastLoggedInUser");
      window.location.href = "index.html";
    });

    class Overlay {
      constructor(targetElement) {
        this.targetElement = targetElement;
        this.overlay = this.createOverlay();
      }

      createOverlay() {
        const overlay = document.createElement("div");
        overlay.classList.add("overlay");

        const content = document.createElement("div");
        content.classList.add("overlay-content");

        overlay.appendChild(content);
        /* this.targetElement.appendChild(overlay); */
        this.targetElement.insertBefore(overlay, this.targetElement.firstChild);

        return overlay;
      }

      show(contentHtml, callBack) {
        const content = this.overlay.querySelector(".overlay-content");
        content.innerHTML = contentHtml;

        const buttonJogar = document.getElementById("jogar");
        if (buttonJogar && typeof callBack === "function") {
          buttonJogar.addEventListener("click", callBack);
        }
        this.overlay.classList.add("active");
      }

      hide() {
        this.overlay.classList.remove("active");
      }
    }

    const matchCovid = document.querySelector(".matchCovid");
    const overlayMatchCovid = new Overlay(matchCovid);
    const moves = document.getElementById("moves");
    const time = document.getElementById("timer");

    const symbols = ["💉", "😷", "🧼", "🚑", "🦠", "🤢", "🏠", "🤒"];
    let arraySymbols = [...symbols, ...symbols];
    let firstCard = null;
    let lockBoard = false;
    let jogadas = 0;
    let timeSeconds = 0;
    let timeInterval = null;

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }

    function createCards() {
      const shuffledCards = shuffleArray(arraySymbols);
      shuffledCards.forEach((symbol) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
          <div class="card-inner">
              <div class="card-front">${symbol}</div>
              <div class="card-back"></div>
          </div>`;
        card.addEventListener("click", () => flipCard(card));
        matchCovid.appendChild(card);
      });
    }

    function flipCard(card) {
      if (lockBoard || card === firstCard || card.classList.contains("flipped"))
        return;

      card.classList.add("flipped");

      if (jogadas === 0 && timeInterval === null) {
        startTimer();
      }

      if (!firstCard) {
        firstCard = card;
        return;
      }
      checkForMatch(card);
    }

    function checkForMatch(secondCard) {
      jogadas++;
      updatesJogadas();

      const isMatch =
        firstCard.querySelector(".card-front").textContent ===
        secondCard.querySelector(".card-front").textContent;

      if (isMatch) {
        disabledCards(firstCard, secondCard);
      } else {
        unflipCard(firstCard, secondCard);
      }
      firstCard = null;
    }

    function updatesJogadas() {
      moves.textContent = jogadas;

      if (jogadas > 20) {
        moves.style.color = "red";
      } else if (jogadas > 15) {
        moves.style.color = "yellow";
      }
    }

    function startTimer() {
      timeInterval = setInterval(() => {
        timeSeconds++;
        const minutes = Math.floor(timeSeconds / 60);
        const seconds = timeSeconds % 60;

        time.textContent = `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
      }, 1000);
    }

    function stopTimer() {
      clearInterval(timeInterval);
      timeInterval = null;
    }

    function disabledCards(card1, card2) {
      setTimeout(() => {
        card1.classList.add("matched");
        card2.classList.add("matched");
        card1.removeEventListener("click", () => flipCard(card1));
        card2.removeEventListener("click", () => flipCard(card2));

        const matchedCards = document.querySelectorAll(".flipped");

        if (matchedCards.length == arraySymbols.length) {
          stopTimer();

          user.jogosCompletos++;

          const totalTime =
            user.averageTime * (user.jogosCompletos - 1) + timeSeconds;
          user.averageTime = totalTime / user.jogosCompletos;

          const updatesUsers = utilizadores.map((u) => {
            if (u.userName === user.userName) {
              u.jogosCompletos = user.jogosCompletos;
              u.averageTime = user.averageTime;
            }
            return u;
          });

          localStorage.setItem("userList", JSON.stringify(updatesUsers));

          showStartOverlay();
        }
      }, 500);
    }

    function unflipCard(card1, card2) {
      lockBoard = true;
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        lockBoard = false;
      }, 1000);
    }

    overlayMatchCovid.show(
      `
          <button id="jogar" class="buttonJogar">Jogar</button>
          <button class="buttonEstatisticas">As minhas estatísticas</button>`,
      () => {
        overlayMatchCovid.hide();
      }
    );

    let valueEstatisticas = false;
    const buttonEstatisticas = document.querySelector(".buttonEstatisticas");
    buttonEstatisticas.addEventListener("click", () => {
      const content =
        overlayMatchCovid.overlay.querySelector(".overlay-content");
      let estatisticasDiv = document.querySelector(".estatisticas");

      if (!valueEstatisticas) {
        valueEstatisticas = true;
        if (!estatisticasDiv) {
          estatisticasDiv = document.createElement("div");
          estatisticasDiv.classList.add("estatisticas");
          const averageTimeForm = user.averageTime.toFixed(1);
          estatisticasDiv.innerHTML = `<p>Já completei ${user.jogosCompletos} jogos
              com uma duração média de ${averageTimeForm} segundos por jogo!`;
          content.appendChild(estatisticasDiv);
        }
      } else {
        valueEstatisticas = false;
        if (estatisticasDiv) {
          estatisticasDiv.remove();
        }
      }
    });
    createCards();
  }
});