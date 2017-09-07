const APIUtil = require('./api_util');

class TweetCompose {
  constructor() {
    this.$form = $('form.tweet-compose');
    this.$form.find('textarea').on('input', (e)=> this.handleInput(e));
    this.$form.submit((e) => this.handleSubmit(e));
  }

  handleInput(e){
    const $currentTarget = $(e.currentTarget);
    let totalChars = $currentTarget.val().length;
    let charsLeft = 140 - totalChars;
    const $strong = $('strong.chars-left');
    $strong.text(charsLeft);
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = this.$form.serializeJSON();
    this.disableForm();

    APIUtil.createTweet(data)
      .then((res)=> this.handleSuccess(res));
    // this.enableForm();
  }

  disableForm() {
    this.$form.find(':input').prop('disabled',true);
  }

  enableForm() {
    this.$form.find(':input').prop('disabled',false);
  }

  clearInput(){
    this.$form.find(':input')
      .not(':button, :submit, :reset, :hidden')
      .val('')
      .removeAttr('checked')
      .removeAttr('selected');
  }

  handleSuccess(res){
    const feedId = this.$form.data('tweets-ul');
    const tweet = JSON.stringify(res);

    const $li = $('<li>')
      .text(tweet);

    $(feedId).prepend($li);

    this.clearInput();
    this.enableForm();
  }
}

module.exports = TweetCompose;
