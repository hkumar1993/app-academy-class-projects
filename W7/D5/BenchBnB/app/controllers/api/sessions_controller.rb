class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username], user_params[:password])
    p user_params
    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Incorrect Username / Password'], status: 401
    end
  end

  def destroy
    if logged_in?
      logout
      render 'api/users/show'
    else
      @errors = ['User not logged in']
      render 'api/users/show', status: 404
    end
  end
end
