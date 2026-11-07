const acordeons = [...document.querySelectorAll('.acordeon')];

function setOpen(acordeon, open) {
    const trigger = acordeon.querySelector('.trigger');
    acordeon.classList.toggle('open', open);
    trigger.setAttribute('aria-expanded', String(open));
}

let interactionStarted = false;

acordeons.forEach((acordeon) => {
    const trigger = acordeon.querySelector('.trigger');
    trigger.setAttribute('aria-expanded', acordeon.classList.contains('open') ? 'true' : 'false');
    trigger.addEventListener('click', () => {
        interactionStarted = true;
        setOpen(acordeon, !acordeon.classList.contains('open'));
    });
});

// Reveal each original section as the character walks past it.
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    acordeons.forEach((acordeon, index) => {
        window.setTimeout(() => {
            if (interactionStarted) return;
            acordeons.forEach((item) => setOpen(item, false));
            setOpen(acordeon, true);
            window.setTimeout(() => setOpen(acordeon, false), 1050);
        }, 650 + index * 1200);
    });
}
