# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
ActiveRecord::Base.connection.tables.each do |t|
     ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
demo_1 = User.create(
     username: 'demo1',
     display_name: 'demo user 1',
     password: 'themostsecure',
     email: 'demo1@demo.com',
     img_path: '../../assets/img/demo1.png'
     ) # will be cloud data, but for now...
demo_2 = User.create(
    username: 'demo2', 
    display_name: 'demo user 2', 
    password: 'themostsecure2', 
    email: 'demo2@demo.com' )

Server.create(name: 'test server', owner_id: 1)
Server.create(name: 'App Academy Lite', owner_id: 2)
Server.create(name: 'Wow!', owner_id: 1)

Membership.create(user_id: 2, server_id: 2)
Membership.create(user_id: 2, server_id: 1)
Membership.create(user_id: 1, server_id: 1) #owner
Membership.create(user_id: 1, server_id: 3) #owner
Membership.create(user_id: 1, server_id: 2)