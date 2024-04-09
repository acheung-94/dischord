class ChannelsChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    p 'hello!'
    channel = Channel.find_by(id: params[:channelId])
    stream_for channel
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    p 'goodbye!'
  end
end
