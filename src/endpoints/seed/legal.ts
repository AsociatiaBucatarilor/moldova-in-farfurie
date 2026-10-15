// Draft legal texts (Republic of Moldova, Law no. 133/2011 on personal data protection).
// They describe what the site actually does: no visitor accounts or forms, a language cookie,
// a consent cookie and YouTube embeds loaded only after consent. Have them reviewed by a lawyer
// and keep them in sync with the site when adding analytics, forms or other third parties.

import type { Locale } from './data'

type Policy = { title: string; markdown: string }

export const LEGAL_UPDATED_ON = '2026-10-15'

const OPERATOR = 'Asociația Bucătarilor Profesioniști din Moldova'

export const PRIVACY: Record<Locale, Policy> = {
  ro: {
    title: 'Politica de confidențialitate',
    markdown: `Această politică explică ce date cu caracter personal sunt prelucrate atunci când vizitați site-ul **Moldova în Farfurie** (un proiect Chef's Forum), în ce scop și ce drepturi aveți. Prelucrarea se face în conformitate cu Legea nr. 133 din 8 iulie 2011 privind protecția datelor cu caracter personal și cu celelalte acte normative în vigoare ale Republicii Moldova.

## 1. Operatorul de date

Operatorul datelor este **${OPERATOR}** („Operatorul”, „noi”). Ne puteți contacta pentru orice întrebare privind datele personale folosind datele din secțiunea **Contacte** a site-ului.

## 2. Ce date prelucrăm

Site-ul nu vă cere să vă creați un cont și nu conține formulare. Prelucrăm doar:

- **Date tehnice de acces** – adresa IP, tipul browserului și al dispozitivului, data și ora accesării și paginile solicitate. Acestea sunt înregistrate automat de furnizorul de găzduire pentru livrarea site-ului și pentru protecția împotriva abuzurilor.
- **Preferințe salvate în cookie-uri** – limba aleasă și opțiunea dvs. privind cookie-urile. Detalii găsiți în [Politica de cookie-uri](/politica-cookie).
- **Date transmise prin conținut extern** – dacă acceptați cookie-urile pentru conținut extern și redați un video, YouTube (Google) primește datele tehnice ale dispozitivului dvs. și poate seta propriile cookie-uri.
- **Date ale administratorilor** – adresa de e-mail și parola (stocată criptat) ale persoanelor care gestionează conținutul site-ului.

Dacă ne scrieți pe e-mail sau ne sunați, prelucrăm datele pe care ni le transmiteți exclusiv pentru a vă răspunde.

## 3. Scopuri și temeiuri

- **Afișarea site-ului și securitatea lui** – temei: interesul legitim al Operatorului de a oferi un site funcțional și sigur;
- **Memorarea limbii și a opțiunii privind cookie-urile** – temei: interesul legitim; aceste cookie-uri sunt strict necesare;
- **Redarea videoclipurilor de pe YouTube** – temei: consimțământul dvs., exprimat prin bannerul de cookie-uri;
- **Răspunsul la solicitările dvs.** – temei: consimțământul dvs. și interesul legitim de a comunica cu publicul.

Nu folosim datele pentru publicitate, profilare sau decizii automatizate și nu le vindem.

## 4. Destinatari și persoane împuternicite

Datele pot fi accesate de furnizorii care ne ajută să operăm site-ul, în calitate de persoane împuternicite de operator:

- **Vercel Inc.** – găzduirea site-ului, rețeaua de livrare a conținutului și stocarea imaginilor;
- **Neon Inc.** – găzduirea bazei de date cu conținutul site-ului (nu conține date despre vizitatori);
- **Google (YouTube)** – doar pentru videoclipurile redate după exprimarea consimțământului; Google acționează ca operator independent, conform propriei politici de confidențialitate.

Unii furnizori au sediul în afara Republicii Moldova (inclusiv în SUA). În aceste cazuri, transferul se face doar pe baza garanțiilor contractuale oferite de furnizori pentru protecția datelor, în condițiile legii.

## 5. Cât timp păstrăm datele

- datele tehnice de acces – perioada limitată stabilită de furnizorul de găzduire pentru securitate;
- cookie-urile – durata indicată în Politica de cookie-uri;
- corespondența – cât este necesar pentru a vă răspunde, apoi se șterge, dacă legea nu impune altfel.

## 6. Drepturile dvs.

În condițiile Legii nr. 133/2011 aveți dreptul:

- de a fi informat despre prelucrarea datelor;
- de acces la datele care vă privesc;
- de intervenție – rectificarea, actualizarea, blocarea sau ștergerea datelor;
- de opoziție față de prelucrare, din motive întemeiate și legitime;
- de a nu fi supus unei decizii individuale bazate exclusiv pe prelucrare automatizată;
- de a vă retrage oricând consimțământul (de exemplu, din **Setări cookie** din subsolul site-ului);
- de a depune o plângere la **Centrul Național pentru Protecția Datelor cu Caracter Personal** ([datepersonale.md](https://datepersonale.md)) și de a vă adresa instanței de judecată.

Pentru exercitarea drepturilor, scrieți-ne folosind datele din secțiunea **Contacte**.

## 7. Securitate

Site-ul este servit exclusiv prin conexiune criptată (HTTPS), accesul la panoul de administrare este protejat prin parolă, iar furnizorii noștri aplică măsuri tehnice și organizatorice de protecție a datelor.

## 8. Minori

Site-ul nu se adresează în mod special copiilor și nu colectăm cu bună știință date de la persoane sub 18 ani.

## 9. Modificări

Putem actualiza această politică atunci când se schimbă site-ul sau legislația. Data ultimei actualizări este afișată la începutul paginii.`,
  },
  ru: {
    title: 'Политика конфиденциальности',
    markdown: `Настоящая политика объясняет, какие персональные данные обрабатываются при посещении сайта **Moldova în Farfurie** (проект Chef's Forum), с какой целью и какие у вас есть права. Обработка осуществляется в соответствии с Законом № 133 от 8 июля 2011 года о защите персональных данных и другими действующими нормативными актами Республики Молдова.

## 1. Оператор данных

Оператором данных является **${OPERATOR}** («Оператор», «мы»). По любым вопросам, связанным с персональными данными, вы можете связаться с нами, используя данные из раздела **Контакты** сайта.

## 2. Какие данные мы обрабатываем

На сайте не нужно создавать учётную запись и нет форм. Мы обрабатываем только:

- **Технические данные доступа** — IP-адрес, тип браузера и устройства, дату и время посещения, запрошенные страницы. Они автоматически регистрируются хостинг-провайдером для работы сайта и защиты от злоупотреблений.
- **Настройки, сохранённые в cookie** — выбранный язык и ваш выбор относительно cookie. Подробнее — в [Политике использования cookie](/ru/politica-cookie).
- **Данные, передаваемые внешнему контенту** — если вы разрешите cookie для внешнего контента и запустите видео, YouTube (Google) получит технические данные вашего устройства и может установить собственные cookie.
- **Данные администраторов** — адрес электронной почты и пароль (в зашифрованном виде) лиц, управляющих содержимым сайта.

Если вы пишете нам или звоните, мы обрабатываем переданные данные исключительно для ответа вам.

## 3. Цели и основания

- **Работа сайта и его безопасность** – основание: законный интерес Оператора в функционирующем и безопасном сайте;
- **Сохранение языка и выбора относительно cookie** – основание: законный интерес; эти cookie строго необходимы;
- **Воспроизведение видео с YouTube** – основание: ваше согласие, выраженное через баннер cookie;
- **Ответ на ваши обращения** – основание: ваше согласие и законный интерес в общении с публикой.

Мы не используем данные для рекламы, профилирования или автоматизированных решений и не продаём их.

## 4. Получатели и обработчики

Доступ к данным могут иметь поставщики, помогающие нам обеспечивать работу сайта, в качестве уполномоченных лиц оператора:

- **Vercel Inc.** — хостинг сайта, сеть доставки контента и хранение изображений;
- **Neon Inc.** — хостинг базы данных с содержимым сайта (не содержит данных о посетителях);
- **Google (YouTube)** — только для видео, воспроизведённых после вашего согласия; Google действует как самостоятельный оператор согласно собственной политике конфиденциальности.

Некоторые поставщики находятся за пределами Республики Молдова (в том числе в США). В таких случаях передача осуществляется только на основе договорных гарантий защиты данных, предоставляемых поставщиками, в соответствии с законом.

## 5. Сроки хранения

- технические данные доступа — ограниченный срок, установленный хостинг-провайдером для целей безопасности;
- cookie — срок, указанный в Политике использования cookie;
- переписка — столько, сколько нужно для ответа, затем удаляется, если закон не требует иного.

## 6. Ваши права

В соответствии с Законом № 133/2011 вы имеете право:

- на информацию об обработке данных;
- на доступ к данным, касающимся вас;
- на вмешательство — исправление, обновление, блокирование или удаление данных;
- возражать против обработки по обоснованным и законным причинам;
- не подвергаться индивидуальному решению, основанному исключительно на автоматизированной обработке;
- в любое время отозвать согласие (например, через **Настройки cookie** внизу сайта);
- подать жалобу в **Национальный центр по защите персональных данных** ([datepersonale.md](https://datepersonale.md)) и обратиться в суд.

Для реализации прав напишите нам, используя данные из раздела **Контакты**.

## 7. Безопасность

Сайт работает только через зашифрованное соединение (HTTPS), доступ к панели администрирования защищён паролем, а наши поставщики применяют технические и организационные меры защиты данных.

## 8. Несовершеннолетние

Сайт не предназначен специально для детей, и мы сознательно не собираем данные лиц младше 18 лет.

## 9. Изменения

Мы можем обновлять эту политику при изменении сайта или законодательства. Дата последнего обновления указана в начале страницы.`,
  },
  en: {
    title: 'Privacy Policy',
    markdown: `This policy explains which personal data is processed when you visit the **Moldova în Farfurie** website (a Chef's Forum project), why, and what rights you have. Processing is carried out in accordance with Law no. 133 of 8 July 2011 on personal data protection and the other legislation in force in the Republic of Moldova.

## 1. Data controller

The controller is **${OPERATOR}** ("the Controller", "we"). For any question about personal data, contact us using the details in the **Contacts** section of the website.

## 2. What data we process

The website does not ask you to create an account and has no forms. We only process:

- **Technical access data** – IP address, browser and device type, date and time of access and the pages requested. These are logged automatically by the hosting provider to deliver the website and protect it against abuse.
- **Preferences stored in cookies** – your chosen language and your cookie choice. See the [Cookie Policy](/en/politica-cookie) for details.
- **Data sent to external content** – if you accept cookies for external content and play a video, YouTube (Google) receives your device's technical data and may set its own cookies.
- **Administrator data** – the e-mail address and password (stored encrypted) of the people who manage the website's content.

If you e-mail or call us, we process the data you send only to reply to you.

## 3. Purposes and legal grounds

- **Serving the website and keeping it secure** – legal ground: the Controller's legitimate interest in a working, secure website;
- **Remembering your language and cookie choice** – legal ground: legitimate interest; these cookies are strictly necessary;
- **Playing YouTube videos** – legal ground: your consent, given through the cookie banner;
- **Replying to your requests** – legal ground: your consent and our legitimate interest in communicating with the public.

We do not use data for advertising, profiling or automated decisions, and we do not sell it.

## 4. Recipients and processors

The data may be accessed by the providers that help us run the website, acting as processors:

- **Vercel Inc.** – website hosting, content delivery network and image storage;
- **Neon Inc.** – hosting of the database with the website's content (it holds no visitor data);
- **Google (YouTube)** – only for videos played after you consent; Google acts as an independent controller under its own privacy policy.

Some providers are based outside the Republic of Moldova (including in the USA). In those cases data is transferred only on the basis of the contractual data-protection safeguards offered by the providers, as permitted by law.

## 5. How long we keep data

- technical access data – the limited period set by the hosting provider for security purposes;
- cookies – the duration listed in the Cookie Policy;
- correspondence – as long as needed to reply, then deleted unless the law requires otherwise.

## 6. Your rights

Under Law no. 133/2011 you have the right:

- to be informed about the processing;
- of access to the data concerning you;
- of intervention – rectification, updating, blocking or deletion of data;
- to object to processing on justified, legitimate grounds;
- not to be subject to an individual decision based solely on automated processing;
- to withdraw your consent at any time (for example via **Cookie settings** in the website footer);
- to lodge a complaint with the **National Center for Personal Data Protection** ([datepersonale.md](https://datepersonale.md)) and to go to court.

To exercise your rights, write to us using the details in the **Contacts** section.

## 7. Security

The website is served only over an encrypted connection (HTTPS), the admin panel is password-protected, and our providers apply technical and organisational data-protection measures.

## 8. Minors

The website is not specifically aimed at children and we do not knowingly collect data from persons under 18.

## 9. Changes

We may update this policy when the website or the law changes. The date of the last update is shown at the top of the page.`,
  },
}

