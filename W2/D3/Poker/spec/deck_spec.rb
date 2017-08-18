require 'rspec'
require 'deck'

describe 'Deck' do
  subject(:deck) {Deck.new}

  describe '#initialize' do
    it 'creates a deck of 52 cards' do
      expect(deck.cards.length).to eq(52)
    end
    it 'needs each card to be unique' do
      expect(deck.cards.uniq).to eq(deck.cards)
    end

  end

  describe '#take' do
    it 'removes one card from the deck by default' do
      deck.take
      expect(deck.cards.length).to eq(51)
    end

    it 'removes n cards from the deck' do
      deck.take(5)
      expect(deck.cards.length).to eq(47)
    end
  end

  describe '#shuffle!' do
    it 'changes order of deck' do
      cards = deck.cards.dup
      deck.shuffle!
      expect(deck.cards).to_not eq(cards)
    end
  end
end
