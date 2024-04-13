# Welcome to Dischord.
*(no, that's not a typo, this is just the Discord you have at home™)*
- [Join the chat here!](https://dischord.onrender.com)
- [View the Wiki page here!](https://github.com/acheung-94/dischord/wiki)
## What is Dischord?
Dischord is a clone of [Discord](www.discord.com), a web based messaging application. Users can sign in and view their groups ('servers') and send memes and GIFs to other group members in real time. Users can own multiple servers, as well as become members of multiple servers. Each server can have multiple chat channel instances, but always start with a default general chat channel. Users can view other users, add them as friends, and block them (just in case).
## Tech Stack

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![ror](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![aws](https://img.shields.io/badge/Amazon_AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white)
![PSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![css](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

## Highlights
### Detailed cloning
- Every visual and functional detail in this project has been lovingly recreated from the beloved gaming-turned-community-building chat app.
- The server list, to me, is one of the most iconic and recognizable parts of this application, so great care was taken to ensure icons behaved and appeared very similar to the real Discord's.
### Live Messaging
- Nobody wants to have to reload the page to view the cat GIFs their friends are sending them.
- Through Action Cable, the current Dischord server channel on the frontend establishes a stateful, persistent WebSockets connection with the Rails server and receives broadcasted updates whenever a message is created, updated, or destroyed. Those changes are transmitted to Redux and the content renders live, allowing instant messaging and meme-sharing.
```js
    useEffect(() => {
        if (type === 'channel') {

            dispatch(getChannelMessages(channelId))
            const sub = consumer.subscriptions.create( {
                channel: 'ChannelsChannel',
                channelId
            }, {
                received(message){
                    if (message.type === 'delete'){
                        dispatch(deleteMessage(message.messageId))
                    }else{
                        dispatch(addMessage(message))
                    }
                }
            })
            return () => consumer.subscriptions.remove(sub)
        }
    }, [channelId])
```    
### User Search
- Making friends can be hard. Rails makes it easy! The user search feature leverages Rails associations and scopes to return users that meet a list of criteria. This filtering allows the end user to find a *new* friend without causing any database conflicts. Users can friend other users that aren't already somewhere on their accepted or pending friends list, can restore users that they've rejected back to their friends list *(water under the bridge and all that)*, or unblock them entirely, and allow them to send or receive a request from them again. 
```ruby
    def self.filtered_user_results(username, current_user)
        friend_ids = current_user.friends.pluck(:id) #can't search friends
        enemy_ids = current_user.enemies.pluck(:id) #can't search enemies
        pending_ids = current_user.pending #can't search pending
        bad_ids = [current_user.id] + friend_ids + enemy_ids + pending_ids #can't search themselves
        self.where("username LIKE ?", "%#{username}%")
            .where.not(id: bad_ids ) 
    end
```

## What's next? (there's a lot)
### Direct messaging
- Channels schema is set up to accommodate belonging to a user. Memberships can be altered to include a channel_id. When a channel belongs to a user, and a user belongs to a channel owned by another user, they can message each other directly through that channel.
### Extend Websockets to friend and server invites, user login status, and implement live notifications.
- Currently, only messaging gets live broadcasts from the server. Adding this functionality to the rest of the features would enhance the overall experience. 
### Add user customization features!
- Banners, user icons, and custom status messages. 
### Add rich text & emojis to messaging
 ![fun](https://dischord-clone-prod.s3.us-west-1.amazonaws.com/gtzds0ea81ya7pk9anjxodrz3jai?response-content-disposition=inline%3B%20filename%3D%22fun-will-now-commence-seven-of-nine.gif%22%3B%20filename%2A%3DUTF-8%27%27fun-will-now-commence-seven-of-nine.gif&response-content-type=image%2Fgif&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAYS2NU7ASYFEPTEJN%2F20240413%2Fus-west-1%2Fs3%2Faws4_request&X-Amz-Date=20240413T171345Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Signature=92f3fc83e75094d6afda61763f44d27269a5fab0a901c015adf5b6be8bc30234)