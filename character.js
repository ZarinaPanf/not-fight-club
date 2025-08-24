const playerName = localStorage.getItem("characterName") || "Unknown Hero";
const wins = localStorage.getItem("wins") || 0;
const loses = localStorage.getItem("loses") || 0;
const avatar = localStorage.getItem("avatar") || "./characters/mario.png";

document.getElementById("playerName").textContent = playerName;
document.getElementById("wins").textContent = wins;
document.getElementById("loses").textContent = loses;
document.getElementById("avatar").src = avatar;

const modal = document.getElementById("avatarModal");
const openBtn = document.getElementById("changeAvatarBtn");
const closeBtn = document.getElementById("closeModal");
const avatarOptions = document.querySelectorAll(".avatar-option");

openBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

avatarOptions.forEach(img => {
  img.addEventListener("click", () => {
    document.getElementById("avatar").src = img.src;
    localStorage.setItem("avatar", img.src);
    modal.style.display = "none";
  });
});
