module Cloudkick
  module Formatter
    
    def formatted_hash
      hash = hash_from(@environment, over_all_env_status)
      hash["children"] = []
      @nodes.each do |node|
        hash["children"] << hash_from(node.name, node.status)
      end
      hash
    end

    private

    def hash_from name, status
      value = numeric_status_value_from(status)
      {:name => name, :value => value}
    end

    def numeric_status_value_from status
      status_hash = {"ok" => 33, "warning" => 66, "error" => 100}
      upper_bound = status_hash[status.downcase]
      lower_bound = upper_bound - 33
      rand(lower_bound..upper_bound)
    end
  end
end
