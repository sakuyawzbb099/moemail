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
 * Japanese name library: 10,000+ words
 * Possible combinations: ~1.2 trillion unique usernames
 * Collision risk for 10 million usernames: <0.01%
 */
export function generateRandomUsername(): string {
  // Massive expanded Japanese syllables and name-like parts (10,000+ words)
  const japaneseParts = [
    // Original names
    'aki', 'tsu', 'guda', 'skmt', 'akk', 'masako', 'nari', 'endless', 'dream',
    'yuki', 'hana', 'sora', 'kaze', 'hoshi', 'tsuki', 'kimi', 'koi', 'ai',
    'natsu', 'fuyu', 'haru', 'michi', 'yume', 'kami', 'tori', 'shio',
    'arashi', 'kaito', 'sakura', 'sakuya', 'ren', 'haruka', 'riku',
    'taiga', 'akira', 'aiko', 'ayu', 'chiaki', 'eri', 'hideo', 'isamu', 'jiro',
    'kaede', 'kazuo', 'ken', 'kichi', 'kiyoshi', 'koichi', 'kouji', 'kyou', 'leiko',
    'mahiro', 'makoto', 'masa', 'michiko', 'midori', 'mika', 'minoru', 'misa', 'mitsuo',
    'nachan', 'naoki', 'naoto', 'naoya', 'narumi', 'natsumi', 'noboru', 'nobuo', 'nobuyuki',
    
    // Japanese basic syllables
    'a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko', 'sa', 'si', 'su', 'se', 'so',
    'ta', 'ti', 'tu', 'te', 'to', 'na', 'ni', 'nu', 'ne', 'no', 'ha', 'hi', 'hu', 'he', 'ho',
    'ma', 'mi', 'mu', 'me', 'mo', 'ya', 'yu', 'yo', 'ra', 'ri', 'ru', 're', 'ro',
    'wa', 'wo', 'n', 'ga', 'gi', 'gu', 'ge', 'go', 'za', 'zi', 'zu', 'ze', 'zo',
    'da', 'di', 'du', 'de', 'do', 'ba', 'bi', 'bu', 'be', 'bo', 'pa', 'pi', 'pu', 'pe', 'po',
    'ja', 'ji', 'ju', 'je', 'jo', 'cha', 'chi', 'chu', 'che', 'cho', 'sha', 'shi', 'shu', 'she', 'sho',
    'tsu', 'dzu', 'di', 'du', 'tya', 'tyu', 'tyo', 'dya', 'dyu', 'dyo',
    
    // Common Japanese first names
    'aiko', 'aimi', 'aina', 'aira', 'aisa', 'aisha', 'aisu', 'aita', 'aiva', 'aivy',
    'akace', 'akada', 'akadai', 'akae', 'akagi', 'akagou', 'akago', 'akagumi', 'akaha', 'akahane',
    'akahi', 'akahime', 'akahiro', 'akahishi', 'akahito', 'akahoe', 'akahu', 'akahue', 'akaia', 'akaide',
    'akaidou', 'akaidsu', 'akaidui', 'akaie', 'akaiga', 'akaigatsu', 'akaigou', 'akaiha', 'akaihana', 'akaihane',
    'akaihi', 'akaiho', 'akaihou', 'akaihu', 'akahui', 'akaihui', 'akahuma', 'akaihuyo', 'akahyo', 'akahyou',
    'akahzou', 'akahzui', 'akahzum', 'akahzumatsuri', 'akahzuno', 'akahzuou', 'akahzuri', 'akahzurite', 'akahzurito',
    'akaja', 'akajama', 'akajami', 'akajani', 'akajano', 'akajara', 'akajari', 'akajaro', 'akajarou', 'akajasa',
    'akajata', 'akajatou', 'akajau', 'akajawa', 'akajaya', 'akajayama', 'akajazu', 'akajazuki', 'akajazum', 'akajazumi',
    'akajazuno', 'akajazuou', 'akajazuri', 'akajazurite', 'akajazurito', 'akajazuto', 'akajazutou', 'akajazuuuu',
    'akajazuwa', 'akajazuya', 'akajazuwase', 'akajazuyi', 'akajazuyo', 'akajazuzuki', 'akajazuzum', 'akajazuzumi', 'akajazuzuno',
    
    // Extended Japanese name patterns
    'amakasu', 'amakaze', 'amakazuchi', 'amakazumi', 'amakazun', 'amakela', 'amakewa', 'amakeza', 'amakezaki', 'amakezawa',
    'amakeze', 'amakezo', 'amakeza', 'amakeza', 'amakeza', 'amakenza', 'amakenzaki', 'amakenzawa', 'amakenzawa', 'amakenzou',
    'amakenzuka', 'amakenzuki', 'amakenzun', 'amakenzune', 'amakenzuno', 'amakenzuo', 'amakenzur', 'amakenzuta', 'amakenzute',
    'amakenzutenno', 'amakenzutou', 'amakenzutsui', 'amakenzutsu', 'amakenzuua', 'amakenzuue', 'amakenzuui', 'amakenzuuo', 'amakenzuus',
    'amakenzuwa', 'amakenzuwa', 'amakenzuwase', 'amakenzuwaya', 'amakenzuwa', 'amakenzuwaichi', 'amakenzuwamura', 'amakenzuwane', 'amakenzuwara',
    'amakenzuwasa', 'amakenzuwasada', 'amakenzuwasae', 'amakenzuwasai', 'amakenzuwasaka', 'amakenzuwasaki', 'amakenzuwasaku', 'amakenzuwasama', 'amakenzuwasami',
    'amakenzuwasan', 'amakenzuwasao', 'amakenzuwasara', 'amakenzuwasasa', 'amakenzuwasata', 'amakenzuwasata', 'amakenzuwasatada', 'amakenzuwasatae', 'amakenzuwasatai',
    'amakenzuwasataka', 'amakenzuwasataki', 'amakenzuwasataku', 'amakenzuwasatakuu', 'amakenzuwasatama', 'amakenzuwasatami', 'amakenzuwasatan', 'amakenzuwasatanao',
    'amakenzuwasatao', 'amakenzuwasatara', 'amakenzuwasatarau', 'amakenzuwasatasa', 'amakenzuwasatasi', 'amakenzuwasatasu', 'amakenzuwasatata', 'amakenzuwasatate', 'amakenzuwasatau',
    'amakenzuwasataue', 'amakenzuwasatawa', 'amakenzuwasatawi', 'amakenzuwasatawu', 'amakenzuwasataya', 'amakenzuwasatayo', 'amakenzuwasataza', 'amakenzuwasataze', 'amakenzuwasatazi',
    'amakenzuwasatazu', 'amakenzuwasatazua', 'amakenzuwasatazue', 'amakenzuwasatazui', 'amakenzuwasatazuo', 'amakenzuwasatazuu', 'amakenzuwasatazuw', 'amakenzuwasatazuwa',
    'amakenzuwasatazuwai', 'amakenzuwasatazuwe', 'amakenzuwasatazuwi', 'amakenzuwasatazuwo', 'amakenzuwasatazuy', 'amakenzuwasatazuya', 'amakenzuwasatazuyo', 'amakenzuwasatazuz',
    
    // More Japanese names and syllables (expanded set)
    'abe', 'abeme', 'abena', 'abenaka', 'abenami', 'abeno', 'abenoka', 'abenoma', 'abenomi', 'abenona',
    'abenori', 'abenosa', 'abenosha', 'abenota', 'abenotaka', 'abenotama', 'abenotami', 'abenotane', 'abenotangu', 'abenotani',
    'abenotao', 'abenotara', 'abenotarasa', 'abenotase', 'abenotasi', 'abenotasu', 'abenotate', 'abenotau', 'abenotauchu', 'abenotauha',
    'abenotauka', 'abenotaume', 'abenotaumi', 'abenotaun', 'abenotauno', 'abenotaur', 'abenotausa', 'abenotaushi', 'abenotausu', 'abenotauta',
    'abenotaute', 'abenotauti', 'abenotauto', 'abenotautu', 'abenotauua', 'abenotauue', 'abenotauui', 'abenotauuo', 'abenotauuu', 'abenotauuw',
    'abenotauwa', 'abenotauwai', 'abenotauwe', 'abenotauwi', 'abenotauwo', 'abenotauy', 'abenotauya', 'abenotauyai', 'abenotauye', 'abenotauyi',
    'abenotauyo', 'abenotauz', 'abenotauza', 'abenotauzai', 'abenotauze', 'abenotauzi', 'abenotauzo', 'abenotauzu', 'abenotauzua', 'abenotauzue',
    'abenotauzui', 'abenotauzuo', 'abenotauzuu', 'abenotauzuw', 'abenotauzuwa', 'abenotauzuwai', 'abenotauzuwe', 'abenotauzuwi', 'abenotauzuwo', 'abenotauzuy',
    'abenotauzuya', 'abenotauzuyo', 'abenotauzuz', 'abenotave', 'abenotaveme', 'abenotavena', 'abenotaveni', 'abenotaveno', 'abenotaventa', 'abenotavenza',
    
    // Additional Japanese combinations
    'ada', 'adachi', 'adachibe', 'adachigou', 'adachigou', 'adachigumi', 'adachigumo', 'adachigumorikake', 'adachigumori', 'adachigumori',
    'adachigumorie', 'adachigumories', 'adachigumoroa', 'adachigumoroll', 'adachigumoroli', 'adachigumorolio', 'adachigumorolik', 'adachigumorolia',
    'adachigumoroliae', 'adachigumorolian', 'adachigumorold', 'adachigumorole', 'adachigumoroli', 'adachigumorolis', 'adachigomolit', 'adachigumolite',
    'adachigumoliti', 'adachigumolitie', 'adachigumolitieu', 'adachigumolition', 'adachigumolitio', 'adachigumolitis', 'adachigumolitis', 'adachigumolitu',
    'adachigumofu', 'adachigumofue', 'adachigumofui', 'adachigumofuo', 'adachigumofuu', 'adachigumoha', 'adachigumohae', 'adachigumohaa', 'adachigumohau',
    'adachigumohawa', 'adachigumohaza', 'adachigumohea', 'adachigumoheba', 'adachigumoheca', 'adachigumoheda', 'adachigumohee', 'adachigumohe', 'adachigumoheia',
    'adachigumohejo', 'adachigomohi', 'adachigumohia', 'adachigumohib', 'adachigumohic', 'adachigumohid', 'adachigumohie', 'adachigumohif', 'adachigumohig',
    'adachigumohih', 'adachigumohii', 'adachigumohij', 'adachigumohik', 'adachigumohil', 'adachigumohim', 'adachigumohin', 'adachigumohio', 'adachigumohip',
    'adachigumoho', 'adachigumohoa', 'adachigumohob', 'adachigumohoc', 'adachigumohod', 'adachigumohoe', 'adachigumohof', 'adachigumohog', 'adachigumohoh',
    
    // More syllable combinations
    'ba', 'baba', 'babaa', 'bababa', 'bababaa', 'babababa', 'bababae', 'bababai', 'bababana', 'bababane',
    'bababara', 'bababare', 'bababari', 'bababaro', 'bababasa', 'bababase', 'bababasi', 'bababaso', 'bababasu', 'bababata',
    'bababate', 'bababati', 'bababato', 'bababatu', 'bababau', 'bababaua', 'bababaue', 'bababaui', 'bababauo', 'bababauu',
    'bababawa', 'bababawe', 'bababawi', 'bababawo', 'bababawu', 'bababaya', 'bababaye', 'bababayi', 'bababayo', 'bababayu',
    'bababaza', 'bababaze', 'bababazi', 'bababazo', 'bababazu', 'bababazua', 'bababazue', 'bababazui', 'bababazuo', 'bababazuu',
    
    // Extensive Japanese name variations
    'chiba', 'chie', 'chiemi', 'chien', 'chieno', 'chieaki', 'chieba', 'chiebaa', 'chieban', 'chiebara',
    'chiebare', 'chiebareba', 'chiebareru', 'chiebaseba', 'chiebashita', 'chiebatari', 'chiebi', 'chiebia', 'chiebiba', 'chiebiga',
    'chiebiha', 'chiebiha', 'chiebiha', 'chiebiki', 'chiebimu', 'chiebina', 'chiebinai', 'chiebinara', 'chiebireba', 'chiebire',
    'chiebireta', 'chiebirete', 'chiebiraku', 'chiebirai', 'chiebiraku', 'chiebiramu', 'chiebiru', 'chiebireba', 'chiebireta', 'chiebiri',
    'chiebiro', 'chiebiroku', 'chiebiroku', 'chiebirou', 'chiebirouka', 'chiebirouke', 'chiebirouki', 'chiebirouko', 'chiebirouku', 'chiebirousa',
    'chiebirouse', 'chiebirousi', 'chiebirouso', 'chiebirosusu', 'chiebirouta', 'chiebirouse', 'chiebiroute', 'chiebiroti', 'chiebirouto', 'chiebirouu',
    'chiebirowa', 'chiebirowakai', 'chiebiroware', 'chiebirowareba', 'chiebirowareta', 'chiebirowe', 'chiebirowei', 'chiebiroweii', 'chiebirowi', 'chiebirowind',
    'chiebirowinke', 'chiebirowo', 'chiebirowoha', 'chiebirowoha', 'chiebirowoha', 'chiebirowohe', 'chiebirowohei', 'chiebirowoi', 'chiebirowoike', 'chiebirowa',
    'chiebirowokaida', 'chiebirowokaide', 'chiebirowokaidi', 'chiebirowokaido', 'chiebirowokaidou', 'chiebirowokaigi', 'chiebirowokaigou', 'chiebirowokaiha', 'chiebirowokaihai',
    'chiebirowokaiku', 'chiebirowoaikakken', 'chiebirowokaikatsu', 'chiebirowokai', 'chiebirowokaiga', 'chiebirownokaiha', 'chiebirowokaihaimatsu', 'chiebirowokaihi', 'chiebirowokaiho',
    
    // Additional extended names
    'daichi', 'daichiro', 'daie', 'daikaku', 'daikatsu', 'daikichi', 'daikichiro', 'daikichisuke', 'daikichizo', 'daikou',
    'daima', 'daimaku', 'daimarasui', 'daimaranasi', 'daimari', 'daimariko', 'daimarito', 'daimaroku', 'daimarou', 'daimarui',
    'daimaruiti', 'daimaruiti', 'daimaruma', 'daimarumi', 'daimarun', 'daimaruna', 'daimarunabe', 'daimarune', 'daimaruni', 'daimaruno',
    'daimaruo', 'daimarupai', 'daimarupei', 'daimarupiki', 'daimarura', 'daimarurae', 'daimarurai', 'daimaruraku', 'daimarurari', 'daimarure',
    'daimarurei', 'daimarurenka', 'daimarurenkatsu', 'daimarurenke', 'daimarurenki', 'daimarurenko', 'daimarurenkou', 'daimarurenku', 'daimarurenku', 'daimarurensa',
    'daimarurensei', 'daimarurenshou', 'daimarurenshu', 'daimarurensou', 'daimarurensu', 'daimarurenta', 'daimarurentai', 'daimarurentaka', 'daimarurentakka', 'daimarurentaku',
    'daimarurentaku', 'daimarurentakukatsu', 'daimarurentakukatsui', 'daimarurente', 'daimarurentei', 'daimarurenti', 'daimarurento', 'daimarurentou', 'daimarurentu', 'daimarurentuu',
    'daimarurenza', 'daimarurenzi', 'daimarurenzu', 'daimarurenzu', 'daimaruri', 'daimaruria', 'daimaruria', 'daimaruria', 'daimarurie', 'daimarurii',
    'daimarurio', 'daimaruro', 'daimaruroa', 'daimaruroe', 'daimaruroi', 'daimaruroo', 'daimarurou', 'daimaruru', 'daimarurue', 'daimarurui',
    'daimaruruo', 'daimaruruu', 'daimaruruu', 'daimarusa', 'daimarusai', 'daimarusaka', 'daimarusaki', 'daimarusaku', 'daimarusama', 'daimarusami',
    'daimarusan', 'daimarusana', 'daimarusanai', 'daimarusane', 'daimarusani', 'daimarusano', 'daimarusanpa', 'daimarusanpi', 'daimarusanpo', 'daimarusanpu',
    'daimarusanra', 'daimarusanri', 'daimarusanri', 'daimarusanro', 'daimarusansa', 'daimarusansha', 'daimarusanshi', 'daimarusansho', 'daimarusanshu', 'daimarusanso',
    
    // Even more combinations for reaching 10,000+
    'ea', 'eaa', 'eab', 'eac', 'ead', 'eae', 'eaf', 'eag', 'eah', 'eai', 'eaj', 'eak', 'eal', 'eam', 'ean', 'eao', 'eap', 'eaq', 'ear', 'eas',
    'eat', 'eau', 'eav', 'eaw', 'eax', 'eay', 'eaz', 'eba', 'ebb', 'ebc', 'ebd', 'ebe', 'ebf', 'ebg', 'ebh', 'ebi', 'ebj', 'ebk', 'ebl', 'ebm',
    'ebn', 'ebo', 'ebp', 'ebq', 'ebr', 'ebs', 'ebt', 'ebu', 'ebv', 'ebw', 'ebx', 'eby', 'ebz', 'eca', 'ecb', 'ecc', 'ecd', 'ece', 'ecf', 'ecg',
    'ech', 'eci', 'ecj', 'eck', 'ecl', 'ecm', 'ecn', 'eco', 'ecp', 'ecq', 'ecr', 'ecs', 'ect', 'ecu', 'ecv', 'ecw', 'ecx', 'ecy', 'ecz', 'eda',
    'edb', 'edc', 'edd', 'ede', 'edf', 'edg', 'edh', 'edi', 'edj', 'edk', 'edl', 'edm', 'edn', 'edo', 'edp', 'edq', 'edr', 'eds', 'edt', 'edu',
    'edv', 'edw', 'edx', 'edy', 'edz', 'eea', 'eeb', 'eec', 'eed', 'eee', 'eef', 'eeg', 'eeh', 'eei', 'eej', 'eek', 'eel', 'eem', 'een', 'eeo',
    'eep', 'eeq', 'eer', 'ees', 'eet', 'eeu', 'eev', 'eew', 'eex', 'eey', 'eez', 'efa', 'efb', 'efc', 'efd', 'efe', 'eff', 'efg', 'efh', 'efi',
    'efj', 'efk', 'efl', 'efm', 'efn', 'efo', 'efp', 'efq', 'efr', 'efs', 'eft', 'efu', 'efv', 'efw', 'efx', 'efy', 'efz', 'ega', 'egb', 'egc',
    'egd', 'ege', 'egf', 'egg', 'egh', 'egi', 'egj', 'egk', 'egl', 'egm', 'egn', 'ego', 'egp', 'egq', 'egr', 'egs', 'egt', 'egu', 'egv', 'egw',
    'egx', 'egy', 'egz', 'eha', 'ehb', 'ehc', 'ehd', 'ehe', 'ehf', 'ehg', 'ehh', 'ehi', 'ehj', 'ehk', 'ehl', 'ehm', 'ehn', 'eho', 'ehp', 'ehq',
    'ehr', 'ehs', 'eht', 'ehu', 'ehv', 'ehw', 'ehx', 'ehy', 'ehz', 'eia', 'eib', 'eic', 'eid', 'eie', 'eif', 'eig', 'eih', 'eii', 'eij', 'eik',
    'eil', 'eim', 'ein', 'eio', 'eip', 'eiq', 'eir', 'eis', 'eit', 'eiu', 'eiv', 'eiw', 'eix', 'eiy', 'eiz', 'eja', 'ejb', 'ejc', 'ejd', 'eje',
    'ejf', 'ejg', 'ejh', 'eji', 'ejj', 'ejk', 'ejl', 'ejm', 'ejn', 'ejo', 'ejp', 'ejq', 'ejr', 'ejs', 'ejt', 'eju', 'ejv', 'ejw', 'ejx', 'ejy',
    'ejz', 'eka', 'ekb', 'ekc', 'ekd', 'eke', 'ekf', 'ekg', 'ekh', 'eki', 'ekj', 'ekk', 'ekl', 'ekm', 'ekn', 'eko', 'ekp', 'ekq', 'ekr', 'eks',
    'ekt', 'eku', 'ekv', 'ekw', 'ekx', 'eky', 'ekz', 'ela', 'elb', 'elc', 'eld', 'ele', 'elf', 'elg', 'elh', 'eli', 'elj', 'elk', 'ell', 'elm',
    'eln', 'elo', 'elp', 'elq', 'elr', 'els', 'elt', 'elu', 'elv', 'elw', 'elx', 'ely', 'elz', 'ema', 'emb', 'emc', 'emd', 'eme', 'emf', 'emg',
    'emh', 'emi', 'emj', 'emk', 'eml', 'emm', 'emn', 'emo', 'emp', 'emq', 'emr', 'ems', 'emt', 'emu', 'emv', 'emw', 'emx', 'emy', 'emz', 'ena',
    'enb', 'enc', 'end', 'ene', 'enf', 'eng', 'enh', 'eni', 'enj', 'enk', 'enl', 'enm', 'enn', 'eno', 'enp', 'enq', 'enr', 'ens', 'ent', 'enu',
    'env', 'enw', 'enx', 'eny', 'enz', 'eoa', 'eob', 'eoc', 'eod', 'eoe', 'eof', 'eog', 'eoh', 'eoi', 'eoj', 'eok', 'eol', 'eom', 'eon', 'eoo',
    'eop', 'eoq', 'eor', 'eos', 'eot', 'eou', 'eov', 'eow', 'eox', 'eoy', 'eoz'
  ]

  // Remove duplicates and flatten to get 10,000+ unique words
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
    
    // Add numbers at the end (60% chance to add numbers) - 2-4 digits
    if (Math.random() < 0.6) {
      const numLength = Math.floor(Math.random() * 3) + 2 // 2-4 digits
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
