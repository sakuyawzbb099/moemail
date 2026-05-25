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
 * Generate a random realistic username like "akitsuguda0228" or "masako-3nari"
 * Format: Japanese-style names mixed with Latin characters, hyphens, and numbers
 * Total length: 9-13 characters to look like real usernames/nicknames
 */
export function generateRandomUsername(): string {
  // Japanese syllables and name-like parts
  const japaneseParts = [
    'aki', 'tsu', 'guda', 'skmt', 'akk', 'masako', 'nari', 'endless', 'dream',
    'yuki', 'hana', 'sora', 'kaze', 'hoshi', 'tsuki', 'kimi', 'koi', 'ai',
    'natsu', 'fuyu', 'haru', 'aki', 'michi', 'yume', 'kami', 'tori', 'shio',
    'arashi', 'kaito', 'sakura', 'sakuya', 'ren', 'haruka', 'kaito', 'riku',
    'taiga', 'akira', 'aiko', 'ayu', 'chiaki', 'eri', 'hideo', 'isamu', 'jiro',
    'kaede', 'kazuo', 'ken', 'kichi', 'kiyoshi', 'koichi', 'kouji', 'kyou', 'leiko',
    'mahiro', 'makoto', 'masa', 'michiko', 'midori', 'mika', 'minoru', 'misa', 'mitsuo',
    'nachan', 'naoki', 'naoto', 'naoya', 'narumi', 'natsumi', 'noboru', 'nobuo', 'nobuyuki'
  ]

  const latinParts = [
    'dream', 'endless', 'dark', 'light', 'star', 'moon', 'sun', 'wind', 'fire',
    'ice', 'storm', 'shadow', 'angel', 'demon', 'sage', 'knight', 'wizard', 'mystic'
  ]

  const separators = ['_', '-', '']
  
  // Generate format: 70% Japanese style, 30% Mixed style
  const isMixedStyle = Math.random() < 0.3
  
  let username = ''
  
  if (isMixedStyle) {
    // Mixed style: part1_part2 or part1-part2
    const part1 = japaneseParts[Math.floor(Math.random() * japaneseParts.length)]
    const part2 = Math.random() < 0.5 
      ? japaneseParts[Math.floor(Math.random() * japaneseParts.length)]
      : latinParts[Math.floor(Math.random() * latinParts.length)]
    const separator = separators[Math.floor(Math.random() * separators.length)]
    
    username = `${part1}${separator}${part2}`
  } else {
    // Japanese style with numbers
    const part = japaneseParts[Math.floor(Math.random() * japaneseParts.length)]
    
    // Add numbers at the end (30-50% chance to add numbers)
    if (Math.random() < 0.6) {
      const numLength = Math.floor(Math.random() * 4) + 2 // 2-5 digits
      let numbers = ''
      for (let i = 0; i < numLength; i++) {
        numbers += Math.floor(Math.random() * 10)
      }
      username = `${part}${numbers}`
    } else {
      username = part
    }
  }
  
  // Ensure reasonable length (9-13 characters)
  if (username.length < 9) {
    const numToAdd = Math.floor(Math.random() * 2) + 1 // 1-2 digits
    let numbers = ''
    for (let i = 0; i < numToAdd; i++) {
      numbers += Math.floor(Math.random() * 10)
    }
    username += numbers
  }
  
  // Trim if too long
  if (username.length > 13) {
    username = username.substring(0, 13)
  }
  
  return username
}
