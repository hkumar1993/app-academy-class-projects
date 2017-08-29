class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  helper_method :current_user
  def current_user
    # debugger
    User.find_by(session_token: session[:session_token])
  end

  def login(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

end
