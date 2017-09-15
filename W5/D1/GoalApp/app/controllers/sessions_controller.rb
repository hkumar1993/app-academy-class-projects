class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    if @user
      login(@user)
      redirect_to user_url(@user)
    else
      flash[:errors] = ["Username / Password invalid"]
      render :new
    end
  end

  def destroy
    logout
    redirect_to users_url
  end

end
