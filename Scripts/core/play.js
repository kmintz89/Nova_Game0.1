var playState = function(game){};
playState.prototype = {
    

    create: function(){


        //this.map = game.add.tilemap('tileMap');
        //this.map.addTilesetImage('tileSet1');
        
        game.add.image(0,0, 'background2')
        //this.background = this.map.createLayer('Tile Layer 2');
        //this.foreground = this.map.createLayer('Tile Layer 1');
        

        //this.map.setCollisionBetween(1, 1000, true, this.foreground);
        //this.game.add.image(0, 0, 'HUDimage');
        this.game.add.image(674, 0, 'NEXUS2');
        this.game.add.image(680, 1080, 'NEXUS');
        
        this.spawnWaves = true; //bool to decide whether to spawn waves or not

        //game.physics.arcade.gravity.y = 1000;
        playerscale = 0.4;
        //creating players
        this.players = game.add.group();
        
        this.player1 = new Player(game, 500, 200, 1, this.players);
        this.player1.scale.setTo(playerscale, playerscale);
        
        
        this.IceBullets = game.add.group();
        this.IceBullets.enableBody = true;
        this.IceBullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.IceBullets.createMultiple(100, 'HitBox');
        
        //this.IceBullets.setAll('anchor.x', 10);
        //this.IceBullets.setAll('anchor.y', 10);
        this.IceBullets.setAll('outOfBoundsKill', false);
        this.IceBullets.setAll('checkWorldBounds', true);

        
        //creating enemy group
        this.enemies = game.add.group();
        //this.enemies.add(this.iceminion);
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.fireMinions = game.add.group();
        this.fireMinions.enableBody = true;
        this.fireMinions.physicsBodyType = Phaser.Physics.ARCADE;
        
        this.FireMinion1 = new FireMinion(game, 800, 800, this.player1, this.enemies);
        this.fireMinions.add(this.FireMinion1);
        
        this.MinionWave();
        game.time.events.loop(60 * 1000, this.MinionWave, this); //loop that spawns enemies

        this.powerUp = game.add.group();

    },

    update: function(){
        game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);
        game.physics.arcade.collide(this.fireMinions,this.foreground);
       


        game.physics.arcade.overlap(this.players, this.enemies, this.killPlayer, null, this);

        
        game.physics.arcade.overlap(this.IceBullets, this.fireMinions, function (bullets, FireMinion) {
            this.hitEnemy(bullets, FireMinion, this.enemies);
        }, null, this);        

        game.physics.arcade.overlap(this.player1.weapon.bullets, this.enemies, function (bullets, Minion) {
            this.hitEnemy(bullets, Minion, this.player1);
        }, null, this);
       

    },

    
    shutdown: function () {
        //resetting wave properties
        this.waveProperties.timeCheck = 1500;
        this.waveProperties.max = 12;
        this.waveProperties.active = 0;
        this.waveProperties.counter = 24;
		
		game.global.score1 = this.player1.score;
		game.global.score2 = this.player2.score;
    },
    HUD: function(){
        
        this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + this.player1.score,
            {font: '20px Times New Roman', fill: '#ffffff' });
        
    },
    
    MinionWave: function(){
    
    
        this.iceminion = new Minion(game, IceSpawnLocations.SP1.x, IceSpawnLocations.SP1.y, this.FireMinion1, this.fireMinions,this.IceBullets);
        this.enemies.add(this.iceminion);

        this.iceminion = new Minion(game, IceSpawnLocations.SP2.x, IceSpawnLocations.SP2.y, this.FireMinion1, this.fireMinions,this.IceBullets);
        this.enemies.add(this.iceminion);

        this.iceminion = new Minion(game, IceSpawnLocations.SP3.x, IceSpawnLocations.SP3.y, this.FireMinion1, this.fireMinions,this.IceBullets);
        this.enemies.add(this.iceminion);

        this.iceminion = new Minion(game, IceSpawnLocations.SP4.x, IceSpawnLocations.SP4.y, this.FireMinion1, this.fireMinions,this.IceBullets);
        this.enemies.add(this.iceminion);

        this.iceminion = new Minion(game, IceSpawnLocations.SP5.x, IceSpawnLocations.SP5.y, this.FireMinion1, this.fireMinions,this.IceBullets);
        this.enemies.add(this.iceminion);
    
        //var NumberToSpawn = numToSpawn;

        /* for (var i = NumberToSpawn; i >= 0; i--) {
         
     
            if (Team == 'ice'){

            }
           if (Team == 'fire'){
            
            }
    
    }*/
    },
};

var enemyProperties = {
    Minion1: {hp: 100, minV: 50, maxV: 80, img: 'bigBubble', dmg: 50, points: 10, score: 100}, //DO NOT CHANGE POINTS!
    JungleMinion1: {hp: 50, minV: 100, maxV: 80, img: 'medBubble', dmg: 20, points: 5, score: 50},
    JungleMinion2: {hp: 10, minV: 200, maxV: 80, img: 'smallBubble', dmg: 10, points: 1, score: 25}
};
var IceSpawnLocations = {
        SP1: {x: 640, y: 100},
        SP2: {x: 840, y: 100},
        SP3: {x: 740, y: 164},
        SP4: {x: 690, y: 32},
        SP5: {x: 790, y: 32},
        
};
var FireSpawnLocations = {
        SP1: {x: 200, y: 800},
        SP2: {x: 400, y: 800},
        SP3: {x: 800, y: 800},
        SP4: {x: 1000, y: 800},
        SP5: {x: 1200, y: 800},
        
};