class Queue
  def initialize
    @queue_interface = RightAws::SqsGen2.new(Appconfig.aws["key"], Appconfig.aws["secret"])
  end

  def list
    @queue_interface.queues
  end
end
