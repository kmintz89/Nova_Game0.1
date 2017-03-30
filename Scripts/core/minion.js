Minion = function(game, SpwnX, SpwnY, CurTarget, EnemyGroup,bullets){
    
    

    Phaser.Sprite.call(this, game, SpwnX, SpwnY, 'Minion1');

    
    this.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(this);
    
    this.body.setSize(128, 128, 0, 10); //reducing the player collision box
    this.body.collideWorldBounds = true;
    this.weapon = null;
    
    this.movementSPD = 1000;
    this.hp = 100;    
    this.level = 1;
    this.EXP = 0;
    this.AttackPoints = 10;
    this.nextFire = 0;
    this.fireRate = 5000;
    
    

    this.curState = "Patrol";
    this.enemyInRange = game.add.group();
    this.curTarget = CurTarget;
    this.enemyGroup = EnemyGroup;
    
    this.Bullets = bullets;

    this.MinionAttack();
    this.invulnerable = false;
    
    this.isWalking = true;
    this.score = 0;
    
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

Minion.prototype = Object.create(Phaser.Sprite.prototype);
Minion.prototype.constructor = Minion;

//update is called automatically by Phaser
Minion.prototype.update = function(){
   this.StateMachine();
   
   //console.log("X:" + this.body.x + "Y:" + this.body.y);
};

Minion.prototype.move = function(){
   this.body.velocity.y = 50;
   this.animations.play('spin');
};
Minion.prototype.moveTowardTarget = function(target){
   this.body.velocity.y = 0;
   game.physics.arcade.moveToObject(this,target,50);
   this.animations.play('spin');
};
Minion.prototype.Attack = function(source,target,bullets,mX,mY) {
    
    this.bullets = this.Bullets;
    this.CurAngle = game.physics.arcade.angleBetween(source, target);
    this.CurAngle = game.math.radToDeg(this.CurAngle);
    //console.log("Attacking Enemy in Range. Current Firing angle is " + this.CurAngle);
    

    if (this.game.time.now > this.nextFire && this.Bullets.countDead() > 0)
    {
        this.nextFire = this.game.time.now + this.fireRate;
        console.log("Current Bullet X: " + this.body.x + "Current Bullet Y: " + this.body.y);
        var bullet = this.Bullets.getFirstDead();

        bullet.reset(mX, mY);
        
        console.log("Current Bullet X: " + bullet.x + "Current Bullet Y: " + bullet.y);
        bullet.rotation = this.game.physics.arcade.moveToObject(bullet, target, 1000);
    }
    

    //this.weapon.fireAngle = this.CurAngle;
    
    //this.weapon.fire();
};

Minion.prototype.DistanceCheck = function(source,target) {
    var Distance = game.physics.arcade.distanceBetween(source, target);
        if (Distance <= 500){
            this.enemyInRange.add(target);
            //console.log("The " + target + " is in Range");
            
        }
    return Distance;

};

Minion.prototype.StateMachine = function() {
    switch (this.curState){
        case "Patrol":
            this.move(); 
        
            var Target = this.DistanceCheck(this,this.curTarget);
                
                if(Target <= 500){

                    this.curState = "EnemyInRange";
                    console.log("Switching to" + this.curState);

                }
        break;
        case "EnemyInRange":
            
            this.moveTowardTarget(this.curTarget);
            var Target = this.DistanceCheck(this,this.curTarget);
        
             if(Target <= 200){

                    this.curState = "Attack";
                    console.log("Switching to" + this.curState);

                }

        break;
        case "Attack":
            this.body.velocity.y = 0;
            this.body.velocity.x = 0;
            this.Attack(this,this.curTarget,this.bullets,this.body.x,this.body.y);

            
        break;
    }


};
Minion.prototype.MinionAttack = function() {
   /* this.weapon = game.add.weapon(30, 'HitBox'); //
    this.weapon.enableBody = true;
    this.weapon.bulletKillType = Phaser.Weapon.KILL_LIFESPAN;
    //this.weapon.bulletGravity.y =-1000;
    this.weapon.bulletSpeed = 1000;
    this.weapon.bulletLifespan = 1000;
    this.weapon.fireRate = 2 * 1000;
    this.weapon.trackSprite(this);
    this.weapon.damage = 10;
    this.shootSfx = this.pistolSfx;
    */
    //var AK47 = this.addChild(game.make.sprite(-35, -95, 'AK47'));
    //AK47.scale.setTo(0.05, 0.05);


};
Minion.prototype.updateTargets = function(source) {
    this.enemyGroup.forEach(this.DistanceCheck,this,this.curTarget,350);

};