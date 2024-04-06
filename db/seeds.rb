# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'open-uri'

ActiveRecord::Base.connection.tables.each do |t|
     ActiveRecord::Base.connection.reset_pk_sequence!(t)
end
demo_1 = User.create(
     username: 'demo1',
     display_name: 'demo user 1',
     password: 'themostsecure',
     email: 'demo1@demo.com',
     ) 
file = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/demo1.png')
demo_1.avatar.attach(io: file, filename: 'demo1.jpg')
demo_2 = User.create(
    username: 'demo2', 
    display_name: 'demo user 2', 
    password: 'themostsecure2', 
    email: 'demo2@demo.com' )

s1 = Server.create(name: 'test server', owner_id: 1)
s2 = Server.create(name: 'App Academy Lite', owner_id: 2)
s3 = Server.create(name: 'Wow!', owner_id: 1)
file2 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/20230620_101013.jpg')
s3.server_icon.attach(io: file2, filename: 'wowdog.jpg')


Membership.create(user_id: 2, server_id: 2) #owner
Membership.create(user_id: 2, server_id: 1)
Membership.create(user_id: 1, server_id: 1) #owner
Membership.create(user_id: 1, server_id: 3) #owner
Membership.create(user_id: 1, server_id: 2)

Channel.create(name: 'general', server_id: 1)
Channel.create(name: 'cats only', server_id: 1)
Channel.create(name: 'dogs only', server_id: 1)
Channel.create(name: 'general', server_id: 2)
Channel.create(name: 'general', server_id: 3)
Channel.create(name: 'DM-test', user_id: 1)
Channel.create(name: 'DM-test', user_id: 1)

Message.create(body: 'first message!', channel_id: 1, author_id: 1)
Message.create(body: 'wow this is sooooo cool', channel_id: 1, author_id: 2)
Message.create(body: 'what am i doing', channel_id: 5, author_id: 1)
Message.create(body: 'meow~', channel_id: 2, author_id: 1)
Message.create(body: 'wooof!', channel_id: 3, author_id: 2)