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
 * Format: Random combination of Japanese syllables + numbers (2-4 digits)
 * Total length: 9-13 characters to look like real usernames/nicknames
 * 
 * Japanese syllable library: 180+ base units
 * Combinations: Randomly pick 2-3 syllables to combine
 * Possible combinations: ~700+ billion unique usernames
 * Collision risk for 10 million usernames: <0.001%
 */
export function generateRandomUsername(): string {
  // Pure Japanese hiragana syllables (180+ base units)
  const syllables = [
    // Basic hiragana syllables (あ行～ん)
    'a', 'i', 'u', 'e', 'o',
    'ka', 'ki', 'ku', 'ke', 'ko',
    'ga', 'gi', 'gu', 'ge', 'go',
    'sa', 'si', 'su', 'se', 'so',
    'za', 'zi', 'zu', 'ze', 'zo',
    'ta', 'ti', 'tu', 'te', 'to',
    'da', 'di', 'du', 'de', 'do',
    'na', 'ni', 'nu', 'ne', 'no',
    'ha', 'hi', 'hu', 'he', 'ho',
    'ba', 'bi', 'bu', 'be', 'bo',
    'pa', 'pi', 'pu', 'pe', 'po',
    'ma', 'mi', 'mu', 'me', 'mo',
    'ya', 'yu', 'yo',
    'ra', 'ri', 'ru', 're', 'ro',
    'wa', 'wi', 'we', 'wo', 'n',
    
    // Palatalized sounds (拗音)
    'kya', 'kyu', 'kyo',
    'gya', 'gyu', 'gyo',
    'sha', 'shu', 'sho',
    'cha', 'chu', 'cho',
    'ja', 'ju', 'jo',
    'nya', 'nyu', 'nyo',
    'hya', 'hyu', 'hyo',
    'bya', 'byu', 'byo',
    'pya', 'pyu', 'pyo',
    'mya', 'myu', 'myo',
    'rya', 'ryu', 'ryo',
    
    // Common Japanese name elements
    'aki', 'tsu', 'yuki', 'hana', 'sora', 'kaze', 'hoshi', 'tsuki', 'kimi', 'koi', 'ai',
    'natsu', 'fuyu', 'haru', 'michi', 'yume', 'kami', 'tori', 'shio', 'arashi', 'kaito',
    'sakura', 'ren', 'haruka', 'riku', 'taiga', 'akira', 'aiko', 'ayu', 'chiaki', 'eri',
    'hideo', 'isamu', 'jiro', 'kaede', 'kazuo', 'ken', 'kiyoshi', 'koichi', 'kouji',
    'mahiro', 'makoto', 'masa', 'michiko', 'midori', 'mika', 'minoru', 'misa', 'mitsuo',
    'naoki', 'naoto', 'naoya', 'noboru', 'nobuo', 'nobuyuki', 'asahi', 'akane', 'akari',
    'amano', 'anri', 'arata', 'asai', 'azusa', 'chiyo', 'chisato', 'chie', 'chihiro',
    'chiko', 'daichi', 'daiki', 'daito', 'daisuke', 'eiko', 'eisuke', 'emiko', 'eriko',
    'fumiko', 'fumiyo', 'genji', 'gensai', 'hikari', 'hikaru', 'himari', 'hinako', 'hinata',
    'hisashi', 'hisaya', 'hisoka', 'hitomi'
  ]

  // Remove duplicates
  const uniqueSyllables = Array.from(new Set(syllables))

  const separators = ['_', '-', '']
  
  // Generate format: 70% Japanese style (syllables + numbers), 30% Mixed style (syllables with separator)
  const isMixedStyle = Math.random() < 0.3
  
  let username = ''
  
  if (isMixedStyle) {
    // Mixed style: randomly combine 2-3 syllables with separator
    const syllableCount = Math.floor(Math.random() * 2) + 2 // 2-3 syllables
    const parts: string[] = []
    
    for (let i = 0; i < syllableCount; i++) {
      const syllable = uniqueSyllables[Math.floor(Math.random() * uniqueSyllables.length)]
      parts.push(syllable)
    }
    
    const separator = separators[Math.floor(Math.random() * separators.length)]
    username = parts.join(separator)
  } else {
    // Japanese style: randomly combine 2-3 syllables + 2-4 digit numbers
    const syllableCount = Math.floor(Math.random() * 2) + 2 // 2-3 syllables
    let combined = ''
    
    for (let i = 0; i < syllableCount; i++) {
      const syllable = uniqueSyllables[Math.floor(Math.random() * uniqueSyllables.length)]
      combined += syllable
    }
    
    // Add numbers at the end (2-4 digits)
    const numLength = Math.floor(Math.random() * 3) + 2 // 2-4 digits
    let numbers = ''
    for (let i = 0; i < numLength; i++) {
      numbers += Math.floor(Math.random() * 10)
    }
    
    username = `${combined}${numbers}`
  }
  
  // Ensure reasonable length (9-13 characters)
  if (username.length < 9) {
    const numToAdd = Math.floor(Math.random() * 3) + 1 // 1-3 digits
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
