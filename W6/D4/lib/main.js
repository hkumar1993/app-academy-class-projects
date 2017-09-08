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

$l.extend = (...objects) => {
  return Object.assign({}, ...objects);
}

$l.ajax = (options) => {

  let defaults = {
    url: window.location.href,
    method: 'GET',
    dataType: 'HTTP',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    success: () => {},
    error: () => {}
  };

  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);

  xhr.onload = function () {
  console.log(xhr.status) // for status info
  console.log(xhr.responseType) //the type of data that was returned
  console.log(xhr.response) //the actual response. For json api calls, this will be a json string
  }

  xhr.send(options);
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  queue.forEach((func) => {
    func();
  })
})
