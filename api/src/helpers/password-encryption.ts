import * as bcrypt from 'bcrypt';

const salt = 10;

export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, passwordHash: string) {
  return await bcrypt.compare(password, passwordHash);
}
