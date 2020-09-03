let arrays = 1,
  vars = 1;
class Array {
  constructor(arr) {
    arr = arr || [];
    this.id = arrays++;
    arr.forEach((i, x) => {
      Object.defineProperty(this, x, {
        get: () => {
          return this["_" + x];
        },
        set: (x) => {
          console.log(`write cell${this.id} ${i} ${x}`);
        },
      });
      this["_" + x] = i;
      console.log(`write cell${this.id} ${i} ${x}`);
    });
    arrays++;
  }
}

class Var {
  constructor(data) {
    data = data || 0;
    this.id = vars++;
    Object.defineProperty(this, "data", {
      get: () => {
        return this._data;
      },
      set: (x) => {
        this._data = data;
        console.log(`set _${this.id} ${x}`);
      },
    });
    this.data = data;
  }
}

/*class Block {
    constructor(data) {
      data = data || 0;
      this.id = vars++;
      Object.defineProperty(this, "data", {
        get: () => {
          return this._data;
        },
        set: (x) => {
          this._data = data;
          console.log(`set _${this.id} ${x}`);
        },
      });
      this.data = data;
    }
  }*/

module.exports = { Array, Var };
