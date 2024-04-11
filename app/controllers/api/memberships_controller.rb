class Api::MembershipsController < ApplicationController
    wrap_parameters include: Membership.attribute_names + ['serverId', 'userId']
    def index
        @memberships = current_user.pending_memberships
        render :index
    end
    
    def create
        @membership = Membership.new(membership_params)
        @user = current_user
        if @membership.save
            head :no_content
        else
            render json: {errors: 'Failed'}, status: 422
        end
    end

    def update
        @membership = Membership.find_by(id: params[:id])
        @memberships = current_user.pending_memberships
        if @membership&.update(membership_params)
            render :index
        else
            render json: {errors: 'failed'}, status: 422
        end
    end

    def destroy
        @membership = Membership.find_by(id: params[:id])
        if @membership
            @membership.destroy
            head :no_content
        else
            render json: {errors: 'Failed'}, status: 404
        end
    end

    private
    def membership_params
        params.require(:membership).permit(:server_id, :user_id, :status)
    end

end
