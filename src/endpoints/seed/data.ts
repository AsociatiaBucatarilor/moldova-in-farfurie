import type { Raioane } from '@/payload-types'

// Content taken from the design (Moldova în Farfurie landing). Romanian is the source locale.

export type Locale = 'ro' | 'ru' | 'en'
export type Localized = Record<Locale, string>

type Region = 'nord' | 'centru' | 'sud'

type PhotoItem = { name: Localized; image: string }

export type RaionSeed = {
  mapId: Raioane['mapId']
  region: Region
  name: Localized
  cover: string
  heritage?: Localized
  sights?: PhotoItem[]
  dishes?: PhotoItem[]
}

const r = (mapId: Raioane['mapId'], region: Region, ro: string, ru: string, en: string, cover: string) => ({
  mapId,
  region,
  name: { ro, ru, en },
  cover,
})

const placinte: PhotoItem = {
  name: { ro: 'Plăcinte tradiționale', ru: 'Традиционные плачинты', en: 'Traditional plăcinte' },
  image: 'turte.jpg',
}
const vinuriLocale: PhotoItem = {
  name: { ro: 'Vinuri locale', ru: 'Местные вина', en: 'Local wines' },
  image: 'vin.jpg',
}

export const RAIOANE: RaionSeed[] = [
  // Nord
  r('briceni', 'nord', 'Briceni', 'Бричаны', 'Briceni', 'lac.jpg'),
  r('donduseni', 'nord', 'Dondușeni', 'Дондюшаны', 'Donduseni', 'mere.jpg'),
  r('drochia', 'nord', 'Drochia', 'Дрокия', 'Drochia', 'biserica-trandafiri.jpg'),
  r('edinet', 'nord', 'Edineț', 'Единец', 'Edinet', 'biserica-vale.jpg'),
  r('falesti', 'nord', 'Fălești', 'Фалешты', 'Falesti', 'gpt1.jpg'),
  r('floresti', 'nord', 'Florești', 'Флорешты', 'Floresti', 'turte.jpg'),
  r('glodeni', 'nord', 'Glodeni', 'Глодяны', 'Glodeni', 'lac.jpg'),
  r('ocnita', 'nord', 'Ocnița', 'Окница', 'Ocnita', 'mere.jpg'),
  r('riscani', 'nord', 'Rîșcani', 'Рышканы', 'Riscani', 'biserica-trandafiri.jpg'),
  r('singerei', 'nord', 'Sîngerei', 'Сынжерей', 'Singerei', 'biserica-vale.jpg'),
  {
    ...r('soroca', 'nord', 'Soroca', 'Сорока', 'Soroca', 'zid.jpg'),
    heritage: {
      ro: 'Cetatea Soroca, ridicată pe malul Nistrului, văile pitorești și bisericile de lemn fac din Soroca una dintre porțile nordului Moldovei.',
      ru: 'Сорокская крепость на берегу Днестра, живописные долины и деревянные церкви делают Сороку одними из ворот севера Молдовы.',
      en: 'The Soroca Fortress on the banks of the Dniester, scenic valleys and wooden churches make Soroca one of the gateways to northern Moldova.',
    },
    sights: [
      { name: { ro: 'Cetatea Soroca', ru: 'Сорокская крепость', en: 'Soroca Fortress' }, image: 'zid.jpg' },
      {
        name: { ro: 'Biserica de lemn', ru: 'Деревянная церковь', en: 'Wooden church' },
        image: 'biserica-trandafiri.jpg',
      },
      { name: { ro: 'Valea Nistrului', ru: 'Долина Днестра', en: 'Dniester Valley' }, image: 'lac.jpg' },
    ],
    dishes: [
      placinte,
      {
        name: { ro: 'Bucate din produse locale', ru: 'Блюда из местных продуктов', en: 'Dishes from local produce' },
        image: 'gpt1.jpg',
      },
      vinuriLocale,
    ],
  },
  // Centru
  r('anenii-noi', 'centru', 'Anenii Noi', 'Новые Анены', 'Anenii Noi', 'podgorii.jpg'),
  r('calarasi', 'centru', 'Călărași', 'Кэлэрашь', 'Calarasi', 'struguri.jpg'),
  r('criuleni', 'centru', 'Criuleni', 'Криуляны', 'Criuleni', 'conac.jpg'),
  r('dubasari', 'centru', 'Dubăsari', 'Дубоссары', 'Dubasari', 'x3.jpg'),
  r('hincesti', 'centru', 'Hîncești', 'Хынчешты', 'Hincesti', 'trebujeni.jpg'),
  r('ialoveni', 'centru', 'Ialoveni', 'Яловены', 'Ialoveni', 'vin.jpg'),
  r('nisporeni', 'centru', 'Nisporeni', 'Ниспорены', 'Nisporeni', 'x1.jpg'),
  {
    ...r('orhei', 'centru', 'Orhei', 'Орхей', 'Orhei', 'x2.jpg'),
    heritage: {
      ro: 'Orheiul Vechi reunește stânci, meandrele Răutului, patrimoniu arheologic și sate precum Butuceni și Trebujeni. Un peisaj în care istoria și viața rurală se întâlnesc.',
      ru: 'Старый Орхей объединяет скалы, излучины Реута, археологическое наследие и сёла Бутучень и Требужень. Пейзаж, где встречаются история и сельская жизнь.',
      en: 'Old Orhei brings together cliffs, the meanders of the Răut, archaeological heritage and villages such as Butuceni and Trebujeni — a landscape where history and rural life meet.',
    },
    sights: [
      { name: { ro: 'Orheiul Vechi', ru: 'Старый Орхей', en: 'Old Orhei' }, image: 'trebujeni.jpg' },
      { name: { ro: 'Mănăstirea Curchi', ru: 'Монастырь Курки', en: 'Curchi Monastery' }, image: 'x3.jpg' },
      {
        name: { ro: 'Rezervația Trebujeni', ru: 'Заповедник Требужень', en: 'Trebujeni Reserve' },
        image: 'canion.jpg',
      },
    ],
    dishes: [
      placinte,
      {
        name: { ro: 'Bucate din produse locale', ru: 'Блюда из местных продуктов', en: 'Dishes from local produce' },
        image: 'x1.jpg',
      },
      { name: { ro: 'Vinuri din Orhei', ru: 'Вина Орхея', en: 'Orhei wines' }, image: 'vin.jpg' },
    ],
  },
  r('rezina', 'centru', 'Rezina', 'Резина', 'Rezina', 'canion.jpg'),
  r('straseni', 'centru', 'Strășeni', 'Страшены', 'Straseni', 'podgorii.jpg'),
  r('soldanesti', 'centru', 'Șoldănești', 'Шолданешты', 'Soldanesti', 'struguri.jpg'),
  r('telenesti', 'centru', 'Telenești', 'Теленешты', 'Telenesti', 'conac.jpg'),
  r('ungheni', 'centru', 'Ungheni', 'Унгены', 'Ungheni', 'x3.jpg'),
  // Sud
  r('basarabeasca', 'sud', 'Basarabeasca', 'Бессарабка', 'Basarabeasca', 'podgorii.jpg'),
  {
    ...r('cahul', 'sud', 'Cahul', 'Кагул', 'Cahul', 'lanuri.jpg'),
    heritage: {
      ro: 'Câmpii întinse, Lacul Beleu, podgorii și tradiții multiculturale în sudul țării — un ținut al soarelui și al ospitalității.',
      ru: 'Бескрайние поля, озеро Белеу, виноградники и многокультурные традиции юга страны — край солнца и гостеприимства.',
      en: 'Wide plains, Lake Beleu, vineyards and multicultural traditions in the south of the country — a land of sun and hospitality.',
    },
    sights: [
      { name: { ro: 'Lacul Beleu', ru: 'Озеро Белеу', en: 'Lake Beleu' }, image: 'lac.jpg' },
      {
        name: { ro: 'Podgoriile din sud', ru: 'Южные виноградники', en: 'Southern vineyards' },
        image: 'podgorii.jpg',
      },
      { name: { ro: 'Cetăți de piatră', ru: 'Каменные крепости', en: 'Stone fortresses' }, image: 'zid.jpg' },
    ],
    dishes: [placinte, { name: { ro: 'Sarmale', ru: 'Сармале', en: 'Sarmale' }, image: 'sarmale.jpg' }, vinuriLocale],
  },
  r('cantemir', 'sud', 'Cantemir', 'Кантемир', 'Cantemir', 'sarmale.jpg'),
  r('causeni', 'sud', 'Căușeni', 'Каушаны', 'Causeni', 'zid.jpg'),
  r('cimislia', 'sud', 'Cimișlia', 'Чимишлия', 'Cimislia', 'masa.jpg'),
  r('leova', 'sud', 'Leova', 'Леова', 'Leova', 'canion.jpg'),
  r('stefan-voda', 'sud', 'Ștefan Vodă', 'Штефан-Водэ', 'Stefan Voda', 'lanuri.jpg'),
  r('taraclia', 'sud', 'Taraclia', 'Тараклия', 'Taraclia', 'sarmale.jpg'),
]

