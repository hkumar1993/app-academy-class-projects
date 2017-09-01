class PostsController < ApplicationController

  before_action :require_logged_in

  def show
    @post = Post.find(params[:id])
    @comments = @post.comments
  end

  def new
    @sub_id = params[:sub_id].to_i
  end

  def create
    @post = Post.new(post_params)
    @post.author_id = current_user.id

    if @post.save
      redirect_to post_url(@post)
    else
      flash[:errors] = @post.errors.full_messages
      redirect_to new_post_url
    end
  end

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      redirect_to post_url(@post)
    else
      redirect_to edit_post_url(@post)
    end
  end

  def post_params
    params.require(:post).permit(:title, :url, :content, sub_ids:[])
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    redirect_to subs_url
  end

end
