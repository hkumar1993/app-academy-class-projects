require 'rspec'
require 'towers_of_hanoi'

describe 'TowersOfHanoi' do
  subject(:game) { TowersOfHanoi.new }
  let(:initial_board) { [[1, 2, 3], [], []] }
  describe '#initialize' do
    it "initializes game array" do
      expect(game.board).to eq(initial_board)
    end
  end

  describe "#move" do
    let(:move_board) { [[2, 3], [1], []] }
    before(:each) { game.move(0, 1) }
    it 'moves piece from start position to end position' do
      expect(game.board).to eq(move_board)
    end
    it 'shifts piece from beginning of array' do
      expect(game.board[0]).to eq( [2, 3] )
    end
    it 'unshifts new piece at end position' do
      game.move(1, 0)
      expect(game.board[0]).to eq([1, 2, 3])
    end
    it 'raises error if there is no piece at start position' do
      expect{ game.move(2,0) }.to raise_error("start position empty")
    end
    it 'raises error if piece at end position is larger than starting piece' do
      expect{ game.move(0,1) }.to raise_error("end piece too small")
    end
    it 'raise error if start and end position are same' do
      expect{ game.move(0,0) }.to raise_error("you aren't moving any piece")
    end
  end

  describe '#won?' do
    before(:each) do
      game.move(0,1)
      game.move(0,2)
      game.move(1,2)
      game.move(0,1)
      game.move(2,0)
      game.move(2,1)
    end
    it 'returns true when tower moved to other position' do
      game.move(0,1)
      expect(game.won?).to be true
    end
    it 'returns false if tower is not created' do
      expect(game.won?).to be false
    end
    it 'returns false if tower is at initial position' do
      game = TowersOfHanoi.new
      expect(game.won?).to be false
    end
  end
end
