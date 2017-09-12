class Card

  attr_reader :face_value, :state

  def initialize(face_value)
    @face_value = face_value
    @state = false
  end

  def hide
    @state = false
  end

  def reveal
    @state = true
  end

  def to_s
    puts @face_value
  end

  def ==(card)
    @face_value == card.face_value
  end

end
