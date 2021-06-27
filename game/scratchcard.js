export class Scratchcard {
  constructor(app, resources, brush) {
    this.resources = resources;
    this.app = app;
    this.stage = app.stage;
    this.dragging = false;
    this.brush = brush;
    this.renderTexture = PIXI.RenderTexture.create(
      this.app.screen.width,
      this.app.screen.height
    );
  }
  init() {
    const background = new PIXI.Sprite(
      this.resources.textureBackground.texture
    );
    this.app.stage.addChild(background);
    background.width = this.app.screen.width;
    background.height = this.app.screen.height;

    this.app.stage.interactive = true;
    const imageToReveal = new PIXI.Sprite(
      this.resources.textureToReveal.texture
    );
    this.stage.addChild(imageToReveal);
    imageToReveal.width = this.app.screen.width;
    imageToReveal.height = this.app.screen.height;

    const renderTextureSprite = new PIXI.Sprite(this.renderTexture);
    this.stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;
    this.addListeners();
  }
  addListeners() {
    this.app.stage.on("pointerdown", (event) => this.pointerDown(event));
    this.app.stage.on("pointerup", (event) => this.pointerUp(event));
    this.app.stage.on("pointermove", (event) => this.pointerMove(event));
  }
  pointerMove(event) {
    if (this.dragging) {
      this.brush.position.copyFrom(event.data.global);
      this.app.renderer.render(
        this.brush,
        this.renderTexture,
        false,
        null,
        false
      );
    }
  }
  pointerDown(event) {
    this.dragging = true;
    this.pointerMove(event);
  }
  pointerUp(event) {
    this.dragging = false;
  }
}
