const FollowToggle = require('./follow_toggle.js');

$(function() {
  $('button.follow-toggle').each((index, el)=>{
    new FollowToggle(el);
  });
});
