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
     display_name: 'Ludwig',
     password: 'themostsecure',
     email: 'demo1@demo.com',
     ) 
avatar1 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/demo1.png')
demo_1.avatar.attach(io: avatar1, filename: 'demo1.jpg')


demo_2 = User.create(
    username: 'demo2', 
    display_name: 'Jimmy', 
    password: 'themostsecure2', 
    email: 'demo2@demo.com' )
avatar2 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/avatar-magenta.png')
demo_2.avatar.attach(io: avatar2, filename: 'magenta.png')

user_3 = User.create(
     username: 'testfriend',
     display_name: 'always confused',
     password: 'testfriend42',
     email: 'test@test.com'
)
avatar3 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/avatar-blurple.png')
user_3.avatar.attach(io: avatar3, filename: 'blurple.png')

user_4 = User.create(
     username: 'ghost',
     display_name: 'ghost',
     password: 'testfriend42',
     email: 'test2@test3.com'
)
avatar4 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/avatar-gold.png')
user_4.avatar.attach(io: avatar4, filename: 'gold.png')

user_5 = User.create(
     username: 'riskyrain',
     display_name: 'artificer4lyfe',
     password: 'dpsoversurvivability',
     email: 'test4@test.com'
)
avatar5 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/icons/avatar-green.png')
user_5.avatar.attach(io: avatar5, filename: 'green.png')

s1 = Server.create(name: 'Dota is a fun and balanced game', owner_id: 1)
s2 = Server.create(name: 'App Academy Lite', owner_id: 2)
s3 = Server.create(name: 'Wow!', owner_id: 1)
icon2 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/20230620_101013.jpg')
s3.server_icon.attach(io: icon2, filename: 'wowdog.jpg')
another_icon = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/Dota-2-Logo.png')
s1.server_icon.attach(io: another_icon, filename: 'dota2.png')
icon3 = URI.open('https://dischord-clone-seeds.s3.us-west-1.amazonaws.com/image+2.png')
s2.server_icon.attach(io: icon3, filename: 'aalogo.png')

Membership.create(user_id: 2, server_id: 2, status: 'accepted') #owner
Membership.create(user_id: 2, server_id: 1, status: 'accepted')
Membership.create(user_id: 1, server_id: 1, status: 'accepted') #owner
Membership.create(user_id: 1, server_id: 3, status: 'accepted') #owner
Membership.create(user_id: 1, server_id: 2, status: 'accepted')

s1.default_channel = Channel.create(name: 'general', server_id: s1.id)
s1.save
Channel.create(name: 'meta-discussions', server_id: 1)
Channel.create(name: 'off-topic', server_id: 1)
s2.default_channel = Channel.create(name: 'general', server_id: s2.id)
s2.save
Channel.create(name: 'notes-resources', server_id: 2)
s3.default_channel = Channel.create(name: 'general', server_id: s3.id)
s3.save
Channel.create(name: 'cats-only', server_id: 3)
Channel.create(name: 'dogs-only', server_id: 3)
Channel.create(name: 'DM-test', user_id: 1)
Channel.create(name: 'DM-test', user_id: 1)

Message.create(body: 'first message!', channel_id: 1, author_id: 1)
Message.create(body: 'wow this is sooooo cool', channel_id: 1, author_id: 2)
Message.create(body: 'what am i doing', channel_id: 5, author_id: 1)
Message.create(body: 'meow~', channel_id: 2, author_id: 1)
Message.create(body: 'wooof!', channel_id: 3, author_id: 2)

Friendship.create(sender_id: 1, recipient_id: 2, status: 'accepted')
Friendship.create(sender_id: 1, recipient_id: 3, status: 'pending')