const cookieList: Record<Locale, string> = {
  ro: `- **NEXT_LOCALE** (Moldova în Farfurie) – strict necesar; memorează limba aleasă; durată: 1 an.
- **mf_cookie_consent** (Moldova în Farfurie) – strict necesar; memorează opțiunea dvs. privind cookie-urile; durată: 6 luni.
- **payload-token** (Moldova în Farfurie) – strict necesar, doar pentru administratori; autentificarea în panoul de administrare; durată: 2 ore.
- **cookie-uri YouTube (de ex. VISITOR_INFO1_LIVE, YSC)** (Google) – conținut extern, doar cu consimțământ; redarea videoclipurilor încorporate; durată: stabilită de Google.`,
  ru: `- **NEXT_LOCALE** (Moldova în Farfurie) – строго необходимый; запоминает выбранный язык; срок: 1 год.
- **mf_cookie_consent** (Moldova în Farfurie) – строго необходимый; запоминает ваш выбор относительно cookie; срок: 6 месяцев.
- **payload-token** (Moldova în Farfurie) – строго необходимый, только для администраторов; вход в панель администрирования; срок: 2 часа.
- **cookie YouTube (напр. VISITOR_INFO1_LIVE, YSC)** (Google) – внешний контент, только с согласия; воспроизведение встроенных видео; срок: определяется Google.`,
  en: `- **NEXT_LOCALE** (Moldova în Farfurie) – strictly necessary; remembers your chosen language; duration: 1 year.
- **mf_cookie_consent** (Moldova în Farfurie) – strictly necessary; remembers your cookie choice; duration: 6 months.
- **payload-token** (Moldova în Farfurie) – strictly necessary, administrators only; signing in to the admin panel; duration: 2 hours.
- **YouTube cookies (e.g. VISITOR_INFO1_LIVE, YSC)** (Google) – external content, only with consent; playing embedded videos; duration: set by Google.`,
}

