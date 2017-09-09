require 'rails_helper'

RSpec.describe SessionsController, type: :controller do

  describe 'GET #new' do
    it "renders new session (sign in)" do
      get :new
      expect(response).to render_template('new')
    end
  end

  describe 'POST #create' do

    context "with invalid params" do
      it "renders new page when given invalid parameters" do
        post :create, params: { user: {username:'jonsnow', password:''}}
        expect(response).to render_template('new')
        expect(flash[:errors]).to be_present
      end
    end

    context "with valid params" do
      # before(:each) do
      # end

      it "logs user in" do
        user = User.create!(username:'jonsnow',password:'iknownothing')
        post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
        expect(controller.current_user).to eq(user)
      end

      it "redirects to user page" do
        user = User.create!(username:'jonsnow',password:'iknownothing')
        post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
        expect(response).to redirect_to(user_url(user))
      end
    end
  end

  describe 'DELETE #destroy' do

    it "logs user out" do
      user = User.create!(username:'jonsnow',password:'iknownothing')
      post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
      delete :destroy
      expect(session[:session_token]).to be_nil
      expect(controller.current_user).to be_nil
    end

    it "returns to main index" do
      user = User.create!(username:'jonsnow',password:'iknownothing')
      post :create, params: { user: {username:'jonsnow', password:'iknownothing'}}
      delete :destroy
      expect(response).to redirect_to(users_url)
    end
  end
end
