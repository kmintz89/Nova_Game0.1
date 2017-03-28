//state loads asset files for menu screen
var bootState = {
    //place menu assets to be loaded here
    preload: function(){
        game.load.image('title', "././Assets/img/tempGameAssets/gameTitle.png");
        game.load.image('box', "././Assets/img/tempMenuAssets/bttnOutline.png")
        game.load.image('background', "././Assets/img/tempGameAssets/ShamansTitleScreen.png");
        game.load.image('singleP', "././Assets/img/tempMenuAssets/StartButton2.png");
        game.load.image('options', "././Assets/img/tempMenuAssets/OptionsButton2.png");
        game.load.image('credits', "././Assets/img/tempMenuAssets/creditsbutton2.png");
        game.load.image('exit', "././Assets/img/tempMenuAssets/btnExit.png");
        game.load.image('play', "././Assets/img/tempMenuAssets/btnStart.png");
    },
    //code to make assets goes here
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.renderer.renderSession.roundPixels = true;


        game.state.start('menu');
    }
};