class Flasher {
  constructor(args) {
    if (!args.target) {
      throw new Error('Target is required');
    }

    this.target = document.querySelectorAll(args.target);
    this.effect = args.effect ?? 'blink';
    this.speed = args.speed ?? null;
    this.color = args.color ?? '#ff0000';
    this.duration = args.duration ?? 300;
    if (this.isMethodExists(`build${this.capitalize(this.effect)}`)) {
      this.target.forEach(node => this[`build${this.capitalize(this.effect)}`].call(this, node))
    } else {
      throw new Error('Method is not exists');
    }
  }
  capitalize(string) {
    return string[0].toUpperCase() + string.substr(1);
  }
  isMethodExists(methodName) {
    return typeof this[methodName] == "function";
  }
  buildBlink(node) {
    const blinkNode = document.createElement('DIV');
    const z = node.style.zIndex;
    node.style.zIndex = z > 0 ? z : z + 1;
    const styles = {
      position: 'absolute',
      top: '0px',
      left: '0px',
      height: '100%',
      width: '100%',
      zIndex: node.style.zIndex - 1,
      boxShadow: `0 0 20px 5px ${this.color}`,
    };

    blinkNode.className = 'blink-node';
    Object.assign(blinkNode.style, styles);

    node.appendChild(blinkNode);
    blinkNode.animate({
      opacity: [ 0, 1 ]
    }, {
      duration: this.duration,
      direction: 'alternate-reverse',
      iterations: Infinity
    })
  }
}

window.Flasher = Flasher;
