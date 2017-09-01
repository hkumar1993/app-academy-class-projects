class UsersController < ApplicationController

  def index
    @users = User.all
    render :index
  end

  def new
    render :new
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      redirect_to(user_url(@user))
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end


end