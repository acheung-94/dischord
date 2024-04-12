# Welcome to Dischord.
*(no, that's not a typo, this is just the Discord you have at home)*
[Join the chat here!](https://dischord.onrender.com)
[View the Wiki page here!](https://github.com/acheung-94/dischord/wiki)
## What is Dischord?
Dischord is a clone of [Discord](www.discord.com), a web based messaging application. Users can sign in and view their groups ('servers') and message other group members in real time. Users can own multiple servers, as well as become members of multiple servers. Each server can have multiple chat channel instances, but always start with a default general chat channel. Users can view other users, add them as friends, and block them (just in case).

## MVP

### 1. Hosting (0.5 days)
### 2. User Authentication (1 - 2 days)
- Users need to be signed in to use all features of this application.
- There are 2 demo users that can be used to try out features.
### 3. Users can create and join servers (2 - 3 days)
- Users can create and join multiple servers, but servers can only have one owner.
- Users have full CRUD power for their own servers.
- Members can access all channels/messages, and edit the server/channel names. They may not delete the server.
- Servers will display members in a toggleable panel. 
- AWS integration for uploading/editing your own server icons.
### 4. Servers can host multiple channels ( 2 - 3 days)
- Members have full CRUD for server channels
### 5. Users can message in channels (2 - 3 days)
- Action Cable / Websockets support for live messaging in channels
- AWS integration for image attachments (after all, what's a messaging app without cat GIFs?)
- Users have full CRUD for their own messages. 
- Messages are time stamped and sectioned by date.
### 6. Users can search for other users (1 - 2 days)
- They may search by username, or enter an empty search to view all the members that they're eligible to friend.
- Users can send requests to users that meet the following conditions:
  - has not already accepted their request.
  - has not already received or sent a pending request to them.
  - user has not rejected/blocked.
- Users can invite their friends to any server they belong to. (banning users from servers is not currently implemented, they're in for life. )
### 7. Production README (0.5 days)

# FUTURE FEATURES (there's a lot)
## Direct messaging
- Channels schema is set up to accommodate belonging to a user. Memberships can be altered to include a channel_id. When a channel belongs to a user, and a user belongs to a channel owned by another user, they can message each other directly through that channel.
## Extend Websockets to friend and server invites, user login status, and implement live notifications.
- Currently, only messaging gets live broadcasts from the server. Adding this functionality to the rest of the features would enhance the overall experience. 
## Add user customization features!
- Banners, user icons, and custom status messages. 
## Add rich text & emojis to messaging
- ![fun](https://tenor.com/view/fun-will-now-commence-seven-of-nine-jeri-ryan-star-trek-voyager-gif-23357754)