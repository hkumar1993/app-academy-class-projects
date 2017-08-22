class UsersController < ApplicationController
  def index
    render json: User.all.to_json
  end

  def create
    user = User.new(user_params)
    if user.save
      render json: user
    else
      render json: user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def show
    if user = User.find_by(id: params[:id])
      render json: user.to_json
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  def destroy
    if user = User.find_by(id: params[:id])
      user.destroy
      redirect_to '/users'
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  def update
    if user = User.find_by(id: params[:id])
      user.update_attributes(user_params)
      if user.save
        render json: user
      else
        render json: user.errors.full_messages, status: :unprocessable_entity
      end
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :name)
  end

end
