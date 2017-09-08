/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);
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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(array) {
    this.array = array;
  }

  html(string) {
    if (string) {
      this.array.forEach ((el) => {
        el.innerHTML = string;
      })
    } else {
      return this.array[0].innerHTML;
    }
  }

  empty() {
    this.html(" ");
  }

  append(object) {
    this.array.forEach((el) => {
      if (typeof object === "string") {
        el.innerHTML += object;
      } else {
        el.innerHTML += object.outerHTML;
      }
    });
  }

  attr(name, val){
    if (val) {
      this.array.forEach((el) =>{
        el.setAttribute(name, val);
      });
    } else {
      this.array[0].getAttribute(name);
    }
  }


  addClass(name){
    this.array.forEach((el) =>{
      el.className += ` ${name}`;
    });
  }

  removeClass(name){
    this.array.forEach((el) =>{
      if (name) {
        let classArray = el.className.split(' ');
        let idx = classArray.indexOf(name);
        classArray.splice(idx,1);
        el.className = classArray.join(' ');
      } else {;
        el.className = '';
      }
    });
  }

  children(){
    let resultChildren = [];
    this.array.forEach((node) => {
      resultChildren = resultChildren.concat(Array.from(node.children));
    });
    return new DOMNodeCollection(resultChildren);
  }

  parent() {
    let resultParents = [];
    this.array.forEach((node) => {
      resultParents.push(node.parentNode);
    });
    return new DOMNodeCollection(resultParents);
  }

  find(selector){
    let allFound = [];
    this.array.forEach((node) => {
      allFound = allFound.concat(Array.from(node.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(allFound);
  }

  remove(){
    this.array.forEach((node) => {
      node.innerHTML = "";
      node.outerHTML = "";
    });
    this.array = [];
  }

  on(action, callback) {
    this.array.forEach ((node) => {
      const key = `key-${action}`;
      node.addEventListener(action, callback);
      if(!node[key]){
        node[key] = [];
      }
      node[key].push(callback);
    });
  }

  off(action, callback) {
    this.array.forEach ((node) => {
      const key = `key-${action}`;
      if(node[key]){
        node[key].forEach(callback => {
          node.removeEventListener(action, callback);
        });
      }
      node[key] = [];
    });
  }

}

module.exports = DOMNodeCollection;

/*
  (ul).outerHTML = ul></ul
  ul.inner = <li></li>

  (li) => HTML element

  (li).outerHTML = <li>text</li>


  (ul).append(li)

  ul.inner = ul.inner  = li.outer

*/


/***/ })
/******/ ]);