import React from 'react';
import { Component } from 'react';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { myFunction } from './utils';
import { MY_CONSTANT } from './constants';
import '@styles/main.css';
import '@/components/Header';
import { useState, useEffect } from 'react';

const longArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

const myObject = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3',
  key4: 'value4',
  key5: 'value5'
};

/**
 * This is a JSDoc comment
 * @param {string} name - The name parameter
 * @returns {string} - A greeting message
 */
function greet(name) {
  return `Hello, ${name}!`;
}

const MyComponent = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
};

export default MyComponent;
