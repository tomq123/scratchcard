import { Scratchcard } from "./scratchcard.js";

export class Game {
  constructor(width, height, view) {
    this.width = width;
    this.height = height;
    this.view = view;
    this.app = null;
    this.brush = null;
  }
  init() {
    this.app = new PIXI.Application({
      width: this.width,
      height: this.height,
      view: this.view,
    });
    this.initBrush();
    this.loadAssets();
  }
  initBrush() {
    this.brush = new PIXI.Graphics();
    this.brush.beginFill(0xffffff);
    this.brush.drawCircle(0, 0, 50);
    this.brush.endFill();
  }
  loadAssets() {
    this.app.loader.add("textureBackground", "assets/bg_grass.jpg");
    this.app.loader.add("textureToReveal", "assets/money.jpg");
    this.app.loader.load((loader, resources) => this.setup(loader, resources));
  }
  setup(loader, resources) {
    const scratchcard = new Scratchcard(this.app, resources, this.brush);
    scratchcard.init();
  }
}
