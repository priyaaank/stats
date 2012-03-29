require 'spec_helper'

describe Queue do

  context "listing" do
    context "when queues are present" do
      let(:queues) {["queue_for_superhero_rescue_events", "queue_for_intergalactic_travel"]}

      before do
        RightAws::SqsGen2.stub_chain(:new, :queues).and_return(queues)
      end

      it "should return all queues" do
        Queue.new.list.should eq queues
      end
    end

    context "when there are no queues" do
      let(:queues) {[]}

      before do
        RightAws::SqsGen2.stub_chain(:new, :queues).and_return(queues)
      end

      it "should return an empty list" do
        Queue.new.list.should be_empty
      end
    end
  end

end
