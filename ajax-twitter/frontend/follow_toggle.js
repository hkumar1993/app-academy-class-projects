const APIUtil = require('./api_util');

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
