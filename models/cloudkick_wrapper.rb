class CloudkickWrapper

  include HTTParty
  base_uri 'https://api.cloudkick.com'
  API_VERSION = "2.0"
  
  def initialize
    @oauth_token = fetch_access_token(Appconfig.cloudkick["key"], Appconfig.cloudkick["secret"])
  end

  def updated_status_hash_for_all_nodes_of env
    collection = NodeCollection.new(nodes_for(env), env)
    collection.update_nodes_statuses(instance_with_overall_status_for(env))
    collection.formatted_hash
  end

  private 

  def nodes_for env
    url = "/#{API_VERSION}/nodes?oauth_token=#{@oauth_token}"
    options = {"query" => "tag:#{env}"}
    url = append_options_to(url, options)
    hash = OpenStruct.new(CloudkickWrapper.get(url))
    hash.items.collect {|node| Cloudkick::Node.new(node) }
  end

  def instance_with_overall_status_for env
    url = "/#{API_VERSION}/status/nodes?oauth_token=#{@oauth_token}"
    options = {"query" => "tag:#{env}"}
    url = append_options_to(url, options)
    hash = CloudkickWrapper.get(url)
    hash.inject({}) {|hash, (node_id, status)| hash[node_id] = status['overall_check_statuses']; hash;}
  end

  def append_options_to url, options
    options.inject(url) {|u, (k,v)| u = u + "&#{k}=#{v}"; u}
  end

  def fetch_access_token key, secret
    url = '/oauth/token'
    options = {:body => {"client_id" => key, "client_secret" => secret, 
                         "grant_type" => "client_credentials"           } }
    resp = CloudkickWrapper.post(url, options)
    resp["access_token"]
  end

end
