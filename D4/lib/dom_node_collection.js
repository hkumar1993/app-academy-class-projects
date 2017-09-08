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
