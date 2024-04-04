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

    def destroy
        @membership = Membership.find_by(
            server_id: params[:server_id],
            user_id: current_user.id)

        if @membership
            @membership.destroy #this should also destroy all dependent associations
            head :no_content
        else
            render json: {errors: 'Failed'}, status: 404
        end
    end
    private
    def membership_params
        params.require(:memberships).permit(:server_id, :user_id)
    end

end
