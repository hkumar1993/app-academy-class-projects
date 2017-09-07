const DOMNodeCollection = require('./dom_node_collection');
const queue = [];
let docReady = false;

window.$l = (selector) => {
  if(selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else if (selector instanceof Function) {
    if (docReady) {
      selector();
    } else {
      queue.push(selector);
    }
  } else {
    let nodes = document.querySelectorAll(selector);
    let arrNodes = Array.from(nodes);
    return new DOMNodeCollection(arrNodes);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  queue.forEach((func) => {
    func();
  })
})
