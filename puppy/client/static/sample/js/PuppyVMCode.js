window['PuppyVMCode'] = {
  world: {
    'width': 1000,
    'height': 1000,
    'xGravity': 0.0,
    'yGravity': 0.05,
    'mouse': true,
    'ticker': { 'x': 10, 'y': 10 },
  },
  bodies: [
    {
      'shape': "circle",
      'concept': ['ボール', '円'],
      'name': 'ボール',
      'width': 100, 'height': 50,
      'position': { 'x': 500, 'y': 500 },
      'angle': 0.2 * Math.PI,
      'render': {
        'fillStyle': 'rgba(11,11,11,0.1)',
        'strokeStyle': 'blue',
        'lineWidth': 10
      },
      'velocity': { x: 1, y: -300 },
      'value': "さかね",
      'isSensor': false,
    },
    {
      'shape': "rectangle",
      'concept': ['X', '壁', '長方形'],
      'isStatic': true,
      'chamfer': true,
      'name': 'X',
      'width': 600,
      'height': 50,
      'slop': 0.1,
      'position': {
        'x': 500,
        'y': 800,
      },
    },
    {
      'shape': "polygon",
      'concept': ['多角形', '正方形'],
      'isStatic': false,
      'chamfer': true,
      'sides': 6,
      'name': '多角形',
      'width': 100,
      'height': 100,
      'position': {
        'x': 400,
        'y': 500,
      },
    },
  ],
  main: function* (Matter,puppy){
    yield console.log("Hi!!!");
    for (const name of ["A", "B", "C", "D", "E"]) {
      yield puppy.vars[name] = puppy.newMatter({shape: 'circle'});
    }
    yield puppy.vars["ボール"].value = "のぶちゃん";
    const ball_clicked = () => {puppy.print("Clicked!")};
    yield puppy.vars["ボール"].clicked = ball_clicked;
    const ball_collision = (me, you) => { puppy.print(you.name) };
    yield puppy.vars["ボール"].collisionStart = ball_collision;
    yield puppy.print("Hello");
    yield puppy.print("Comment");
    puppy.vars['x'] = 1
    const score = (cnt) => 'Score: ' + cnt;
    yield puppy.vars['score'] = puppy.newMatter({shape: 'label', value: score(puppy.vars['x']), position: { x: 60, y: 30 } })
    yield puppy.vars['score'].value = score(++puppy.vars['x'])
    yield puppy.vars['score'].value = score(++puppy.vars['x'])
    yield puppy.vars['score'].value = score(++puppy.vars['x'])
    yield puppy.vars['score'].value = score(++puppy.vars['x'])
    yield puppy.newMatter({shape: 'polygon'})
  },
  errors: [
  ]
}