const settingsModal = document.getElementById("settingsModal");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const closeSettingsBtn = document.getElementById("closeSettings");
const currentName = document.getElementById("currentName");
const editNameBtn = document.getElementById("editNameBtn");
const editNameBlock = document.getElementById("editNameBlock");
const newNameInput = document.getElementById("newNameInput");
const saveNameBtn = document.getElementById("saveNameBtn");

function loadPlayerName() {
  const name = localStorage.getItem("characterName") || "Unknown Hero";
  currentName.textContent = name;
}
loadPlayerName();

openSettingsBtn.addEventListener("click", () => {
  loadPlayerName();
  settingsModal.style.display = "flex";
});

closeSettingsBtn.addEventListener("click", () => {
  settingsModal.style.display = "none";
});

editNameBtn.addEventListener("click", () => {
  editNameBlock.style.display = "block";
  newNameInput.value = currentName.textContent;
});

saveNameBtn.addEventListener("click", () => {
  const newName = newNameInput.value.trim();
  if (newName) {
    localStorage.setItem("characterName", newName);
    loadPlayerName();
    editNameBlock.style.display = "none";

    const playerNameField = document.getElementById("playerName");
    if (playerNameField) {
      playerNameField.textContent = newName;
    }
  }
});