export const raionIntro = (name: Localized): Localized => ({
  ro: `Istorie, natură și gust autentic. Descoperă locurile emblematice, oamenii și preparatele care definesc raionul ${name.ro}.`,
  ru: `История, природа и подлинный вкус. Откройте знаковые места, людей и блюда, которые определяют район ${name.ru}.`,
  en: `History, nature and authentic taste. Discover the landmarks, people and dishes that define ${name.en} district.`,
})

export const raionFood = (name: Localized): Localized => ({
  ro: `Ce gătim în ${name.ro}? Rețeta și povestea ei vor fi dezvăluite odată cu episodul, alături de oamenii care păstrează tradiția.`,
  ru: `Что мы готовим в районе ${name.ru}? Рецепт и его история откроются вместе с эпизодом — вместе с людьми, хранящими традицию.`,
  en: `What are we cooking in ${name.en}? The recipe and its story will be revealed with the episode, alongside the people who keep the tradition alive.`,
})

export const LANDING = {
  heroImage: 'masa.jpg',
  hero: {
    title: { ro: 'MOLDOVA\nÎN FARFURIE', ru: 'MOLDOVA\nÎN FARFURIE', en: 'MOLDOVA\nÎN FARFURIE' },
    tagline: {
      ro: 'FIECARE ȚINUT O POVESTE,\nFIECARE GUST O TRADIȚIE',
      ru: 'КАЖДЫЙ КРАЙ — ИСТОРИЯ,\nКАЖДЫЙ ВКУС — ТРАДИЦИЯ',
      en: 'EVERY LAND A STORY,\nEVERY TASTE A TRADITION',
    },
    description: {
      ro: 'Un proiect care aduce împreună gastronomia locală, turismul și oamenii care păstrează autenticitatea Moldovei.',
      ru: 'Проект, объединяющий местную гастрономию, туризм и людей, которые хранят подлинность Молдовы.',
      en: 'A project that brings together local gastronomy, tourism and the people who keep Moldova authentic.',
    },
    script: {
      ro: 'Descoperă\nGustă\nCălătorește',
      ru: 'Открывай\nПробуй\nПутешествуй',
      en: 'Discover\nTaste\nTravel',
    },
    stats: [
      { value: '32', label: { ro: 'episoade', ru: 'эпизода', en: 'episodes' } },
      { value: '32', label: { ro: 'teasere', ru: 'тизера', en: 'teasers' } },
      { value: '3', label: { ro: 'zone ale țării', ru: 'зоны страны', en: 'regions' } },
      { value: '1', label: { ro: 'Moldovă autentică', ru: 'подлинная Молдова', en: 'authentic Moldova' } },
    ],
  },
  map: {
    eyebrow: { ro: 'EXPLOREAZĂ', ru: 'ИССЛЕДУЙ', en: 'EXPLORE' },
    title: {
      ro: 'HARTA\nGUSTURILOR\nMOLDOVEI',
      ru: 'КАРТА\nВКУСОВ\nМОЛДОВЫ',
      en: 'THE MAP\nOF MOLDOVAN\nFLAVOURS',
    },
    description: {
      ro: 'Alege un raion de pe hartă și descoperă episodul dedicat: rețete locale, locuri frumoase, oameni și tradiții autentice.',
      ru: 'Выберите район на карте и откройте посвящённый ему эпизод: местные рецепты, красивые места, люди и подлинные традиции.',
      en: 'Pick a district on the map and discover its episode: local recipes, beautiful places, people and authentic traditions.',
    },
    script: {
      ro: 'Aceeași țară.\nAtâtea povești.',
      ru: 'Одна страна.\nСтолько историй.',
      en: 'One country.\nSo many stories.',
    },
  },
  districts: {
    eyebrow: {
      ro: '32 DE RAIOANE · 32 DE EPISOADE',
      ru: '32 РАЙОНА · 32 ЭПИЗОДА',
      en: '32 DISTRICTS · 32 EPISODES',
    },
    title: { ro: 'RAIOANE', ru: 'РАЙОНЫ', en: 'DISTRICTS' },
    description: {
      ro: 'Alege un raion și descoperă episodul dedicat: rețete locale, locuri frumoase, oameni și tradiții autentice.',
      ru: 'Выберите район и откройте посвящённый ему эпизод: местные рецепты, красивые места, люди и подлинные традиции.',
      en: 'Pick a district and discover its episode: local recipes, beautiful places, people and authentic traditions.',
    },
  },
  quote: {
    text: {
      ro: '„Moldova în Farfurie este mai mult decât un proiect media.\nEste o invitație de a redescoperi țara, oamenii și gusturile care ne definesc.”',
      ru: '«Moldova în Farfurie — больше, чем медиапроект.\nЭто приглашение заново открыть страну, людей и вкусы, которые нас определяют.»',
      en: '“Moldova în Farfurie is more than a media project.\nIt is an invitation to rediscover the country, the people and the flavours that define us.”',
    },
    author: {
      ro: '— ECHIPA MOLDOVA ÎN FARFURIE',
      ru: '— КОМАНДА MOLDOVA ÎN FARFURIE',
      en: '— THE MOLDOVA ÎN FARFURIE TEAM',
    },
  },
  partnersTitle: { ro: 'În parteneriat cu', ru: 'В партнёрстве с', en: 'In partnership with' },
  partners: [
    { name: "Chef's Forum", logo: 'logo-chefs.png' },
    { name: 'Ministerul Culturii al Republicii Moldova', logo: 'logo-minister.png' },
    { name: 'Jetour', logo: 'logo-jetour.png' },
  ],
  footer: {
    copyright: {
      ro: '© 2026 Moldova în Farfurie. Toate drepturile rezervate.',
      ru: '© 2026 Moldova în Farfurie. Все права защищены.',
      en: '© 2026 Moldova în Farfurie. All rights reserved.',
    },
    madeWith: {
      ro: 'Creat cu drag pentru Moldova.',
      ru: 'Создано с любовью для Молдовы.',
      en: 'Made with love for Moldova.',
    },
  },
}
