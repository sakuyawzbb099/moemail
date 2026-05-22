import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const salt = process.env.AUTH_SECRET || ''
  const data = encoder.encode(password + salt)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean> {
  const hash = await hashPassword(password)
  return hash === hashedPassword
}

/**
 * Generate a random realistic username like "coolcat1234" or "starlight9876"
 * Format: 3-7 letters + 3-7 digits
 * Total length: exactly 10 characters to look like real usernames
 */
export function generateRandomUsername(): string {
  // Word parts for English-like usernames
  const wordParts = [
    'cool', 'hot', 'nice', 'swift', 'smart', 'brave', 'sunny', 'cozy', 'dreamy', 'lucky',
    'happy', 'super', 'mega', 'ultra', 'cyber', 'mystic', 'lazy', 'crazy', 'wild', 'free',
    'cat', 'dog', 'fox', 'wolf', 'tiger', 'lion', 'eagle', 'panda', 'ninja', 'phoenix',
    'dragon', 'shark', 'bear', 'owl', 'snow', 'star', 'moon', 'sun', 'cloud', 'storm',
    'fire', 'ice', 'wind', 'wave', 'ghost', 'spirit', 'sage', 'knight', 'wizard', 'warrior'
  ]
  
  // Pick random letters (3-7 characters)
  const letterCount = Math.floor(Math.random() * 5) + 3 // 3-7
  let letters = ''
  
  // Combine 1-2 words to get 3-7 letters
  const wordCount = Math.floor(Math.random() * 2) + 1 // 1-2 words
  for (let i = 0; i < wordCount; i++) {
    const word = wordParts[Math.floor(Math.random() * wordParts.length)]
    letters += word
  }
  
  // Trim to exactly the needed letter count
  letters = letters.substring(0, letterCount)
  
  // Generate remaining digits to make total 10 characters
  const digitCount = 10 - letterCount
  let digits = ''
  for (let i = 0; i < digitCount; i++) {
    digits += Math.floor(Math.random() * 10)
  }
  
  return `${letters}${digits}`
}
