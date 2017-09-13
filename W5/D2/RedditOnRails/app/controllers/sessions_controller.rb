class SessionsController < ApplicationController

  before_action :already_logged_in, except: [:destroy]

  def new
    #code
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      redirect_to subs_url
    else
      flash[:errors] = ["Invalid Username / Password"]
      redirect_to new_session_url
    end
  end

  def destroy
    logout
    redirect_to new_session_url
  end

end
