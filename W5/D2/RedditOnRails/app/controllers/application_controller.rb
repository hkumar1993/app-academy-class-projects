class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?, :all_subs

  def current_user
    User.find_by(session_token: session[:session_token])
  end

  def login(user)
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    flash[:errors] = ["You must be logged in to do that"] unless logged_in?
    redirect_to new_session_url unless logged_in?
  end

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def already_logged_in
    redirect_to subs_url if logged_in?
  end

  def all_subs
    Sub.all
  end

end
