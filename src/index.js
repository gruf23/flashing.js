class Flasher {
  constructor(args) {
    if (!args.target) {
      throw new Error('Target is required');
    }

    this.target = document.querySelectorAll(args.target);
    this.effect = args.effect ?? 'blink';
    this.iterations = args.iterations ?? Infinity;
    this.timeout = args.timeout ?? false;
    this.color = args.color ?? '#ff0000';
    this.speed = args.speed ?? 300;
    this.position = args.position ?? 'full-size';
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
  getMeasurments(positionString) {
    const result = {};

    switch(positionString) {
      case 'full-size': {
        result.width = '100%';
        result.height = '100%';
        result.left = '0';
        result.top = '0';
      } break;
      case 'left': {
        result.width = '50%';
        result.height = '100%';
        result.left = '0';
        result.top = '0';
      } break;
      case 'top': {
        result.width = '100%';
        result.height = '50%';
        result.left = '0';
        result.top = '0';
      } break;
      case 'right': {
        result.width = '50%';
        result.height = '100%';
        result.right = '0';
        result.top = '0';
      } break;
      case 'bottom': {
        result.width = '100%';
        result.height = '50%';
        result.left = '0';
        result.bottom = '0';
      } break;
    }
    return result;
  }
  wrap(el, wrapper) {
    wrapper.style.position = 'relative';
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  buildBlink(node) {
    const blinkNode = document.createElement('DIV');
    const wrapper = document.createElement('div');
    this.wrap(node, wrapper);
    const z = node.style.zIndex;
    node.style.zIndex = z > 0 ? z : z + 1;
    const position = this.getMeasurments(this.position);
    const styles = {
      position: 'absolute',
      zIndex: node.style.zIndex - 1,
      boxShadow: `0 0 20px 5px ${this.color}`,
    };
    Object.assign(styles, position);
    blinkNode.className = 'blink-node';
    Object.assign(blinkNode.style, styles);

    wrapper.appendChild(blinkNode);
    blinkNode.animate({
      opacity: [ 0, 1 ]
    }, {
      duration: this.speed,
      direction: 'alternate-reverse',
      iterations: Infinity
    })
  }
}

window.Flasher = Flasher;
