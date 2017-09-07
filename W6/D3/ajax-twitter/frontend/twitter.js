const FollowToggle = require('./follow_toggle');
const UsersSearch = require('./users_search');
const TweetCompose = require('./tweet_compose');


$(function(){
  // const $search = $('nav.users-search');
  // new UsersSearch($search);

  new TweetCompose();

  $('nav.users-search').each((idx, el) => {
    new UsersSearch(el);
  });

  $('input.follow-toggle').each((idx, el) => {
    new FollowToggle(el);
  });
});


/*

  select button - floow toggle
    -> create new instance

*/
