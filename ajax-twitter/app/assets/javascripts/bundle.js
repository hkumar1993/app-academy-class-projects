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

const FollowToggle = __webpack_require__(1);

$(function(){
  $('input.follow-toggle').each((idx, el) => {
    new FollowToggle(el);
  });
});


/*

  select button - floow toggle
    -> create new instance

*/


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

class FollowToggle {
  constructor(el) {
    this.$el = $(el);
    this.userId = this.$el.data('user-id');
    this.followState = this.$el.data('initial-follow-state');
    this.render();
    this.$el.on('click', (e) => this.handleClick(e));
  }

  render() {
    switch (this.followState) {
      case 'unfollowed':
        this.$el.val('Follow!').prop('disabled',false);
        break;
      case 'followed':
        this.$el.val('Unfollow!').prop('disabled',false);
        break;
      case 'unfollowing':
        this.$el.val('Unfollowing...').prop('disabled',true);
        break;
      case 'following':
        this.$el.val('Following...').prop('disabled',true);
        break;
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.followPending();
    this.render();
    if (this.followState === 'following') {
      APIUtil.followUser.call(this, this.userId)
        .then(this.toggleFollow.bind(this))
        .then(this.render.bind(this));
    } else {
      APIUtil.unfollowUser.call(this, this.userId)
        .then(this.toggleFollow.bind(this))
        .then(this.render.bind(this));
    }
  }

  toggleFollow(){
    if (this.followState === 'following') {
      this.followState ='followed';
    } else {
      this.followState = 'unfollowed';
    }
  }

  followPending(){
    if (this.followState === 'unfollowed') {
      this.followState ='following';
    } else {
      this.followState = 'unfollowing';
    }
  }
}


module.exports = FollowToggle;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: 'POST',
      dataType: 'JSON'
    })
  ),

  unfollowUser: id => (
    $.ajax({
      url: `/users/${id}/follow`,
      method: 'DELETE',
      dataType: 'JSON'
    })
  )

};

module.exports = APIUtil;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map