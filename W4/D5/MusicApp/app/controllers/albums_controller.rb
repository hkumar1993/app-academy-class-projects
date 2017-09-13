class AlbumsController < ApplicationController
  def new
    render :new
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      redirect_to band_url(@album.band_id)
    else
      flash[:errors].errors.full_messages
      redirect_to new_band_album_url
    end
  end

  def edit
    @album = Album.find(params[:id])
    render :edit
  end

  def update
    @album = Album.find(params[:id])
    if @album.updated_attributes(album_params)
      redirect_to band_url(@album.band_id)
    else
      flash[:errors].errors.full_messages
      redirect_to edit_band_url
    end
  end

end
