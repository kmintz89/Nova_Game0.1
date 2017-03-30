FireMinion = function(game, x, y, EnemyGroup, group){
    
    this.P1 = EnemyGroup;
    Phaser.Sprite.call(this, game, x, y, 'Minion2');

    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    
    this.body.setSize(128, 128, 0, 10); //reducing the player collision box
    this.body.collideWorldBounds = true;

    this.movementSPD = 1000;
    this.hp = 100;    
    this.level = 1;
    this.EXP = 0;
    this.AttackPoints = 10;
    this.TARGET;
    this.curState = "Patrol";
    this.TargetsInRange = [];
    this.curTarget;

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

    //this.state.start('Patrol');
    //this.move();
    //this.Attack();
    //at the very end
    game.add.existing(this);
};

FireMinion.prototype = Object.create(Phaser.Sprite.prototype);
FireMinion.prototype.constructor = FireMinion;

//update is called automatically by Phaser
FireMinion.prototype.update = function(){
   //this.StateMachine();
};

FireMinion.prototype.move = function(){
   this.body.velocity.y = 50;
   this.animations.play('spin');
};
FireMinion.prototype.moveTowardTarget = function(target){
   this.body.velocity.y = 0;
   game.physics.arcade.moveToObject(this,target,50);
   this.animations.play('spin');
};
FireMinion.prototype.Attack = function() {
    


};
FireMinion.prototype.DistanceCheck = function(source,target,range) {
    var Distance = game.physics.arcade.distanceBetween(source, target);
        if (target <= range){
            this.TargetsInRange.push(target);
            console.log("The " + target + " is in Range");
            console.log(this.TargetsInRange [0]);
        }
    return Distance;

};

FireMinion.prototype.StateMachine = function() {
    switch (this.curState){
        case "Patrol":
            this.move(); 
        
            var Target = this.DistanceCheck(this,this.P1,350);
                
                if(Target <= 350){

                    this.curState = "EnemyInRange";
                    console.log("Switching to" + this.curState);

                }
        break;
        case "EnemyInRange":
            
            this.moveTowardTarget(this.P1);

        
        break;
        case "Attack":


        
        break;
    }


};
