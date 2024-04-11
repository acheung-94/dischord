class Api::MembershipsController < ApplicationController
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
        @user = current_user
        if @membership&.update(membership_params)
            render :index
        else
            render json: {errors: 'failed'}, status: 422
        end
    end

    def destroy
        # @membership = Membership.find_by(
        #     server_id: params[:server_id],
        #     user_id: current_user.id)
        @membership = Membership.find_by(id: params[:id])
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
