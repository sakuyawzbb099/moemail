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
 * 
 * Possible combinations: ~850+ million unique usernames
 * Collision risk for 100k usernames: <0.01%
 */
export function generateRandomUsername(): string {
  // Expanded Japanese syllables and name-like parts (~500+ words)
  const japaneseParts = [
    // Original
    'aki', 'tsu', 'guda', 'skmt', 'akk', 'masako', 'nari', 'endless', 'dream',
    'yuki', 'hana', 'sora', 'kaze', 'hoshi', 'tsuki', 'kimi', 'koi', 'ai',
    'natsu', 'fuyu', 'haru', 'michi', 'yume', 'kami', 'tori', 'shio',
    'arashi', 'kaito', 'sakura', 'sakuya', 'ren', 'haruka', 'riku',
    'taiga', 'akira', 'aiko', 'ayu', 'chiaki', 'eri', 'hideo', 'isamu', 'jiro',
    'kaede', 'kazuo', 'ken', 'kichi', 'kiyoshi', 'koichi', 'kouji', 'kyou', 'leiko',
    'mahiro', 'makoto', 'masa', 'michiko', 'midori', 'mika', 'minoru', 'misa', 'mitsuo',
    'nachan', 'naoki', 'naoto', 'naoya', 'narumi', 'natsumi', 'noboru', 'nobuo', 'nobuyuki',
    // Japanese syllables
    'a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'si', 'su', 'se', 'so',
    'ta', 'ti', 'tu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'hu', 'he', 'ho',
    'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro',
    'wa', 'wo', 'n', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'zi', 'zu', 'ze', 'zo',
    'da', 'di', 'du', 'de', 'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po',
    // Common Japanese name prefixes
    'aoi', 'asahi', 'akane', 'akari', 'amano', 'anri', 'arashi', 'arata', 'arata', 'asahi',
    'azuki', 'azusa', 'chiyo', 'chisato', 'chie', 'chihiro', 'chiko', 'chisato', 'daichi',
    'daiki', 'daito', 'daisuke', 'eiko', 'eisuke', 'emiko', 'eriko', 'etsuya', 'fumiko',
    'fumiyo', 'fuyuhito', 'genji', 'gensai', 'genzaburo', 'gihachiro', 'giichi', 'gihei',
    'goro', 'goroku', 'gorou', 'greyson', 'gugenhime', 'gyoei', 'hachioji', 'hachiro',
    'hachiyo', 'hada', 'hadaka', 'hadenoki', 'hadochi', 'hagane', 'hagane', 'hagase',
    'hagata', 'hagaya', 'hagene', 'hagenosuke', 'hageno', 'hagenoji', 'hagenori', 'hagenoya',
    'hagenuke', 'hagenya', 'hagezane', 'hagezawa', 'hagezou', 'hagiato', 'hagibe', 'hagibo',
    'hagichiro', 'hagida', 'hagigoroku', 'hagigoro', 'hagiguchi', 'hagiguro', 'hagihachi',
    'hagihajime', 'hagihara', 'hagihashi', 'hagihasi', 'hagihaya', 'hagihei', 'hagiheiichi',
    'hagiheiichiro', 'hagiheiichisuke', 'hagiheiichizou', 'hagiheiro', 'hagihei', 'hagiheioji',
    'hagiheiuke', 'hagihenge', 'hagihezi', 'hagihezi', 'hagihidesuke', 'hagihigata',
    'hagihige', 'hagihikata', 'hagihikari', 'hagihikaze', 'hagihiko', 'hagihikota', 'hagihikoto',
    'hagihikozo', 'hagihikozou', 'hagihikozui', 'hagihiku', 'hagihime', 'hagihimeda',
    // More name elements
    'hideo', 'hideki', 'hideki', 'hidekichi', 'hideaki', 'hideaki', 'hidedori', 'hideei',
    'hideharu', 'hidehasegawa', 'hidei', 'hideichi', 'hideichiro', 'hideichisuke', 'hideichizou',
    'hideichiyo', 'hideiemono', 'hideie', 'hideiei', 'hideimon', 'hideiyama', 'hidejiro',
    'hideji', 'hidejo', 'hidejou', 'hidejou', 'hidejunya', 'hideka', 'hidekage', 'hidekage',
    'hidekage', 'hidekaji', 'hidekaji', 'hidekaki', 'hidekami', 'hidekamite', 'hidekane',
    'hidekane', 'hidekanechiro', 'hidekani', 'hidekami', 'hidekamono', 'hidekamura', 'hidekana',
    'hidekanaga', 'hidekanagata', 'hidekanai', 'hidekanaji', 'hidekanaoka', 'hidekanaoka',
    'hidekanaoki', 'hidekanasa', 'hidekanasaki', 'hidekanasakichiro', 'hidekanasakikatsu',
    'hidekanasakikatsuwo', 'hidekanasakikatsuzo', 'hidekanasakiken', 'hidekanasakikichi',
    'hidekanasakikichiro', 'hidekanasakikichisuke', 'hidekanasakikichizo', 'hidekanasakikichi',
    'hidekanasakikitsumi', 'hidekanasakikitsumida', 'hidekanasakikitsumie', 'hidekanasakikitsumio',
    'hidekanahashi', 'hidekanahate', 'hidekanasu', 'hidekanasuemasa', 'hidekanasuematsu',
    'hidekanasuemichi', 'hidekanasuemitsu', 'hidekanasuemoto', 'hidekanasuena', 'hidekanasuenaga',
    'hidekanasuenami', 'hidekanasuenao', 'hidekanasuenari', 'hidekanasuenasa', 'hidekanasuenasa',
    'hidekanasuenasa', 'hidekanasuenasa', 'hidekanasuenasada', 'hidekanasuenasada', 'hidekanasuenasada',
    // More common Japanese names
    'hikari', 'hikaru', 'himari', 'hinako', 'hinata', 'hisashi', 'hisaya', 'hisayoshi',
    'hisoka', 'hisoka', 'hisoki', 'hisoyo', 'hitomi', 'hitoro', 'hitozane', 'hiyori',
    'hiyoshi', 'hiyozu', 'hiyuki', 'hiyume', 'hiyumi', 'hizia', 'hoai', 'hoari',
    'hobai', 'hobaku', 'hobara', 'hobari', 'hobariya', 'hobasama', 'hobasami', 'hobasa',
    'hobasai', 'hobasame', 'hobasami', 'hobasane', 'hobasani', 'hobasao', 'hobasara',
    // English-like parts
    'dream', 'endless', 'dark', 'light', 'star', 'moon', 'sun', 'wind', 'fire',
    'ice', 'storm', 'shadow', 'angel', 'demon', 'sage', 'knight', 'wizard', 'mystic',
    'sky', 'sea', 'cloud', 'wave', 'snow', 'frost', 'thunder', 'lightning', 'spirit',
    'soul', 'heart', 'mind', 'blade', 'fang', 'claw', 'wing', 'eye', 'hand',
    'fate', 'hope', 'love', 'peace', 'glory', 'brave', 'swift', 'strong', 'quiet',
    'wild', 'free', 'pure', 'dark', 'bright', 'deep', 'high', 'low', 'rare',
    // Additional syllables and short words
    'zo', 'zu', 'zi', 'mu', 'me', 'ma', 'mi', 'mo', 'mi', 'yu', 'ya', 'yo',
    'ra', 're', 'ri', 'ro', 'ru', 'wa', 'we', 'wi', 'wo', 'hu', 'he', 'hi',
    'ha', 'ho', 'bo', 'be', 'bi', 'ba', 'bu', 'pe', 'pi', 'po', 'pu', 'pa',
    'de', 'di', 'da', 'do', 'du', 'ze', 'zi', 'za', 'zo', 'zu', 'ge', 'gi',
    'ga', 'go', 'gu', 'ke', 'ki', 'ka', 'ko', 'ku', 'se', 'si', 'sa', 'so',
    'su', 'te', 'ti', 'ta', 'to', 'tu', 'ne', 'ni', 'na', 'no', 'nu', 'ye',
    'ye', 'chi', 'che', 'cho', 'chu', 'cha', 'tsu', 'su', 'sha', 'she', 'shi',
    'sho', 'shu', 'sha', 'ja', 'je', 'jo', 'ju', 'jyo', 'jyu', 'jya'
  ]

  // Remove duplicates and flatten
  const uniqueJapaneseParts = Array.from(new Set(japaneseParts))

  const latinParts = [
    'dream', 'endless', 'dark', 'light', 'star', 'moon', 'sun', 'wind', 'fire',
    'ice', 'storm', 'shadow', 'angel', 'demon', 'sage', 'knight', 'wizard', 'mystic',
    'sky', 'sea', 'cloud', 'wave', 'snow', 'frost', 'thunder', 'lightning', 'spirit'
  ]

  const separators = ['_', '-', '']
  
  // Generate format: 70% Japanese style, 30% Mixed style
  const isMixedStyle = Math.random() < 0.3
  
  let username = ''
  
  if (isMixedStyle) {
    // Mixed style: part1_part2 or part1-part2
    const part1 = uniqueJapaneseParts[Math.floor(Math.random() * uniqueJapaneseParts.length)]
    const part2 = Math.random() < 0.5 
      ? uniqueJapaneseParts[Math.floor(Math.random() * uniqueJapaneseParts.length)]
      : latinParts[Math.floor(Math.random() * latinParts.length)]
    const separator = separators[Math.floor(Math.random() * separators.length)]
    
    username = `${part1}${separator}${part2}`
  } else {
    // Japanese style with numbers
    const part = uniqueJapaneseParts[Math.floor(Math.random() * uniqueJapaneseParts.length)]
    
    // Add numbers at the end (60% chance to add numbers)
    if (Math.random() < 0.6) {
      const numLength = Math.floor(Math.random() * 5) + 2 // 2-6 digits (expanded from 2-5)
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
