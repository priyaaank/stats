class Queue
  def initialize
    @queue_interface = RightAws::SqsGen2.new(
      Appconfig.aws["key"] || ENV['AWS_ACCESS_KEY_ID'],
      Appconfig.aws["secret"] || ENV['AWS_SECRET_KEY'])
  end

  def list
    @queue_interface.queues
  end
end
