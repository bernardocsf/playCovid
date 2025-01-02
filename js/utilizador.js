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

      show(contentHtml) {
        const content = this.overlay.querySelector(".overlay-content");
        content.innerHTML = contentHtml;
        this.overlay.classList.add("active");
      }

      hide() {
        this.overlay.classList.remove("active");
      }
    }

    const matchCovid = document.querySelector(".matchCovid");
    const overlayMatchCovid = new Overlay(matchCovid);
    const overlayCongrats = new Overlay(matchCovid);
    const moves = document.getElementById("moves");
    const time = document.getElementById("timer");
    const xpsCount = document.getElementById("xpsCount");

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
      moves.textContent = jogadas;

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

          if (jogadas <= 8) {
            user.xps += 25;
          } else if (jogadas <= 12) {
            user.xps += 20;
          } else if (jogadas <= 15) {
            user.xps += 10;
          } else {
            user.xps += 5;
          }

          const totalTime =
            user.averageTime * (user.jogosCompletos - 1) + timeSeconds;
          user.averageTime = totalTime / user.jogosCompletos;

          const updatesUsers = utilizadores.map((u) => {
            if (u.userName === user.userName) {
              u.jogosCompletos = user.jogosCompletos;
              u.averageTime = user.averageTime;
              u.xps = user.xps;
              u.xpsTotal = user.xps;
            }
            return u;
          });

          localStorage.setItem("userList", JSON.stringify(updatesUsers));

          xpsCountUpd();
          showOverlayCongrats();
          classTable();
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

    function showOverlayMatchCovid() {
      overlayMatchCovid.show(
        `
          <button id="closeOverlay" class="buttonFecharOverlay">Jogar</button>
          <button class="buttonEstatisticas">As minhas estatísticas</button>`
      );

      let valueEstatisticas = false;

      overlayMatchCovid.overlay.addEventListener("click", (event) => {
        if (event.target.id === "closeOverlay") {
          overlayMatchCovid.hide();
        } else if (event.target.classList.contains("buttonEstatisticas")) {
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
                  com uma duração média de ${averageTimeForm} segundos por jogo!</p>`;
              content.appendChild(estatisticasDiv);
            }
          } else {
            valueEstatisticas = false;
            if (estatisticasDiv) {
              estatisticasDiv.remove();
            }
          }
        }
      });
    }

    function showOverlayCongrats() {
      overlayCongrats.show(`
        <h1>Parabéns!</h1> 
        <h3>Completou o MatchCovid com ${jogadas} jogadas!</h3>
        <button id="closeOverlay" class="buttonFecharOverlay">Fechar</button>
      `);

      overlayCongrats.overlay.addEventListener("click", (event) => {
        if (event.target.id === "closeOverlay") {
          overlayCongrats.hide();
          resetMatchCovid();
        }
      });
    }

    function resetMatchCovid() {
      jogadas = 0;
      timeSeconds = 0;
      moves.textContent = jogadas;
      time.textContent = "00:00";
      clearInterval(timeInterval);
      timeInterval = null;

      const cards = matchCovid.querySelectorAll(".card");
      cards.forEach((card) => card.remove());
      createCards();

      showOverlayMatchCovid();
    }

    showOverlayMatchCovid();
    createCards();

    function xpsCountUpd() {
      xpsCount.textContent = user.xps;
    }

    function createCardsList() {
      symbols.forEach((symbolList) => {
        const symbol = document.createElement("div");
        symbol.classList.add("card");
        symbol.innerHTML = `
          <div class="card-inner">
            <div class="card-front">${symbolList}</div>
            <div class="card-back"></div>
          </div>`;

        if (user.cardsBought.includes(symbolList)) {
          symbol.classList.add("flipped");
        }
        symbol.addEventListener("click", () => buyCard(symbol));
        cardsList.appendChild(symbol);
      });

      if (user.cardsBought.length === 0) {
        showOverlayCardsList();
      }
    }

    function buyCard(symbol) {
      const symbolBought = symbol.querySelector(".card-front").textContent;

      if (user.xps < 15) {
        alert("Não tens XPs suficiente!");
        return;
      }

      if (user.cardsBought.includes(symbolBought)) {
        alert("Esse card já foi comprado!");
        return;
      }

      user.cardsBought.push(symbolBought);
      user.xps -= 15;

      const userUpdate = utilizadores.map((u) =>
        u.userName === user.userName
          ? { ...u, xps: user.xps, cardsBought: user.cardsBought }
          : u
      );
      localStorage.setItem("userList", JSON.stringify(userUpdate));

      symbol.classList.add("flipped");
      xpsCountUpd();
    }

    const cardsList = document.querySelector(".cardsList");
    const overlayCardsList = new Overlay(cardsList);

    function showOverlayCardsList() {
      overlayCardsList.show(`
        <h2>Coleciona os teus cards!</h2>
        <p>Este espaço é reservado para a compra de cards. Em cada compra, o jogador recebe uma informação do respetivo card.</p>
        <button id="closeOverlay" class="buttonFecharOverlay">Fechar informação</button>`);

      overlayCardsList.overlay.addEventListener("click", (event) => {
        if (event.target.id === "closeOverlay") {
          overlayCardsList.hide();
        }
      });
    }

    xpsCountUpd();
    createCardsList();

    function classTable() {
      const classTableBody = document.querySelector(".classTable tbody");
      let rowsHtml = "";

      utilizadores.sort((a, b) => b.xpsTotal - a.xpsTotal);

      utilizadores.forEach((utilizador, index) => {
        rowsHtml += `
          <tr>
            <td>${index + 1}</td>
            <td>${utilizador.nome}</td>
            <td>${utilizador.xpsTotal}</td>
          </tr>
        `;
      });

      classTableBody.innerHTML = rowsHtml;
    }

    classTable();
  }
});
