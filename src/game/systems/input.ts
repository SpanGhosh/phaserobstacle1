export function setupCursors(
    scene: Phaser.Scene
): Phaser.Types.Input.Keyboard.CursorKeys {
    return scene.input.keyboard.createCursorKeys();
}
export function setupJumpKey(
    scene: Phaser.Scene
): Phaser.Input.Keyboard.Key {
    return scene.input.keyboard.addKey('SPACE');
}
export function setupShootKey(
    scene: Phaser.Scene
): Phaser.Input.Keyboard.Key {
    return scene.input.keyboard.addKey('F');
}
