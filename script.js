const marker = document.querySelector('a-marker');

const models = [
  { id: '#bookModel' },
  { id: '#cameraModel' },
  { id: '#headsetModel' },
  { id: '#laptopModel' },
  { id: '#microphoneModel' },
  { id: '#paletteModel' },
  { id: '#pencilModel' }
];

function randomPosition() {
  const x = (Math.random() - 0.5) * 4;
  const y = Math.random() * 2 + 0.2;
  const z = (Math.random() - 0.5) * 4;
  return { x, y, z };
}

function randomRotation() {
  const x = Math.random() * 360;
  const y = Math.random() * 360;
  const z = Math.random() * 360;
  return { x, y, z };
}

for (let i = 0; i < 10; i++) {
  const modelData = models[Math.floor(Math.random() * models.length)];
  const entity = document.createElement('a-entity');

  entity.setAttribute('gltf-model', modelData.id);

  // zufällige Skalierung
  const scale = (Math.random() * 0.4 + 0.2).toFixed(2);
  entity.setAttribute('scale', `${scale} ${scale} ${scale}`);

  // zufällige Position
  const pos = randomPosition();
  entity.setAttribute('position', pos);

  // zufällige Rotation
  const rot = randomRotation();
  entity.setAttribute('rotation', rot);

  // animation-mixer falls vorhanden
  entity.setAttribute('animation-mixer', '');

  // Schweben: Position Animation auf Y-Achse
  entity.setAttribute('animation', {
    property: 'position',
    dir: 'alternate',
    dur: 3000 + Math.random() * 2000,
    easing: 'easeInOutSine',
    loop: true,
    to: { x: pos.x, y: pos.y + 0.5, z: pos.z }
  });

  // Rotation Animation um Y-Achse
  entity.setAttribute('animation__rotate', {
    property: 'rotation',
    to: { x: rot.x, y: rot.y + 360, z: rot.z },
    dur: 10000 + Math.random() * 5000,
    loop: true,
    easing: 'linear'
  });

  marker.appendChild(entity);
}