export const COOKIES: Record<Locale, Policy> = {
  ro: {
    title: 'Politica de cookie-uri',
    markdown: `Această politică explică ce cookie-uri folosește site-ul **Moldova în Farfurie** și cum le puteți controla. Ea completează [Politica de confidențialitate](/politica-de-confidentialitate). Operatorul este **${OPERATOR}**.

## 1. Ce sunt cookie-urile

Cookie-urile sunt fișiere text mici pe care un site le salvează în browserul dvs. pentru a-și aminti informații între vizite, de exemplu limba aleasă.

## 2. Ce cookie-uri folosim

Folosim doar cookie-uri **strict necesare** pentru funcționarea site-ului. **Nu folosim** cookie-uri de analiză, de marketing sau de publicitate.

Videoclipurile episoadelor sunt găzduite pe YouTube. Ele se încarcă **doar după ce vă dați acordul**. Până atunci, în locul videoclipului apare un buton de acceptare, iar YouTube nu primește nicio dată.

${cookieList.ro}

## 3. Temeiul legal

Cookie-urile strict necesare se plasează fără consimțământ, deoarece fără ele site-ul nu poate funcționa corect. Cookie-urile pentru conținut extern (YouTube) se plasează numai cu consimțământul dvs. prealabil, conform Legii nr. 133/2011 privind protecția datelor cu caracter personal.

## 4. Cum vă gestionați opțiunile

- la prima vizită, alegeți **Accept toate** sau **Doar necesare** în bannerul de cookie-uri;
- vă puteți schimba oricând alegerea din linkul **Setări cookie** din subsolul site-ului;
- puteți șterge sau bloca cookie-urile din setările browserului; blocarea cookie-urilor strict necesare poate afecta funcționarea site-ului.

Pentru cookie-urile YouTube, consultați politica Google: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies).

## 5. Contact și modificări

Pentru întrebări, folosiți datele din secțiunea **Contacte**. Vom actualiza această politică dacă adăugăm servicii noi care folosesc cookie-uri.`,
  },
  ru: {
    title: 'Политика использования cookie',
    markdown: `Настоящая политика объясняет, какие cookie использует сайт **Moldova în Farfurie** и как вы можете ими управлять. Она дополняет [Политику конфиденциальности](/ru/politica-de-confidentialitate). Оператор — **${OPERATOR}**.

## 1. Что такое cookie

Cookie — это небольшие текстовые файлы, которые сайт сохраняет в вашем браузере, чтобы запоминать информацию между посещениями, например выбранный язык.

## 2. Какие cookie мы используем

Мы используем только **строго необходимые** для работы сайта cookie. Мы **не используем** аналитические, маркетинговые или рекламные cookie.

Видео эпизодов размещены на YouTube. Они загружаются **только после вашего согласия**. До этого вместо видео отображается кнопка согласия, и YouTube не получает никаких данных.

${cookieList.ru}

## 3. Правовое основание

Строго необходимые cookie устанавливаются без согласия, так как без них сайт не может работать правильно. Cookie внешнего контента (YouTube) устанавливаются только с вашего предварительного согласия в соответствии с Законом № 133/2011 о защите персональных данных.

## 4. Как управлять настройками

- при первом посещении выберите **Принять все** или **Только необходимые** в баннере cookie;
- вы можете в любое время изменить выбор по ссылке **Настройки cookie** внизу сайта;
- вы можете удалить или заблокировать cookie в настройках браузера; блокировка строго необходимых cookie может нарушить работу сайта.

О cookie YouTube читайте в политике Google: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies).

## 5. Контакты и изменения

По вопросам используйте данные из раздела **Контакты**. Мы обновим эту политику, если добавим новые сервисы, использующие cookie.`,
  },
  en: {
    title: 'Cookie Policy',
    markdown: `This policy explains which cookies the **Moldova în Farfurie** website uses and how you can control them. It supplements the [Privacy Policy](/en/politica-de-confidentialitate). The controller is **${OPERATOR}**.

## 1. What cookies are

Cookies are small text files a website stores in your browser to remember information between visits, such as your chosen language.

## 2. Which cookies we use

We only use cookies that are **strictly necessary** for the website to work. We **do not use** analytics, marketing or advertising cookies.

Episode videos are hosted on YouTube. They load **only after you give your consent**. Until then a consent button is shown instead of the video and YouTube receives no data.

${cookieList.en}

## 3. Legal ground

Strictly necessary cookies are set without consent, because the website cannot work properly without them. Cookies for external content (YouTube) are set only with your prior consent, in accordance with Law no. 133/2011 on personal data protection.

## 4. Managing your choices

- on your first visit, choose **Accept all** or **Necessary only** in the cookie banner;
- change your choice at any time via the **Cookie settings** link in the website footer;
- delete or block cookies in your browser settings; blocking strictly necessary cookies may affect how the website works.

For YouTube cookies, see Google's policy: [policies.google.com/technologies/cookies](https://policies.google.com/technologies/cookies).

## 5. Contact and changes

For questions, use the details in the **Contacts** section. We will update this policy if we add new services that use cookies.`,
  },
}
