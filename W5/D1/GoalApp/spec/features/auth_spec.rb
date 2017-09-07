# spec/features/auth_spec.rb

require 'spec_helper'
require 'rails_helper'

feature 'the signup process' do
  scenario 'has a new user page' do
    visit new_user_url
    expect(page).to have_content('Sign Up')
  end

  feature 'signing up a user' do

    before(:each) do
      visit new_user_url
      fill_in 'Username', with: 'jonsnow'
      fill_in 'Password', with: 'iknownothing'
      click_button 'Sign Up'
    end

    scenario 'shows username on the homepage after signup' do
      expect(page).to have_content('jonsnow')
    end

  end
end

feature 'logging in' do

  before(:each) do
    visit new_user_url
    fill_in 'Username', with: 'jonsnow'
    fill_in 'Password', with: 'iknownothing'
    click_on 'Sign Up'

    visit new_session_url
    fill_in 'Username', with: 'jonsnow'
    fill_in 'Password', with: 'iknownothing'
    click_on 'Sign In'
  end

  scenario 'shows username on the homepage after login' do
    visit users_url
    expect(page).to have_content('jonsnow')
  end

end

feature 'logging out' do
  scenario 'begins with a logged out state' do
    visit users_url
    expect(page).to_not have_content('jonsnow')
  end

  scenario 'doesn\'t show username on the homepage after logout' do
    visit new_user_url
    fill_in 'Username', with: 'jonsnow'
    fill_in 'Password', with: 'iknownothing'
    click_on 'Sign Up'

    visit users_url
    expect(page).to have_content('jonsnow', count:2)

    click_on 'Log Out'
    expect(page).to have_content('jonsnow', count:1)

  end

end
