const FollowToggle = require('./follow_toggle');

$(function(){
  $('input.follow-toggle').each((idx, el) => {
    new FollowToggle(el);
  });
});


/*

  select button - floow toggle
    -> create new instance

*/
