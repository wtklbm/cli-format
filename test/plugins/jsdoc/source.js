/**
 * @fileoverview Test file for JSDoc formatting
 * @author Test Author
 * @version 1.0.0
 */

/**
 * Represents a user in the system
 * @class
 */
class User {
    /**
     * Creates an instance of User
     * @constructor
     * @param {   Object} userData - The user data
     * @param {string   } userData.name - The user's name
     * @param {string}     userData.email - The user's email
     * @param {number} userData.age           - The user's age
     */
    constructor({ name, email, age }) {
        /** @type {string} */
        this.name = name;

        /** @type {string} */
        this.email = email;

        /** @type {number} */
        this.age = age;
    }

    /**
     * Gets the user's full name
     * @returns {string} The user's full name
     */
    getFullName() {
        return this.name;
    }

    /**
     * Validates the user's email
     * @param {string} email - The email to validate
     * @returns {boolean} True if the email is valid, false otherwise
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Updates the user's age
     * @param {number} newAge - The new age
     * @throws {Error} If the age is not a positive number
     */
    updateAge(newAge) {
        if (typeof newAge !== 'number' || newAge <= 0) {
            throw new Error('Age must be a positive number');
        }
        this.age = newAge;
    }
}

/**
 * Creates a new user instance
 * @param {Object} userData - The user data
 * @returns {User} A new User instance
 */
function createUser(userData) {
    return new User(userData);
}

/**
 * @typedef {Object} Address
 * @property {string} street - The street address
 * @property {string} city - The city
 * @property {string} country - The country
 */

/**
 * @typedef {Object} UserProfile
 * @property {User} user - The user object
 * @property {Address} address - The user's address
 * @property {string[]} interests - The user's interests
 */

/**
 * Formats a user profile
 * @param {UserProfile} profile - The user profile to format
 * @returns {string} The formatted profile string
 */
function formatUserProfile(profile) {
    return `${profile.user.name} from ${profile.address.city}`;
}

module.exports = {
    User,
    createUser,
    formatUserProfile
};
