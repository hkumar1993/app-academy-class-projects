class UsersController < ApplicationController

  before_action :already_logged_in

  def new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to subs_url
    else
      flash[:errors] = @user.errors.full_messages
      redirect_to new_user_url
    end
  end


end
