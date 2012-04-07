module Cloudkick
  class Node

    ENV_TAG_ID   = [  ::Appconfig.cloudkick["env_tag"]  ]
    ROLE_TAGS    = [  ::Appconfig.cloudkick["work_tag"],
                      ::Appconfig.cloudkick["weba_tag"],
                      ::Appconfig.cloudkick["api_tag"],
                      ::Appconfig.cloudkick["spi_tag"],
                      ::Appconfig.cloudkick["sear_tag"],
                      ::Appconfig.cloudkick["scre_tag"],
                      ::Appconfig.cloudkick["lice_tag"],
                      ::Appconfig.cloudkick["mong_tag"]
                   ]

    attr_accessor :id, :role, :name, :status, :environment

    def initialize(node_json)
      unless node_json.nil?
        @id   = node_json["id"]
        @environment = select_value_for_tag_id(node_json["tags"], ENV_TAG_ID)
        @name = @role = select_value_for_tag_id(node_json["tags"], ROLE_TAGS)
        @status = "ok"
      end
    end

    private

    def select_value_for_tag_id(tags, tag_id)
      unless tags.nil? 
        tag = tags.select { |t| t if tag_id.include?(t['id']) }.first
        return (tag.nil? ? "" : tag["name"])
      end
    end

  end
end
