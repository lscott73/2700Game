export default class Zone {
    constructor(scene) {
        this.renderZone = (x, y, width, height) => {
            let dropZone = scene.add.zone(x, y, width, height).setRectangleDropZone(width, height); //700, 375, 900, 250
            dropZone.setData({ cards: 0 });
            return dropZone;
        }
        this.renderOutline = (dropZone) => {
            let dropZoneOutline = scene.add.graphics();
            dropZoneOutline.lineStyle(2, 0xfbbb21);
            dropZoneOutline.strokeRect(dropZone.x - dropZone.input.hitArea.width / 2, dropZone.y - dropZone.input.hitArea.height / 2, dropZone.input.hitArea.width, dropZone.input.hitArea.height);
        }
    }
}