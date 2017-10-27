class Api::BenchesController < ApplicationController
  def index
    @benches = Bench.all
    render :index
  end

  def show
    @bench = Bench.find(params[:id])
    render :show
  end

  def create
    @bench = Bench.create!(bench_params)
    render :show
  end
end
