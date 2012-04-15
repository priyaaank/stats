class S3

  def initialize(name)
    @s3     = RightAws::S3Interface.new(Appconfig.aws["key"], Appconfig.aws["secret"])
    @bucket = name
  end

  def space_occupied_by file_prefix = nil
    calculate_storage(file_prefix)
  end

  private

  def calculate_storage(file_prefix)
    keys = @s3.list_bucket(@bucket, {"prefix" => file_prefix })
    space = keys.inject(0) { |size, file| size  = size + file[:size] }
    [keys.size, space]
  end
end
