require 'yaml'
require 'right_aws'
require 'sinatra/base'

Dir["mixins/**/*.rb"].sort.each {|file| require_relative file if file.include?(".rb") }
Dir["models/**/*.rb"].sort.each {|file| require_relative file if file.include?(".rb") }

class Web < Sinatra::Base

  get '/' do
    "Dragons be here!"
  end

  get '/sqs' do
    queues = Queue.new.list
    names = queues.map(&:name).join(",")
    status 200
    body names
  end

end
