// Test file for OXC plugin - modern JavaScript/TypeScript features

import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// Modern JavaScript features
const arrowFunction = (param1, param2) => {
    return param1 + param2;
};

const conciseArrow = (a, b) => a + b;

// Destructuring
const { a, b, c = 'default' } = { a: 1, b: 2 };
const [first, second, ...rest] = [1, 2, 3, 4, 5];

// Template literals
const template = `Hello ${name}, you have ${count} messages.`;

// Optional chaining
const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};
const city = user?.address?.city;

// Nullish coalescing
const value = null ?? 'default';
const anotherValue = undefined ?? 'another default';

// Spread operator
const numbers = [1, 2, 3];
const moreNumbers = [...numbers, 4, 5];
const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };

// Object shorthand
const x = 1, y = 2;
const shorthand = { x, y };

// Computed property names
const key = 'dynamic';
const computed = {
    [key]: 'value',
    [`prefix_${key}`]: 'another value'
};

// Async/await
async function fetchData() {
    try {
        const response = await axios.get('/api/data');
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// Class with modern features
class ModernClass {
    #privateField = 'private';

    constructor(publicField) {
        this.publicField = publicField;
    }

    get privateFieldGetter() {
        return this.#privateField;
    }

    async method() {
        return await Promise.resolve('done');
    }

    static staticMethod() {
        return 'static';
    }
}

// React functional component with hooks
const MyComponent = ({ initialValue = 0 }) => {
    const [count, setCount] = useState(initialValue);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchData();
                setData(result);
            } catch (error) {
                console.error('Failed to load data:', error);
            }
        };

        loadData();
    }, []);

    const handleClick = useCallback(() => {
        setCount(prev => prev + 1);
        dispatch({ type: 'INCREMENT' });
    }, [dispatch]);

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={handleClick}>Increment</button>
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
};

// Dynamic imports
const loadModule = async () => {
    const module = await import('./dynamic-module.js');
    return module.default;
};

// Array methods with callbacks
const processed = numbers
    .filter(n => n > 0)
    .map(n => n * 2)
    .reduce((acc, curr) => acc + curr, 0);

// Optional catch binding
try {
    riskyOperation();
} catch {
    console.log('Something went wrong');
}

// BigInt
const bigIntValue = 9007199254740991n;
const anotherBigInt = BigInt('9007199254740992');

export default MyComponent;
export { arrowFunction, fetchData, ModernClass };
