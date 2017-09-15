json.current_user do
  if logged_in?
    json.partial! 'api/users/user'
  end
end
json.errors @errors
