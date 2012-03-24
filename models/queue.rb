class Queue
	def initialize
		@queue_interface = RightAws::Sqs
	end

	def list
		@queue_interface.queues
	end
end