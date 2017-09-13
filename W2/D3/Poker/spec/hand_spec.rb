require 'rspec'
require 'hand'
require 'byebug'

describe 'Hand' do

  let(:card1) { double("card", :rank =>5, :suit => :D)}
  let(:card2) { double("card", :rank =>3, :suit => :H)}
  let(:card3) { double("card", :rank =>2, :suit => :C)}
  let(:card4) { double("card", :rank =>7, :suit => :D)}
  let(:card5) { double("card", :rank =>1, :suit => :S)}
  subject(:hand) { Hand.new([card1,card2,card3,card4,card5]) }

  describe '#initialize' do
    it 'initializes hand with 5 cards' do
      expect(hand.cards.length).to eq(5)
    end

    it 'initializes hand with 5 unique cards' do
      expect(hand.cards.uniq).to eq(hand.cards)
    end

    it 'initializes rank as 10' do
      expect(hand.rank).to eq(10)
    end
  end

  describe '#drop_and_take' do
    it 'drops and replaces 1 card from the hand by default'
    # do
    #   dup_hand = hand.cards.dup
    #   hand.drop_and_take
    #   new_cards = hand.cards.reject {|card| dup_hand.include?(card)}.dup
    #   expect(new_cards.length).to eq(1)
    # end
    it 'drops and replaces n cards from the hand'
    # do
    #   dup_hand = hand.cards.dup
    #   hand.drop_and_take(3)
    #   new_cards = hand.cards.reject {|card| dup_hand.include?(card)}.dup
    #   expect(new_cards.length).to eq(3)
    # end
    it 'raises an error if attempting to drop more than five cards'
    #  do
    #   expect { hand.drop_and_take(6) }.to raise_error(ArgumentError)
    # end
  end

  describe '#high_card' do
    it 'sets rank to 9 if no other set is found' do
      hand.high_card
      expect(hand.rank).to eq(9)
    end
  end

  describe '#one_pair' do
    let(:card1) { double("card", :rank =>3, :suit => :D)}
    let(:one_pair_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 8 if one pair found' do
      one_pair_hand.one_pair
      expect(one_pair_hand.rank).to eq(8)
    end

    it 'call high card if one pair not found' do
      expect(hand).to receive(:high_card)
      hand.one_pair
    end
  end

  describe '#two_pair' do
    let(:card1) { double("card", :rank =>3, :suit => :D)}
    let(:card3) { double("card", :rank =>7, :suit => :C)}
    let(:two_pair_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 7 if two pair found' do
      two_pair_hand.two_pair
      expect(two_pair_hand.rank).to eq(7)
    end

    it 'call one_pair if two pair not found' do
      expect(hand).to receive(:one_pair)
      hand.two_pair
    end
  end

  describe '#three_ofa_kind' do
    let(:card1) { double("card", :rank =>7, :suit => :H)}
    let(:card3) { double("card", :rank =>7, :suit => :C)}
    let(:three_ofa_kind_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 6 if three of a kind found' do
      three_ofa_kind_hand.three_ofa_kind
      expect(three_ofa_kind_hand.rank).to eq(6)
    end

    it 'call two_pair if three of a kind not found' do
      expect(hand).to receive(:two_pair)
      hand.three_ofa_kind
    end
  end

  describe '#straight' do
    let(:card4) { double("card", :rank =>4, :suit => :D)}
    let(:straight_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 5 if straight is found' do
      straight_hand.straight
      expect(straight_hand.rank).to eq(5)
    end

    it 'call three of a kind if straight not found' do
      expect(hand).to receive(:three_ofa_kind)
      hand.straight
    end
  end

  describe '#flush' do
    let(:card2) { double("card", :rank =>3, :suit => :D)}
    let(:card3) { double("card", :rank =>2, :suit => :D)}
    let(:card5) { double("card", :rank =>1, :suit => :D)}
    let(:flush_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 4 if flush is found' do
      flush_hand.flush
      expect(flush_hand.rank).to eq(4)
    end

    it 'call straight if flush not found' do
      expect(hand).to receive(:straight)
      hand.flush
    end
  end

  describe '#full_house' do
    let(:card1) { double("card", :rank =>5, :suit => :D)}
    let(:card2) { double("card", :rank =>5, :suit => :H)}
    let(:card3) { double("card", :rank =>2, :suit => :C)}
    let(:card4) { double("card", :rank =>2, :suit => :D)}
    let(:card5) { double("card", :rank =>2, :suit => :S)}
    let(:full_house_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 3 if full_house is found' do
      full_house_hand.full_house
      expect(full_house_hand.rank).to eq(3)
    end

    it 'call flush if full_house not found' do
      expect(hand).to receive(:flush)
      hand.full_house
    end
  end

  describe '#four_ofa_kind' do
    let(:card1) { double("card", :rank =>5, :suit => :D)}
    let(:card2) { double("card", :rank =>2, :suit => :H)}
    let(:card3) { double("card", :rank =>2, :suit => :C)}
    let(:card4) { double("card", :rank =>2, :suit => :D)}
    let(:card5) { double("card", :rank =>2, :suit => :S)}
    let(:four_ofa_kind_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 2 if four of a kind found' do
      four_ofa_kind_hand.four_ofa_kind
      expect(four_ofa_kind_hand.rank).to eq(2)
    end

    it 'call full_house if four of a kind not found' do
      expect(hand).to receive(:full_house)
      hand.four_ofa_kind
    end
  end

  describe '#straight_flush' do
    let(:card1) { double("card", :rank =>5, :suit => :D)}
    let(:card2) { double("card", :rank =>3, :suit => :D)}
    let(:card3) { double("card", :rank =>2, :suit => :D)}
    let(:card4) { double("card", :rank =>4, :suit => :D)}
    let(:card5) { double("card", :rank =>1, :suit => :D)}
    let(:straight_flush_hand) { Hand.new([card1,card2,card3,card4,card5]) }
    it 'sets ranks to 1 if straight_flush is found' do
      straight_flush_hand.straight_flush
      expect(straight_flush_hand.rank).to eq(1)
    end

    it 'call four_ofa_kind if straight_flush not found' do
      expect(hand).to receive(:four_ofa_kind)
      hand.straight_flush
    end
  end

end
