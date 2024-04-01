json.user do
    json.extract! @user, :id, :email, :username, :img_path, :display_name, :created_at, :updated_at
end