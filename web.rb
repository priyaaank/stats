['yaml', 'right_aws', 'sinatra/base', 'json'].each {|r| require r }
Dir["mixins/**/*.rb"].sort.each {|file| require_relative file if file.include?(".rb") }
Dir["models/**/*.rb"].sort.each {|file| require_relative file if file.include?(".rb") }

class Web < Sinatra::Base

  get '/' do
    erb :base
  end

  get '/gauges' do
    erb :gauges
  end

  get '/data/:env/sqs.json' do
    content_type :json
    status 200
    queue_data_hash(params[:env]||'prod').to_json
  end

  private

  def queue_data_for env
    queues = Queue.new.list
    queues.select {|queue| queue.name.downcase.include?(env)}
  end

  def queue_data_hash env
    queue_data_for(env).inject({}) {|hash,queue| hash[queue.name] = queue.size; hash}
  end

end
