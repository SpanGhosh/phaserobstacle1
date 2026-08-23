export type Player = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
};

export type Ground = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.StaticBody;
};

export type Obstacle = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
};
export type GameState = {
    scene: Phaser.Scene;
    player: Player;
    ground: Ground;
    obstacles: Obstacle[];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jumpKey: Phaser.Input.Keyboard.Key;
    obstacleSpawner: Phaser.Time.TimerEvent;
};