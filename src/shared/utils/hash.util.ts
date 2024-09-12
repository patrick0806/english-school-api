import { hashSync, compare } from 'bcrypt';

export class HashUtils {
  private static HASH_SALT = 10;

  public static generateHash(password: string): string {
    return hashSync(password, this.HASH_SALT);
  }

  public static async compareHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(password, hashedPassword);
  }
}
