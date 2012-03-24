require 'spec_helper'

describe Appconfig do
	
	context "initialization" do

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

end