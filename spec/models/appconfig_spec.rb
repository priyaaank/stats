require 'spec_helper'

describe Appconfig do

  context "Aws config" do
    let(:mock_aws_yml) { File.read("./spec/fixtures/fake_aws_config.yml") } 

    before do 
      mock_yml_content = mock_aws_yml
      File.should_receive(:read).with("./config/aws_config.yml").and_return(mock_yml_content)
    end

    it "should load all the configs from config files" do
      Appconfig.aws["key"].should eq "the_awesome_key"
      Appconfig.aws["secret"].should eq "the_awesome_secret"
    end
  end

  context "Cloudkick config" do
    let(:mock_cloudkick_yml) { File.read("./spec/fixtures/fake_cloudkick_config.yml") } 

    before do 
      mock_yml_content = mock_cloudkick_yml
      File.should_receive(:read).with("./config/cloudkick_config.yml").and_return(mock_yml_content)
    end

    it "should load all the configs from config files" do
      Appconfig.cloudkick["key"].should eq "the_awesome_key"
      Appconfig.cloudkick["secret"].should eq "the_awesome_secret"
    end
  end

end
