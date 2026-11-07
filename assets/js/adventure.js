const stations = [...document.querySelectorAll('.station')];
const panels = [...document.querySelectorAll('.panel')];
const runner = document.querySelector('.runner');
const stageNumber = document.querySelector('.stage-number');
let userTookControl = false;

function openStage(index) {
    stations.forEach((station, stationIndex) => {
        const active = stationIndex === index;
        station.classList.toggle('is-active', active);
        station.setAttribute('aria-expanded', String(active));
    });

    panels.forEach((panel, panelIndex) => {
        const active = panelIndex === index;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
    });

    const x = stations[index].style.getPropertyValue('--x');
    runner.style.left = x;
    stageNumber.textContent = String(index + 1).padStart(2, '0');
}

stations.forEach((station, index) => {
    station.addEventListener('click', () => {
        userTookControl = true;
        openStage(index);
    });
});

openStage(0);

// The traveler stops at each block. Its arrival changes the open menu panel.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [500, 2650, 4800, 6950].forEach((arrival, index) => {
        window.setTimeout(() => {
            if (!userTookControl) openStage(index);
        }, arrival);
    });
}
