export type Player = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
};

export type Ground = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.StaticBody;
};

export type Obstacle = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
    health: number,
    type: 'rock' | 'ice' | 'fire' | 'diamond' | 'metal',
    area: number,
    totalHealth: number,
    destructionTexture: Phaser.GameObjects.RenderTexture | null;
};

export type Bullet = Phaser.GameObjects.Rectangle & {
    body: Phaser.Physics.Arcade.Body;
    damage: number,
    type: 'metal' | 'ice' | 'plasma' | 'bomb' | 'fire'
};
export type GameState = {
    scene: Phaser.Scene;
    player: Player;
    ground: Ground;
    obstacles: Obstacle[];
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    jumpKey: Phaser.Input.Keyboard.Key;
    obstacleSpawner: Phaser.Time.TimerEvent;
    shootKey: Phaser.Input.Keyboard.Key;
    bullets: Bullet[];
};
export type DestructionShape =
    | 'none'
    | 'rectangle'
    | 'slice'
    | 'circle';

export type DestructionResult = {
    amount: number;
    shape: DestructionShape;
};