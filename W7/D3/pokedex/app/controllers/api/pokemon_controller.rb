class Api::PokemonController < ApplicationController

  def index
    @pokemon = Pokemon.all
    # render json: index
  end

  def show
    @pokemon = Pokemon.find(params[:id])
  end

end
