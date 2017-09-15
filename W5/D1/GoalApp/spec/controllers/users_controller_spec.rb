require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe 'GET #index' do
    it "renders index page" do
      get :index
      expect(response).to render_template('index')
    end
  end

  describe 'GET #show' do
    it "renders show page" do
      post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
      user = User.last
      get :show, params: {id: user.id}
      expect(response).to render_template('show')
    end
  end

  describe 'GET #new' do
    it "renders new user" do
      get :new
      expect(response).to render_template('new')
    end
  end

  describe 'POST #create' do
    context "with invalid params" do
      it "validates presence of username and password" do
        post :create, params: { user: {username:'jonsnow', password:''}}
        expect(response).to render_template('new')
        expect(flash[:errors]).to be_present
      end

      it "validates password length" do
        post :create, params: { user: {username:'jonsnow', password:'snow'}}
        expect(response).to render_template('new')
        expect(flash[:errors]).to be_present
      end

    end

    context "with valid params" do
      it "redirects to user page" do
        post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
        user = User.last
        expect(response).to redirect_to(user_url(user))
      end
    end
  end
end
