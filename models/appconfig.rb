class Appconfig

  def self.aws
    @@aws ||= YAML.load(File.read("./config/aws_config.yml"))
  end

  def self.cloudkick
    @@cloudkick ||= YAML.load(File.read("./config/cloudkick_config.yml"))
  end

end
