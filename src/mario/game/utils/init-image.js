const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = (err) => reject(err);
    image.src = url;
  });
};

const initBasePersonImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/persons/base/static/static.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/jump/jump-back.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/jump/jump-front.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/front/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/front/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/front/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/back/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/back/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/back/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/base/die/die.png"),
  ]);
};

const initBigPersonImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/persons/big/static/index.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/jump/back.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/jump/index.png"),

    loadImage("https://hhzzcc.github.io/imgs/persons/big/front/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/front/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/front/frame-3.gif"),

    loadImage("https://hhzzcc.github.io/imgs/persons/big/back/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/back/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/big/back/frame-3.gif"),
  ]);
};

const initBulletPersonImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/static/index.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/jump/back.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/jump/index.png"),

    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/front/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/front/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/front/frame-3.gif"),

    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/back/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/back/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/back/frame-3.gif"),

    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/bullet/back.png"),
    loadImage("https://hhzzcc.github.io/imgs/persons/bullet/bullet/index.png"),
  ]);
};

const initMushRoomsImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/mushroom/grow/grow.png"),
    loadImage("https://hhzzcc.github.io/imgs/mushroom/bad/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/mushroom/bad/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/mushroom/bad/die.gif"),
  ]);
};

const initBuildingImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-4.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-5.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/frame-6.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/ask/nothing.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/land/land.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/stone/stone.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/rock/rock.png"),

    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-4.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-5.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/gold/frame-6.gif"),

    loadImage("https://hhzzcc.github.io/imgs/building/flow/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/flow/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/flow/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/building/flow/frame-4.gif"),

    loadImage("https://hhzzcc.github.io/imgs/building/pipe/pipelineL.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/pipe/pipelineR.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/pipe/pipelineTopL.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/pipe/pipelineTopR.png"),

    loadImage("https://hhzzcc.github.io/imgs/building/win/flag.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/win/round.png"),
    loadImage("https://hhzzcc.github.io/imgs/building/win/rod.png"),
  ]);
};

const initBulletImages = () => {
  return Promise.all([
    loadImage("https://hhzzcc.github.io/imgs/bullet/frame-1.gif"),
    loadImage("https://hhzzcc.github.io/imgs/bullet/frame-2.gif"),
    loadImage("https://hhzzcc.github.io/imgs/bullet/frame-3.gif"),
    loadImage("https://hhzzcc.github.io/imgs/bullet/frame-4.gif"),
  ]);
};

const initSceneImages = () => {
  return loadImage("https://hhzzcc.github.io/imgs/scene/background.jpg");
};

