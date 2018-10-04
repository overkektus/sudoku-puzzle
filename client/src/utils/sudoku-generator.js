const _ = require('lodash');

class SudokuGenerator {

  constructor(size) {
    this.size = size;
    this.matrix = this.generateMatrix();
  }

  generateMatrix() {
    let matrix = Array(this.size);
    for(let i = 0; i < matrix.length; i++) {
      matrix[i] = Array(this.size);
    }

    for(let row = 0; row < matrix.length; row++) {
      for(let column = 0; column < matrix.length; column++) {
        let number = Math.floor((row * 3 + row / 3 + column) % (3*3) + 1);
        matrix[row][column] = number;
      }
    }
    return matrix;
  }

  transposing(matrix) {
    return _.zip.apply(_, matrix);
  }

  swapRowsSmall(matrix) {
    const shuffledMartix = _.cloneDeep(matrix);

    const area = _.random(0, 2);
    const row1 = _.random(0, 2);
    let   row2 = _.random(0, 2);

    while(row1 === row2) {
      row2 = _.random(0, 2);
    }

    const N1 = area * 3 + row1;
    const N2 = area * 3 + row2;

    const temp = shuffledMartix[N1];

    shuffledMartix[N1] = shuffledMartix[N2];
    shuffledMartix[N2] = temp;

    return shuffledMartix;
  }

  swapColumsSmall(matrix) {
    let shuffledMartix = _.cloneDeep(matrix);

    shuffledMartix = this.transposing(shuffledMartix);
    shuffledMartix = this.swapRowsSmall(shuffledMartix);
    shuffledMartix = this.transposing(shuffledMartix);

    return shuffledMartix;
  }

  swapRowsArea(matrix) {
    const shuffledMartix = _.cloneDeep(matrix);

    const area1 = _.random(0, 2);
    let   area2 = _.random(0, 2);

    while(area1 === area2) {
      area2 = _.random(0, 2);
    }

    for(let i = 0; i < 3; i++) {
      let N1 = area1 * 3 + i;
      let N2 = area2 * 3 + i;

      let temp = shuffledMartix[N1];

      shuffledMartix[N1] = shuffledMartix[N2];
      shuffledMartix[N2] = temp;
    }

    return shuffledMartix;
  }

  swapColumsArea(matrix) {
    let shuffledMartix = _.cloneDeep(matrix);

    shuffledMartix = this.transposing(shuffledMartix);
    shuffledMartix = this.swapRowsArea(shuffledMartix);
    shuffledMartix = this.transposing(shuffledMartix);

    return shuffledMartix;
  }

  swap(count) {
    do {
      let operationCode = _.random(0, 4);

      switch(operationCode) {
        case 0:
          this.matrix = this.transposing(this.matrix);
          break;
        case 1:
          this.matrix = this.swapRowsSmall(this.matrix);
          break;
        case 2:
          this.matrix = this.swapColumsSmall(this.matrix);
          break;
        case 3:
          this.matrix = this.swapRowsArea(this.matrix);
          break;
        case 4:
          this.matrix = this.swapColumsArea(this.matrix);
          break;
        default:
          this.matrix = this.transposing(this.matrix);
      }
      count--;
    } while(count > 0);
  }

  generate() {
    this.swap(10);
    return this.matrix;
  }
}

export default SudokuGenerator;1
