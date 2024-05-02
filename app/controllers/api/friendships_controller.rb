# require 'memory_profiler'
class Api::FriendshipsController < ApplicationController

    wrap_parameters include: Friendship.attribute_names + ['senderId', 'recipientId']

    def index
        # report = MemoryProfiler.report do
        @current_user = current_user
        render :index
        # end
        # report.pretty_print(to_file: '/home/acheung/Assignments/fullstack-dischord/dischord/reports.txt')
    end

    def create
        @friendship = Friendship.new(friendship_params)
        if @friendship.save
            @current_user = current_user
            render :index
        else
            render json: @friendship.errors.full_messages, status: 422
        end
    end

    def update #initiated by recipient (for now) 0
        @friendship = Friendship.find_by(id: params[:id])
        if @friendship&.update(friendship_params)
            @current_user = current_user
            render :index
        else
            render json: {errors: @friendship.errors.full_messages}, status: 404
        end
    end

    def destroy
        @friendship = Friendship.find_by(id: params[:id])
        if @friendship
            @friendship.destroy
            @current_user = current_user
            head :no_content
        else
            render json: {errors: 'could not destroy'}, status: 404
        end
    end

    private

    def friendship_params
        params.require(:friendship).permit(:sender_id, :recipient_id, :status)
    end
end
