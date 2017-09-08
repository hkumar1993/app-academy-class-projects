require 'rspec'
require 'card'

describe 'Card' do
  subject(:card) {Card.new(5,:H)}

  describe '#initialize' do
    it 'should make a card with correct value and suit' do
      expect(card.rank).to eq(5)
      expect(card.suit).to eq(:H)
    end

    it 'should be face down at initialization' do
      expect(card.face_up).to be false
    end

    context 'if incorrect value given'do
      it 'raises error if incorrect rank given' do
        expect { Card.new(14,:H) }.to raise_error(ArgumentError)
      end

      it 'raises error if incorrect suit given' do
        expect { Card.new(1,:O) }.to raise_error(ArgumentError)
      end
    end
  end

  describe '#switch_face' do
    it 'should swap face value' do
      expect(card.face_up).to be false
      card.switch_face
      expect(card.face_up).to be true
      card.switch_face
      expect(card.face_up).to be false
    end
  end

  describe '#<=>' do
    context 'compares ranks of cards' do
      let(:small_card) {Card.new(4,:C)}
      let(:equal_card) {Card.new(5,:D)}
      let(:big_card) {Card.new(6,:H)}
      it 'returns -1 if first card rank is less than second card rank ' do
        expect(card <=> big_card).to eq(-1)
      end

      it 'returns 0 if ranks are the same' do
        expect(card <=> equal_card).to eq(0)
      end

      it 'returns -1 if first card rank is more than second card rank' do
        expect(card <=> small_card).to eq(1)
      end

    end
  end


end