export const initImages = async () => {
  const [
    basePersonStatic,
    basePersonTopLeft,
    basePersonTopRight,
    basePersonRightFrame0,
    basePersonRightFrame1,
    basePersonRightFrame2,
    basePersonLeftFrame0,
    basePersonLeftFrame1,
    basePersonLeftFrame2,
    basePersonDeath,
  ] = await initBasePersonImages();

  const [
    bigPersonStatic,
    bigPersonTopLeft,
    bigPersonTopRight,
    bigPersonRightFrame0,
    bigPersonRightFrame1,
    bigPersonRightFrame2,
    bigPersonLeftFrame0,
    bigPersonLeftFrame1,
    bigPersonLeftFrame2,
  ] = await initBigPersonImages();

  const [
    bulletPersonStatic,
    bulletPersonTopLeft,
    bulletPersonTopRight,
    bulletPersonRightFrame0,
    bulletPersonRightFrame1,
    bulletPersonRightFrame2,
    bulletPersonLeftFrame0,
    bulletPersonLeftFrame1,
    bulletPersonLeftFrame2,
    bulletPersonBulletLeft,
    bulletPersonBulletRight,
  ] = await initBulletPersonImages();

  // 蘑菇
  const [
    mushroomGrow,
    mushroomBadFrame0,
    mushroomBadFrame1,
    mushroomBadDie,
  ] = await initMushRoomsImages();

  // 建筑
  const [
    buildingAskFrame0,
    buildingAskFrame1,
    buildingAskFrame2,
    buildingAskFrame3,
    buildingAskFrame4,
    buildingAskFrame5,

    buildingNothing,
    buildingLand,
    buildingStone,
    buildingRock,

    buildingGoldFrame0,
    buildingGoldFrame1,
    buildingGoldFrame2,
    buildingGoldFrame3,
    buildingGoldFrame4,
    buildingGoldFrame5,

    buildingFlowFrame0,
    buildingFlowFrame1,
    buildingFlowFrame2,
    buildingFlowFrame3,

    buildingPipeLeft,
    buildingPipeRight,
    buildingPipeTopLeft,
    buildingPipeTopRight,

    buildingWinFlag,
    buildingWinRound,
    buildingWinRod,
  ] = await initBuildingImages();

  // 子弹
  const [
    bulletFrame0,
    bulletFrame1,
    bulletFrame2,
    bulletFrame3,
  ] = await initBulletImages();

  const sceneBackground = await initSceneImages();

  return {
    person: {
      basePersonStatic: [basePersonStatic],
      basePersonTopLeft: [basePersonTopLeft],
      basePersonTopRight: [basePersonTopRight],
      basePersonRight: [
        basePersonRightFrame0,
        basePersonRightFrame1,
        basePersonRightFrame2,
      ],
      basePersonLeft: [
        basePersonLeftFrame0,
        basePersonLeftFrame1,
        basePersonLeftFrame2,
      ],
      basePersonDeath: [basePersonDeath],

      bigPersonStatic: [bigPersonStatic],
      bigPersonTopLeft: [bigPersonTopLeft],
      bigPersonTopRight: [bigPersonTopRight],
      bigPersonRight: [
        bigPersonRightFrame0,
        bigPersonRightFrame1,
        bigPersonRightFrame2,
      ],
      bigPersonLeft: [
        bigPersonLeftFrame0,
        bigPersonLeftFrame1,
        bigPersonLeftFrame2,
      ],

      bulletPersonStatic: [bulletPersonStatic],
      bulletPersonTopLeft: [bulletPersonTopLeft],
      bulletPersonTopRight: [bulletPersonTopRight],
      bulletPersonRight: [
        bulletPersonRightFrame0,
        bulletPersonRightFrame1,
        bulletPersonRightFrame2,
      ],
      bulletPersonLeft: [
        bulletPersonLeftFrame0,
        bulletPersonLeftFrame1,
        bulletPersonLeftFrame2,
      ],
      bulletPersonBulletLeft: [bulletPersonBulletLeft],
      bulletPersonBulletRight: [bulletPersonBulletRight],
      bullet: [bulletFrame0, bulletFrame1, bulletFrame2, bulletFrame3],
    },
    mushroom: {
      mushroomGrow: [mushroomGrow],
      mushroomBad: [mushroomBadFrame0, mushroomBadFrame1, mushroomBadFrame0],
      mushroomBadDie: [mushroomBadDie],
    },
    building: {
      buildingAsk: [
        buildingAskFrame0,
        buildingAskFrame1,
        buildingAskFrame2,
        buildingAskFrame3,
        buildingAskFrame4,
        buildingAskFrame5,
      ],
      buildingNothing: [buildingNothing],
      buildingLand: [buildingLand],
      buildingStone: [buildingStone],
      buildingRock: [buildingRock],
      buildingGold: [
        buildingGoldFrame0,
        buildingGoldFrame1,
        buildingGoldFrame2,
        buildingGoldFrame3,
        buildingGoldFrame4,
        buildingGoldFrame5,
      ],
      buildingFlow: [
        buildingFlowFrame0,
        buildingFlowFrame1,
        buildingFlowFrame2,
        buildingFlowFrame3,
      ],
      buildingPipeLeft: [buildingPipeLeft],
      buildingPipeRight: [buildingPipeRight],
      buildingPipeTopLeft: [buildingPipeTopLeft],
      buildingPipeTopRight: [buildingPipeTopRight],

      buildingWin: [buildingWinFlag, buildingWinRound, buildingWinRod],
      buildingWinRod: [buildingWinRod],
    },
    scene: {
      sceneBackground: [sceneBackground],
    },
  };
};
