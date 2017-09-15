class Api::UsersController < ApplicationController
  def create
    @user = User.create(user_params)
    if @user.save
      login(@user)
      render 'api/users/show'
    else
      @errors = @user.errors.full_messages
      render 'api/users/show', status: 422
    end
  end
end
