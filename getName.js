const nameInput = document.getElementById("name");
const submitBtn = document.querySelector(".submit");

    submitBtn.addEventListener("click", () => {
        const playerName = nameInput.value.trim();

        if (playerName) {

            localStorage.setItem("characterName", playerName);
            alert("Персонаж создан: " + playerName);

            window.location.href = "main.html";
        } else {
            alert("Введите имя персонажа!");
        }
    });