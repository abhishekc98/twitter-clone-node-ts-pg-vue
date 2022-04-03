import bcrypt from 'bcryptjs';

export const generateHash = async (toHash: string): Promise<string> => {

    const HASH_ROUNDS = 10; // default 
    try {
        const salt: string = await bcrypt.genSalt(HASH_ROUNDS);
        const hashed: string = await bcrypt.hash(toHash, salt);
        return hashed;
    } catch (err) { throw err; }
}

export const validateHash = async (notHashed: string, hashed: string): Promise<boolean> => {

    const isEqual = await bcrypt.compare(notHashed, hashed);
    return isEqual;
}