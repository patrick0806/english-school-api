import bcrypt from 'bcrypt';

const HASH_SALT = 10;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, HASH_SALT);
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}
