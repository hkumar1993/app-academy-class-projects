class CommentsController < ApplicationController
  def show
    @comment = Comment.find(params[:id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.author_id = current_user.id
    if @comment.save
      if @comment.parent_comment_id
        redirect_to comment_url(@comment.parent_comment_id)
      else
        redirect_to post_url(@comment.post_id)
      end
    else
      flash[:errors] = @comment.errors.full_messages
      if @comment.parent_comment_id
        redirect_to comment_url(@comment.parent_comment_id)
      else
        redirect_to post_url(@comment.post_id)
      end
    end
  end

  def comment_params
    params.require(:comment).permit(:content, :post_id, :parent_comment_id)
  end
end
