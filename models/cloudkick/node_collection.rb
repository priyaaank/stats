class NodeCollection
  include Cloudkick::Formatter

  attr_accessor :nodes, :environment

  def initialize(nodes = [], env)
    @nodes       = nodes
    @environment = env
  end

  def update_nodes_statuses node_status_hash
    @nodes.each { |node| node.status = node_status_hash[node.id].downcase }
  end

  def over_all_env_status
    uniq_status = @nodes.map(&:status).compact.uniq
    return "error" if uniq_status.include?("error")
    return "warning" if uniq_status.include?("warning")
    "ok"
  end

end
