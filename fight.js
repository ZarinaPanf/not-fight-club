document.getElementById("startBtn").addEventListener("click", () => {
    const fightData = {
      id: Date.now(),
      player: localStorage.getItem("characterName") || "Unknown Hero",
      enemy: "Dark Lord"
    };
    localStorage.setItem("currentFight", JSON.stringify(fightData));
    window.location.href = "./battle.html";
  });