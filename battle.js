const player = {
    name: "Hero",
    hp: 150,
    damage: 20,
    critChance: 0.2,
    critMultiplier: 1.5
  };

  const enemies = [
    {
      name: "Wario",
      hp: 150,
      damage: 20,
      critChance: 0.15,
      critMultiplier: 1.5,
      attackZones: 1,
      defenceZones: 3,
      img: "./characters/wario.png"
    },
    {
      name: "Bowser",
      hp: 120,
      damage: 15,
      critChance: 0.25,
      critMultiplier: 1.5,
      attackZones: 2,
      defenceZones: 1,
      img: "./characters/bowser.png"
    },
    {
      name: "Toad",
      hp: 140,
      damage: 18,
      critChance: 0.2,
      critMultiplier: 2,
      attackZones: 1,
      defenceZones: 2,
      img: "./characters/toad.png"
    }
  ];

  let enemy = enemies[Math.floor(Math.random() * enemies.length)];
  enemy.currentHp = enemy.hp;
  player.currentHp = player.hp;

  document.getElementById("enemy-name").textContent = enemy.name;
  document.getElementById("enemy-img").src = enemy.img;

  updateHp();

  function updateHp() {
    document.getElementById("player-hp").style.width = `${(player.currentHp / player.hp) * 100}%`;
    document.getElementById("player-hp-text").textContent = `${player.currentHp}/${player.hp}`;

    document.getElementById("enemy-hp").style.width = `${(enemy.currentHp / enemy.hp) * 100}%`;
    document.getElementById("enemy-hp-text").textContent = `${enemy.currentHp}/${enemy.hp}`;
  }

  function randomZones(count) {
    const zones = ["Head", "Neck", "Body", "Belly", "Legs"];
    let result = [];
    while (result.length < count) {
      let zone = zones[Math.floor(Math.random() * zones.length)];
      if (!result.includes(zone)) result.push(zone);
    }
    return result;
  }

  function log(text) {
    const logBox = document.getElementById("log");
    logBox.innerHTML = `<p>${text}</p>` + logBox.innerHTML;
  }

  document.getElementById("battle-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const attackZone = document.querySelector("input[name='attack']:checked");
    const defenceZones = Array.from(document.querySelectorAll("input[name='defence']:checked")).map(el => el.value);

    if (!attackZone || defenceZones.length !== 2) {
      alert("Выберите 1 атаку и ровно 2 защиты!");
      return;
    }

    const playerAttack = attackZone.value;
    const playerDefence = defenceZones;

    const enemyAttacks = randomZones(enemy.attackZones);
    const enemyDefences = randomZones(enemy.defenceZones);

    let damage = player.damage;
    if (Math.random() < player.critChance) {
      damage *= player.critMultiplier;
      log(`${player.name.toUpperCase()} наносит КРИТИЧЕСКИЙ удар!`);
    }
    if (!enemyDefences.includes(playerAttack)) {
      enemy.currentHp -= Math.floor(damage);
      log(`${player.name.toUpperCase()} атаковал ${enemy.name.toUpperCase()} в ${playerAttack} и нанес ${Math.floor(damage)} урона!`);
    } else {
      log(`${player.name.toUpperCase()} атаковал ${enemy.name.toUpperCase()} в ${playerAttack}, но удар был заблокирован!`);
    }

    enemyAttacks.forEach(zone => {
      let eDamage = enemy.damage;
      if (Math.random() < enemy.critChance) {
        eDamage *= enemy.critMultiplier;
        log(`${enemy.name.toUpperCase()} наносит КРИТИЧЕСКИЙ удар!`);
      }
      if (!playerDefence.includes(zone)) {
        player.currentHp -= Math.floor(eDamage);
        log(`${enemy.name.toUpperCase()} атаковал ${player.name.toUpperCase()} в ${zone} и нанес ${Math.floor(eDamage)} урона!`);
      } else {
        log(`${enemy.name.toUpperCase()} атаковал ${player.name.toUpperCase()} в ${zone}, но удар был заблокирован!`);
      }
    });

    updateHp();

    if (player.currentHp <= 0) {
      alert("Вы проиграли!");
      location.reload();
    } else if (enemy.currentHp <= 0) {
      alert("Вы победили!");
      location.reload();
    }
  });
