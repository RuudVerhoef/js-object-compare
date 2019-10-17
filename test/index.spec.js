const assert = require('assert');
const sut = require('../index');

describe('js object compare', function () {
  describe('#clearEmpties()', function () {
    it('should strip the nested empty objects from an object', function () {
      // Arrange
      const withEmptyObjects = { char: 'a', block1: {}, num: 2, block2: { num: 1, char: {} } };
      const expected = { char: 'a', num: 2, block2: { num: 1 } };
      // Act
      const actual = sut.clearEmpties(withEmptyObjects);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('#equalKeyValue()', function () {
    it('should give back all key/value pairs that are the same', function () {
      // Arrange
      const obj1 = { char: 'a', num: 1, block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', num: 3, block1: { char: 'c', num: 2 } };
      const expected = { char: 'a', block1: { num: 2 } };
      // Act
      const actual = sut.equalKeyValue(obj1, obj2);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('#equalKey()', function () {
    it('should give back all keys that are the same', function () {
      // Arrange
      const obj1 = { char: 'a', block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', num: 3, block1: { num: 2 } };
      const expected = { char: undefined, block1: { num: undefined } };
      // Act
      const actual = sut.equalKey(obj1, obj2);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('#in_A_ButNotIn_B()', function () {
    it('should give back all that are part of A but are not part of B', function () {
      // Arrange
      const obj1 = { char: 'a', block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', num: 3, block1: { num: 2 } };
      const expected = { block1: { char: 'b' } };
      // Act
      const actual = sut.in_A_ButNotIn_B(obj1, obj2);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
    it('should give back all that are part of B but are not part of A', function () {
      // Arrange
      const obj1 = { char: 'a', block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', num: 3, block1: { num: 2 } };
      const expected = { num: 3 };
      // Act
      const actual = sut.in_A_ButNotIn_B(obj2, obj1);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
  });
  describe('#sameContent()', function () {
    it('should give true as both objects are the same', function () {
      // Arrange
      const obj1 = { char: 'a', block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', block1: { char: 'b', num: 2 } };
      const expected = true;
      // Act
      const actual = sut.sameContent(obj1, obj2);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
    it('should give false as both objects are different', function () {
      // Arrange
      const obj1 = { char: 'a', block1: { char: 'b', num: 2 } };
      const obj2 = { char: 'a', block1: { char: 'b', num: 3 } };
      const expected = false;
      // Act
      const actual = sut.sameContent(obj1, obj2);
      // Assert
      assert.deepStrictEqual(actual, expected);
    });
  });
});