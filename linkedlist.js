/* eslint-disable import/extensions */
import Node from "./node.js";

// const getDataAtIndex = (node, count) => {
//   if (node.next === null && count > 0) {
//     throw console.error("index is out of list range");
//   } else if (count === 0) {
//     return node.value;
//   } else {
//     return getDataAtIndex(node.next, count - 1);
//   }
// };

const isInsideList = (node, key) => {
  if (key === node.key) {
    return true;
  }
  if (key !== node.key && node.next === null) {
    return false;
  }
  return isInsideList(node.next, key);
};

// const findValue = (node, value, acc) => {
//   if (node.value === value) {
//     return acc;
//   }
//   if (node.value !== value && node.next !== null) {
//     return findValue(node.next, value, acc + 1);
//   }
//   return null;
// };

// const linkedListString = (node) => {
//   if (node.next !== null) {
//     return `( ${node.value} ) --> ${linkedListString(node.next)}`;
//   }
//   return `( ${node.value} ) --> null`;
// };

// const insertValueAt = (node, value, index) => {
//   if (index === 0) {
//     const newNode = new Node(value, node.prev, node);
//     // eslint-disable-next-line no-param-reassign
//     node.prev.next = newNode;
//     // eslint-disable-next-line no-param-reassign
//     node.prev = newNode;
//   } else {
//     insertValueAt(node.next, value, index - 1);
//   }
// };

// const removeValueAt = (node, index) => {
//   if (index === 0) {
//     // eslint-disable-next-line no-param-reassign
//     node.prev.next = node.next;
//     if (node.next !== null) {
//       // eslint-disable-next-line no-param-reassign
//       node.next.prev = node.prev;
//     }
//   } else {
//     removeValueAt(node.next, index - 1);
//   }
// };

const setElement = (node, key, value) => {
  const currNode = node;
  // Key already exists, update
  if (currNode.key === key) {
    currNode.value = value;
    return false;
  }

  // Key not found and at end of list
  if (currNode.next === null) {
    const newNode = new Node(key, value, currNode, null);
    currNode.next = newNode;
    return true;
  }
  return setElement(currNode.next, key, value);
};

const getElement = (node, key) => {
  const currNode = node;
  if (currNode.key === key) {
    return currNode.value;
  }
  if (currNode.next === null) {
    return null;
  }
  return getElement(node.next, key);
};

const removeElement = (node, key) => {
  const currNode = node;
  if (currNode.key === key) {
    currNode.prev.next = currNode.next;
    if (currNode.next !== null) {
      currNode.next.prev = currNode.prev;
    }
    return true;
  }

  if (currNode.next === null) {
    return false;
  }
  return removeElement(node.next, key);
};

const getKeys = (node) => {
  if (node === null) {
    return [];
  }

  if (node.next !== null) {
    return [node.key, ...getKeys(node.next)];
  }
  return [node.key];
};

const getValues = (node) => {
  if (node === null) {
    return [];
  }

  if (node.next !== null) {
    return [node.value, ...getKeys(node.next)];
  }
  return [node.value];
};

const getEntries = (node) => {
  if (node === null) {
    return [];
  }

  if (node.next !== null) {
    return [[node.key, node.value], getKeys(node.next)];
  }
  return [node.key, node.value];
};

export default class LinkedList {
  constructor(key, value) {
    this.listHead = new Node(key, value, null, null);
  }

  set(key, value) {
    return setElement(this.listHead, key, value);
  }

  get(key) {
    return getElement(this.listHead, key);
  }

  contains(key) {
    return isInsideList(this.listHead, key);
  }

  remove(key) {
    if (this.listHead.key === key) {
      if (this.listHead.next !== null) {
        this.listHead.next.prev = null;
      }
      this.listHead = this.listHead.next;
      return true;
    }
    return removeElement(this.listHead.next, key);
  }

  keys() {
    return getKeys(this.listHead);
  }

  values() {
    return getValues(this.listHead);
  }

  entries() {
    return getEntries(this.listHead);
  }

  // find(value) {
  //   return findValue(this.listHead, value, 0);
  // }

  // toString() {
  //   return linkedListString(this.listHead);
  // }

  // insertAt(value, index) {
  //   insertValueAt(this.listHead, value, index);
  // }

  // removeAt(index) {
  //   removeValueAt(this.listHead, index);
  // }
}
