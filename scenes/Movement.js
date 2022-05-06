class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene');
    }

    create() {
        // variables and settings
        this.VELOCITY = 500;
        this.DRAG = 800;    // DRAG < ACCELERATION = icy slide
        this.GROUND_HEIGHT = 35;
        this.AVATAR_SCALE = 0.5;

        // set bg color
        this.cameras.main.setBackgroundColor('#666');

        // Set up animations
        // Idle left
        this.anims.create({
            key: 'idle_left',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'idle_left_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 5000,
            yoyo: true
        });

        // Idle right
        this.anims.create({
            key: 'idle_right',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'idle_right_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 5000,
            yoyo: true
        });

        // Idle front
        this.anims.create({
            key: 'idle_up',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'idle_up_',
                start: 1,
                end: 1,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: 0,
        });

        // Idle back
        this.anims.create({
            key: 'idle_down',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'idle_down_',
                start: 1,
                end: 3,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 15,
            repeat: -1,
            repeatDelay: 5000,
            yoyo: true
        });



        // Run left
        this.anims.create({
            key: 'run_left',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'run_left_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });

        // Run right

        this.anims.create({
            key: 'run_right',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'run_right_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });

        // Run up

        this.anims.create({
            key: 'run_up',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'run_up_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });

        // Run down

        this.anims.create({
            key: 'run_down',
            frames: this.anims.generateFrameNames('link_atlas', {
                prefix: 'run_down_',
                start: 1,
                end: 10,
                suffix: '',
                zeroPad: 4
            }),
            frameRate: 30,
            repeat: -1,
        });




/*
        // make ground 🏞
        this.ground = this.add.group();
        this.groundSprite = this.physics.add.sprite(0, game.config.height - this.GROUND_HEIGHT, 'ground').setScale(2);
        this.groundSprite.body.immovable = true;
        this.groundSprite.body.allowGravity = false;
        this.ground.add(this.groundSprite);
*/

        // make player avatar 🧍
        this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'link_atlas', 'idle_down_0001').setScale(this.AVATAR_SCALE);

        // Use Phaser-provided cursor key creation function
        cursors = this.input.keyboard.createCursorKeys();

        // Add physics collider to make player stay on top of the ground
        this.physics.add.collider(this.player, this.ground);
    }

    update() {
        // check keyboard input
        if (cursors.left.isDown) {
            this.player.body.setVelocityX(-this.VELOCITY);
            this.player.anims.play('run_left', true);

        } else if (cursors.right.isDown) {
            this.player.body.setVelocityX(this.VELOCITY);
            this.player.anims.play('run_right', true);

        } else if (cursors.up.isDown) {
            this.player.body.setVelocityY(-this.VELOCITY);
            this.player.anims.play('run_up', true);

        } else if (cursors.down.isDown) {
            this.player.body.setVelocityY(this.VELOCITY);
            this.player.anims.play('run_down', true);
        } else if (!cursors.right.isDown && !cursors.left.isDown && !cursors.up.isDown && !cursors.down.isDown) {
            this.player.body.setVelocityX(0);
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_left') {
                this.player.anims.play('idle_left');
                this.player.body.setVelocityX(0);
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_right') {
                this.player.anims.play('idle_right');
                this.player.body.setVelocityX(0);
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_up') {
                this.player.anims.play('run_up');
                this.player.body.setVelocityY(0);
            }
            if (this.player.anims.isPlaying && this.player.anims.currentAnim.key === 'run_down') {
                this.player.anims.play('run_down');
                this.player.body.setVelocityY(0);
            }

        }// input if end



        // wrap physics object(s) .wrap(gameObject, padding)
        this.physics.world.wrap(this.player, 0);
    }
}