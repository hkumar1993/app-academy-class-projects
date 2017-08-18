require 'rspec'
require 'trial'

describe 'Array' do
  describe '#my_uniq' do
    it 'returns a unique array' do
      expect([1,2,1,3,3].my_uniq).to eq([1,2,3])
    end
  end

  describe '#two_sum' do
    let(:test_array) { [-1,0,2,-2,1] }
    it 'finds all pairs of positions' do
      expect(test_array.two_sum).to eq([[0, 4], [2, 3]])
    end

    it 'returns array in order' do
      expect(test_array.two_sum).to_not eq([[2,3], [0,4]])
    end
  end

  describe '#my_transpose' do
    let(:test_array) {[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]}
    let(:transposed_array) {[
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ]}
    it 'transposes the array' do
      expect(test_array.my_transpose).to eq(transposed_array)
    end
    it 'transposes both ways' do
      expect(transposed_array.my_transpose).to eq(test_array)
    end
  end

  describe '#stock_picker' do
    let(:stocks) { [1,4,1,1,3,5,2]}
    it 'returns pair of days with highest sell value' do
      expect(stocks.stock_picker).to eq([0, 5])
    end

    it 'returns nil if stock array is empty' do
      expect([].stock_picker).to be_nil
    end

    it 'displays don\'t buy if profit is negative' do
      expect{ [5,4,2].stock_picker }.to raise_error("DANGER : Don't Buy")
    end
  end


end
