class Appconfig

  def self.aws
    @@aws ||= YAML.load(File.read("./config/aws_config.yml"))
  end

end
