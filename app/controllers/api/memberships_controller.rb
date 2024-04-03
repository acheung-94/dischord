class Api::MembershipsController < ApplicationController
    def create
        @membership = Membership.new(membership_params)
        @user = current_user
        if @membership.save
            render 'api/servers/index'
        else
            render json: {errors: 'Failed'}, status: 422
        end
    end

    private
    def membership_params
        params.require(:memberships).permit(:server_id, :user_id)
    end

end
