Minion = function(game, x, y, p_num, group){
    
    /*player.state.add('MainState', MainState);
    player.state.add('SecondaryState', SecondaryState);
    player.state.add('Stun', Stun);
    player.state.add('Dead', Dead);*/

    Phaser.Sprite.call(this, game, x, y, 'Minion1');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    
    this.body.setSize(128, 128, 0, 10); //reducing the player collision box
    this.body.collideWorldBounds = true;

    this.movementSPD = 1000;
    this.hp = 100;    
    this.level = 1;
    this.EXP = 0;
    this.AttackPoints = 10;


    this.invulnerable = false;
    this.weapon = null;
    this.isWalking = true;
    this.score = 0;
    game.addgroup = group;
    this.animations.add('spin', [0,1,2,3], 4, true);
    //this.animations.add('left', [13,12,11,10,9,8,7], 8, true);
    
    
    //this.sniperSfx = game.add.audio('sniperSfx');
    
    //this.shootSfx = this.shotgunSfx;
    //this.shootSfx.allowMultiple = false;

    
    this.move();
    this.Attack();
    //at the very end
    game.add.existing(this);
};

Minion.prototype = Object.create(Phaser.Sprite.prototype);
Minion.prototype.constructor = Minion;

//update is called automatically by Phaser
Minion.prototype.update = function(){
    this.move();
};

Minion.prototype.move = function(){
   this.body.velocity.y = 50;
   this.animations.play('spin');
};

Minion.prototype.Attack = function() {
    


};
Minion.prototype.DistanceCheck = function() {
    


};

