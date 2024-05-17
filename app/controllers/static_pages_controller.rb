class StaticPagesController < ActionController::Base
    def frontend_index
      render file: Rails.root.join('public', 'index.html')
    end

    def cron
      render plain: 'OK', status: 200
    end
end