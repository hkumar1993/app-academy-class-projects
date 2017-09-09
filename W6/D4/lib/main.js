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
  xhr.onload = options.success;
  xhr.send(options.data);
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  queue.forEach((func) => {
    func();
  })
})

var root = 'https://jsonplaceholder.typicode.com';

let testOptions = {
  url: root + '/posts/1',
  method: 'GET',
  success: function(res) {
    alert('Found data!');
    console.log(res);
  }
};


window.$l(()=>{
  $l.ajax(testOptions);
});
