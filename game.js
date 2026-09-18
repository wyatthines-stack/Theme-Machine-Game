function saveProgress() {
    const gameData = {
        currentLevel,
        xp,
        streak,
        unlockedUpgrades,
        robotName,
        chassisColor,
        glowColor
    };
    localStorage.setItem('themeMachineData', JSON.stringify(gameData));
}

function loadProgress() {
    const saved = localStorage.getItem('themeMachineData');
    if (!saved) return;
    
    const data = JSON.parse(saved);
    currentLevel = data.currentLevel || 1;
    xp = data.xp || 0;
    streak = data.streak || 0;
    unlockedUpgrades = data.unlockedUpgrades || [];
    robotName = data.robotName || "UNIT 5-ELA";
    chassisColor = data.chassisColor || "#475569";
    glowColor = data.glowColor || "#00f3ff";

    // Apply restored settings & visual upgrades
    document.getElementById('custom-name-input').value = robotName;
    updateRobotCustomization();
    setChassisColor(chassisColor);
    setGlowColor(glowColor);

    unlockedUpgrades.forEach(id => {
        const item = ROBOT_UPGRADES.find(u => u.id === id);
        if (item && item.svgId) {
            const elem = document.getElementById(item.svgId);
            if (elem) elem.classList.remove('hidden');
        }
    });
    document.getElementById('equipped-parts-count').innerText = `Upgrades: ${unlockedUpgrades.length}/12`;
}