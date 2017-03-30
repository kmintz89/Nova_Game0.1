//state preload's assets for playState
var loadState = {
    //place assets to be loaded here
    preload: function(){
        game.load.image('tileSet1', "Assets/TileMaps/tileSet1.png");
        game.load.tilemap('tileMap', "Assets/TileMaps/ShamansMap.json", null, Phaser.Tilemap.TILED_JSON);
        game.load.image('background2', "././Assets/img/tempGameAssets/map.png");
        game.load.spritesheet('player1', "Assets/img/tempGameAssets/warrior_m.png", 128, 144);
        // game.load.image('Sword', "Assets/img/tempGameAssets/")
        //game.load.image('AK47', "././Assets/img/tempGameAssets/AKF7v2.png");
        //game.load.image('Minion1', "././Assets/img/tempGameAssets/waterElementalSpin.png");
        game.load.image('HitBox', "././Assets/img/tempGameAssets/hitBox.png");
        game.load.image('p1shoot',"././Assets/img/tempGameAssets/spear.png");
        game.load.spritesheet('Minion1', "Assets/img/tempGameAssets/ice2.png",64,64);
        game.load.spritesheet('Minion2', "Assets/img/tempGameAssets/fireElementalSpin.png",64,64);
        game.load.image('HUDimage', "././Assets/img/tempGameAssets/HUD01.png");
        game.load.image('NEXUS',"././Assets/img/tempGameAssets/nexus-b.png")
        game.load.image('NEXUS2',"././Assets/img/tempGameAssets/nexus-f.png")
        game.load.audio('bulletSfx', "././Assets/sound/Guns/blaster.mp3");
        game.load.audio('bubbleSfx', "././Assets/sound/Blorp/Blorp.mp3");
        game.load.audio('shotgunSfx',"././Assets/sound/Guns/shotgun.mp3");
        game.load.audio('machineGunSfx',"././Assets/sound/Guns/machineGun.mp3");
        game.load.audio('sniperSfx',"././Assets/sound/Guns/sniper.mp3");

        game.load.image('playAgain', "././Assets/img/tempMenuAssets/playAgainO.png");
        game.load.image('exit', "././Assets/img/tempMenuAssets/btnExit.png");

    },
    //code to make assets goes here
    create: function(){
        game.state.start('play');
    },
    //code to update the assets goes here //changes are reflected in game render
    update: function(){

    }
};
