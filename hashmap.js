/* eslint-disable import/extensions */
import LinkedList from "./linkedlist.js";

const hash = (key) => {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i += 1) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode;
};

export default class Hashmap {
  constructor() {
    this.initialize();
  }

  checkExpansionRequirement() {
    const currentLoadFactor = this.numItems / this.capacity;
    if (currentLoadFactor > this.maxLoadFactor) {
      const entries = this.entries();
      this.capacity *= 2;
      this.buckets = Array(this.capacity).fill(null);
      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  set(key, value) {
    // get index
    const index = hash(key) % this.capacity;

    // empty bucket, create list
    if (this.buckets[index] === null) {
      const newList = new LinkedList(key, value);
      this.buckets[index] = newList;
      this.numItems += 1;
    }
    // non-empty bucket, add to list
    else {
      const newElementAdded = this.buckets[index].set(key, value);
      this.numItems = newElementAdded ? (this.numItems += 1) : this.numItems;
    }

    // Check if hashtable needs to be expanded
    this.checkExpansionRequirement();
  }

  get(key) {
    const index = hash(key) % this.capacity;
    if (this.buckets[index] === null) {
      return null;
    }
    return this.buckets[index].get(key);
  }

  has(key) {
    for (let i = 0; i < this.capacity; i += 1) {
      if (this.buckets[i] !== null) {
        if (this.buckets[i].contains(key)) {
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    const index = hash(key) % this.capacity;

    if (this.buckets[index] !== null) {
      this.numItems -= 1;
      return this.buckets[index].remove(key);
    }
    return false;
  }

  length() {
    return this.numItems;
  }

  clear() {
    this.initialize();
  }

  initialize() {
    this.capacity = 16;
    this.numItems = 0;
    this.maxLoadFactor = 0.9;
    this.buckets = Array(this.capacity).fill(null);
  }

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        keys.push(...bucket.keys());
      }
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        values.push(...bucket.values());
      }
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      if (bucket !== null) {
        entries.push(bucket.entries());
      }
    });
    return entries;
  }
}
