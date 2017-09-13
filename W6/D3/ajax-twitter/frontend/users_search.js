const APIUtil = require('./api_util');
const FollowToggle = require('./follow_toggle');

class UsersSearch {
  constructor(el) {
    this.$el = $(el);
    this.$input = $('nav.users-search input');
    this.$ul = $('ul.users');
    this.$input.on('input', (e) => this.handleInput(e));
  }

  handleInput(e) {
    const val = $(e.currentTarget).val();
    APIUtil.searchUsers(val, res => this.renderResults(res));
  }

  renderResults(res){
    this.$ul.empty();
    res.forEach((user) => {
      const $li = $('<li>');
      const $a = $('<a>');
      const $input = $('<input>');

      $input.addClass('follow-toggle')
        .prop('type', 'submit');

      new FollowToggle($input[0], {
        userId: user.id,
        followState: user.followed ? 'followed' : 'unfollowed',
      });

      $a.attr('href', `http://localhost:3000/users/${user.id}`)
        .text(`${user.username}`);

      $li.append($a)
        .append($input);

      this.$ul.append($li);
    });
  }
}

module.exports = UsersSearch;
