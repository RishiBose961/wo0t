import crypto from 'crypto';

const { PRIVATE_KEY } = process.env;

const BUFFER_KEY = Buffer.from(PRIVATE_KEY, 'hex'); // Assuming PRIVATE_KEY is a hex string

export const euclideanDistance = (featuresA, featuresB) => {
    return Math.sqrt(featuresA.reduce((sum, x, i) => sum + Math.pow(x - featuresB[i], 2), 0));
};

export const manhattanDistance = (featuresA, featuresB) => {
    return featuresA.reduce((sum, x, i) => sum + Math.abs(x - featuresB[i]), 0);
};

export const getInitializationVector = (len) => {
    return crypto.randomBytes(len);
};

export const encryptBiometrics = (descriptor, iv) => {
    const message = descriptor.join('###');
    const cipher = crypto.createCipheriv('aes-256-cbc', BUFFER_KEY, iv);
    let encryptedData = cipher.update(message, 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
};

export const decryptBiometrics = (descriptor, iv) => {
    const decipher = crypto.createDecipheriv('aes-256-cbc', BUFFER_KEY, iv);
    let decryptedData = decipher.update(descriptor, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData.split('###');
};
