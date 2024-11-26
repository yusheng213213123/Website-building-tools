class MouseMoveBox {
  target = null;
  moveTarget = null;
  moveTargetWidth = 0;
  moveTargetHeight = 0;
  moveTargetParentWidth = 0;
  moveTargetParentHeight = 0;
  moving = false;
  x = 0;
  y = 0;

  constructor(target, moveTarget) {
    this.target = target;
    this.moveTarget = moveTarget;
    this.moveTargetWidth = this.moveTarget.width();
    this.moveTargetHeight = this.moveTarget.height();
    this.moveTargetParentWidth = this.moveTarget.parent().width();
    this.moveTargetParentHeight = this.moveTarget.parent().height();
    this.initPosition();
    // init event
    this.mouseDown();
    this.mouseMove();
    this.mouseUp();
  }
  initPosition() {
    this.moveTarget.css({
      top: this.moveTargetParentHeight / 2 - this.moveTargetHeight / 2,
      left: this.moveTargetParentWidth / 2 - this.moveTargetWidth / 2,
    });
  }
  mouseUp() {
    $(document).mouseup((e) => {
      this.moving = false;
    });
  }
  mouseDown() {
    this.target.mousedown((e) => {
      this.x = e.clientX - this.moveTarget[0].offsetLeft;
      this.y = e.clientY - this.moveTarget[0].offsetTop;
      console.log(e.clientX, this.moveTarget);
      this.moving = true;
    });
  }
  mouseMove() {
    $(document).mousemove((e) => {
      var pageX = e.clientX;
      var pageY = e.clientY;
      if (this.moving) {
        this.moveTarget.css({
          left: pageX - this.x + "px",
          top: pageY - this.y + "px",
        });
      }
    });
  }
}
