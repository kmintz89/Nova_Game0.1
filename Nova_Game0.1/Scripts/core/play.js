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
        this.game.add.image(735, 0, 'NEXUS');
        this.game.add.image(735, 1220, 'NEXUS');
        
        this.spawnWaves = true; //bool to decide whether to spawn waves or not

        //game.physics.arcade.gravity.y = 1000;
        playerscale = 0.4;
        //creating players
        this.players = game.add.group();
        
        this.player1 = new Player(game, 500, 200, 1, this.players);
        this.player1.scale.setTo(playerscale, playerscale);
        

        
        //this.player2 = new Player(game, 120, 636, 2, this.players);
        
        this.players.add(this.player1);
        //this.players.add(this.player2);
        //this.iceminion = new Minion(game, 200, 200, 2, this.enemies);
        
        //creating enemy group
        this.enemies = game.add.group();
        //this.enemies.add(this.iceminion);
        this.enemies.enableBody = true;
        this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
        this.MinionWave();
       // this.scoreCounter1 = game.add.text(70, 10,'P1 Score: ' + this.player1.score,
       //     {font: '20px Times New Roman', fill: '#ffffff' });

        //this.scoreCounter2 = game.add.text(1120, 10,'P2 Score: ' + this.player2.score,
        //    {font: '20px Times New Roman', fill: '#ffffff' });

        //making one emitter for all enemy deaths
        // this.bEmitter = game.add.emitter(game.world.centerX,game.world.centerY,100);
        // this.bEmitter.makeParticles('FireworkVFX',[1,2,3]);
        // this.bEmitter.gravity = -1500;
        // this.bEmitter.area = 500 * 500;
        // this.bEmitter.bounce.setTo(0.5,0.5);
        // this.bEmitter.setYSpeed(-500, 500);
        // this.bEmitter.setXSpeed(-500, 500);
        // this.bEmitter.minParticleSpeed.setTo(-200, -300);
        // this.bEmitter.maxParticleSpeed.setTo(200, 400);
        // this.bEmitter.setScale(0.5,0,0.5,0,1500);

        //game.time.events.loop(this.waveProperties.timeCheck, this.spawnEnemyWave, this); //loop that spawns enemies

        this.powerUp = game.add.group();

    },

    update: function(){
        game.physics.arcade.collide(this.players, this.foreground);
        game.physics.arcade.collide(this.enemies, this.foreground);

       

        game.physics.arcade.overlap( this.player1, this.powerUp, this.changeWeapon, null, this);
       


        game.physics.arcade.overlap(this.players, this.enemies, this.killPlayer, null, this);

        

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
    
    
    this.iceminion1 = new Minion(game, IceSpawnLocations.SP1.x, IceSpawnLocations.SP1.y, 2, this.enemies);
    this.enemies.add(this.iceminion1);

    this.iceminion2 = new Minion(game, IceSpawnLocations.SP2.x, IceSpawnLocations.SP2.y, 2, this.enemies);
    this.enemies.add(this.iceminion2);

    this.iceminion3 = new Minion(game, IceSpawnLocations.SP3.x, IceSpawnLocations.SP3.y, 2, this.enemies);
    this.enemies.add(this.iceminion3);

    this.iceminion4 = new Minion(game, IceSpawnLocations.SP4.x, IceSpawnLocations.SP4.y, 2, this.enemies);
    this.enemies.add(this.iceminion4);

    this.iceminion5 = new Minion(game, IceSpawnLocations.SP5.x, IceSpawnLocations.SP5.y, 2, this.enemies);
    this.enemies.add(this.iceminion5);
    
    console.log("x: " + IceSpawnLocations.SP1.x);
    console.log( " y: " + IceSpawnLocations.SP1.y);
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
