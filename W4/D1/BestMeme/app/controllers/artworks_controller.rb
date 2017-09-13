class ArtworkController < ApplicationController
  def index
    # @artworks = Artwork.all
    render json: Artwork.all
  end

  def create
    @artwork = Artwork.new(artwork_params)
    if @artwork.save
      render json: @artwork.to_json
    else
      render json: @artwork.errors.full_messages, status: unprocessable_entity
    end
  end

  def show
    if @artwork = Artwork.find_by(id: params[:id])
      render json: @artwork.to_json
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  def destroy
    if @artwork = Artwork.find_by(id: params[:id])
      @artwork.destroy
      redirect_to '/users'
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  def update
    if @artwork = Artwork.find_by(id: params[:id])
      @artwork.update_attributes(user_params)
      if @artwork.save
        render json: @artwork
      else
        render json: @artwork.errors.full_messages, status: :unprocessable_entity
      end
    else
      render plain: "No user by id : #{params[:id]}"
    end
  end

  private

  def artwork_params
    params.require(:artworks).permit(:title, :image_url, :artist_id)
  end

end
