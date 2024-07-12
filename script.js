class Node {
  constructor(key = null, value = null, next = null) {
    this._key = key;
    this._value = value;
    this.next = next;
  }
  // Getters and Setters
  get key() {
    return this._key;
  }
  get value() {
    return this._value;
  }
  set value(newValue) {
    this._value = newValue;
  }
}
class LinkedList {
  constructor(head = null) {
    this._head = head;
  }

  // Getter
  get head() {
    return this._head;
  }
  set head(node) {
    this._head = node;
  }

  // Method
  prepend(key, value) {
    // Add first
    this.head = new Node(key, value, this.head);
  }
  append(key, value) {
    // Add last
    if (this.head == null) this.head = new Node(key, value);
    else {
      let temp = this.head;
      while (temp.next != null) temp = temp.next;
      temp.next = new Node(key, value);
    }
  }
  size() {
    let count = 0;
    let temp = this.head;
    while (temp != null) {
      count++;
      temp = temp.next;
    }
    return count;
  }
  tail() {
    let temp = this.head;
    while (temp.next != null) temp = temp.next;
    return temp;
  }
  findAt(index) {
    let i = 0;
    let node = this.head;

    if (index >= this.size()) return "Out of range";
    while (node != null && i != index) {
      console.log("Current " + node.value);
      node = node.next;
      i++;
    }
    return node;
  }
  pop() {
    let node = this.head;

    while (node != null) {
      if (node.next.next == null) {
        // si el sgt es el ultimo
        node.next = null; // el ultimo se vuelve null
        break; // se termina el loop ya se borro el ultimo
      }
      node = node.next;
    }
    return node;
  }
  contains(value) {
    let itContains = false;
    let node = this.head;

    while (node != null) {
      if (node.value === value) {
        itContains = true;
        break;
      }
      node = node.next;
    }
    return itContains;
  }
  findByValue(value) {
    // Returns index
    let index = 0;
    let node = this.head;

    while (node != null) {
      if (node.value === value) {
        break;
      }
      index++;
      node = node.next;
    }
    return index;
  }
  findByKey(key) {
    let index = 0;
    let node = this.head;

    while (node != null) {
      if (node.key === key) {
        break;
      }
      index++;
      node = node.next;
    }
    return { node: node, index: index };
  }
  insertAt(index, value) {
    let i = 0;
    let node = this.head;

    if (index > this.size()) return "Out of range";
    if (index == 0) {
      this.prepend(value);
      return 1;
    }
    while (node != null) {
      if (index == i + 1) {
        let displacedNode = node.next;
        node.next = new Node(value, displacedNode);
        break;
      }
      node = node.next;
      i++;
    }
    return 1;
  }
  removeAt(index) {
    let i = 0;
    let node = this.head;
    if (index == 0) {
      this.head = node.next;
      node = null;
      return 1;
    }
    while (node != null) {
      if (index == i + 1) {
        let displacedNode = node.next.next;
        node.next = null;
        node.next = displacedNode;
        break;
      }
      node = node.next;
      i++;
    }
    return 1;
  }
  // Help methods
  displayNodes() {
    console.log("Linked List");
    console.log("-----------");
    let temp = this.head;
    while (temp != null) {
      console.log(temp);
      temp = temp.next;
    }
  }
  toString() {
    let string = "";
    let node = this.head;
    while (node != null) {
      if (node.next != null) string += `{${node.key}: ${node.value}} -> `;
      else string += `{${node.key}: ${node.value}}`;
      node = node.next;
    }

    return string;
  }
}
class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this._capacity = capacity;
    this._loadFactor = loadFactor;
    this._buckets = Array(this._capacity);
  }
  // Getter and Setters
  get buckets() {
    return this._buckets;
  }
  // Functions
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this._capacity;
    }

    return hashCode;
  }
  set(key, value) {
    console.log(`Key: ${key}, Value: ${value}`);
    let hashedKey = this.hash(key);
    console.log(`Hashed Key: ${hashedKey}`);
    if (this.buckets[hashedKey] == null) {
      // If there is nothing in the bucket
      let pair = new Node(key, value);
      this._buckets[hashedKey] = new LinkedList(pair);
    } else {
      let pair = this.buckets[hashedKey].findByKey(key).node;
      if (pair != null) {
        console.log(
          `Existant node found with key: ${pair.key} and value ${pair.value}, new value is ${value}`
        );
        pair.value = value;
        console.log(
          `Modified node: ${pair.key} and value ${pair.value}, new value is ${value}`
        );
      } else {
        this.buckets[hashedKey].append(key, value);
      }
    }
  }
  get(key) {
    let hashedKey = this.hash(key);
    if (this.buckets[hashedKey] == null) return null;
    else {
      let node = this.buckets[hashedKey].findByKey(key).node;
      return node != null ? node.value : null;
    }
  }
  has(key) {
    let hashedKey = this.hash(key);
    if (this.buckets[hashedKey] == null) return false;
    else {
      let node = this.buckets[hashedKey].findByKey(key).node;
      return node != null ? true : false;
    }
  }
  remove(key) {
    let hashedKey = this.hash(key);
    if (this.has(key)) {
      let foundNode = this.buckets[hashedKey].findByKey(key);
      let result = `Entry {${foundNode.node.key}: ${foundNode.node.value}} removed`;
      this.buckets[hashedKey].removeAt(foundNode.index);
      return result;
    } else return false;
  }
  length() {
    let count = 0;
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i + 1] != null)
        count = count + this.buckets[i + 1].size();
    }
    return count;
  }
  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i + 1] != null) this.buckets[i + 1] = null;
    }
  }
  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i + 1] != null) {
        let temp = this.buckets[i + 1].head;
        while (temp != null) {
          arr.push(temp.value);
          temp = temp.next;
        }
      }
    }
    return arr;
  }
  entries() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i + 1] != null) {
        let temp = this.buckets[i + 1].head;
        while (temp != null) {
          let pair = `{${temp.key}, ${temp.value}}`
          arr.push(pair);
          temp = temp.next;
        }
      }
    }
    return arr;
  }
}

let test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test);
console.log("Get Test: ");
console.log("--------------");
console.log(`Get Lion: ${test.get("lion")}`);
console.log(`Get Tiger: ${test.get("tiger")}`);
console.log("Has Test: ");
console.log("--------------");
console.log(`Has Lion: ${test.has("lion")}`);
console.log(`Has Tiger: ${test.has("tiger")}`);
console.log("Remove Test: ");
console.log("--------------");
console.log(test.remove("carrot"));
console.log(`Current length: ${test.length()}`);
console.log(`Current values: ${test.values()}`);
console.log(`Current entries: ${test.entries()}`);
console.log("Clear Test: ");
console.log("--------------");
test.clear();
console.log(`Current length: ${test.length()}`);
