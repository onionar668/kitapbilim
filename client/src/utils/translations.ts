import { Language } from '../types';

export interface UIStrings {
  brand: string;
  tagline: string;
  navLibrary: string;
  navStats: string;
  navAddBook: string;
  heroTitle: string;
  heroSubtitle: string;
  searchPlaceholder: string;
  allGenres: string;
  allLevels: string;
  levelBeginner: string;
  levelIntermediate: string;
  levelAdvanced: string;
  filterByLanguage: string;
  readTimeMin: string;
  startReading: string;
  takeQuizDirectly: string;
  continueReading: string;
  completedBadge: string;
  quizScoreBadge: string;
  chapter: string;
  tableOfContents: string;
  nextChapter: string;
  prevChapter: string;
  finishReadingAndQuiz: string;
  finishReading: string;
  readingSettings: string;
  themeLight: string;
  themeSepia: string;
  themeDark: string;
  fontSize: string;
  fontSerif: string;
  fontSans: string;
  backToLibrary: string;
  backToReader: string;
  quizTitle: string;
  quizSubtitle: string;
  questionOf: string;
  nextQuestion: string;
  prevQuestion: string;
  submitQuiz: string;
  openReflectionTitle: string;
  openReflectionPrompt: string;
  openReflectionPlaceholder: string;
  yourAnswer: string;
  correctAnswer: string;
  explanation: string;
  bookQuoteRef: string;
  scoreTitle: string;
  scoreGreat: string;
  scoreGood: string;
  scoreRetake: string;
  points: string;
  percent: string;
  timeSpent: string;
  retakeQuiz: string;
  readAgain: string;
  printCertificate: string;
  certificateTitle: string;
  certificateSubtitle: string;
  certifiedThat: string;
  completedBookAndPassed: string;
  withScoreOf: string;
  dateAwarded: string;
  readerNamePrompt: string;
  enterYourName: string;
  statsTitle: string;
  statsBooksRead: string;
  statsQuizzesTaken: string;
  statsAvgScore: string;
  statsBestScore: string;
  statsHistory: string;
  noAttemptsYet: string;
  addCustomBookTitle: string;
  addCustomBookDesc: string;
  bookTitleLabel: string;
  bookAuthorLabel: string;
  bookContentLabel: string;
  saveBookBtn: string;
  resetProgress: string;
  confirmReset: string;
  openReflectionAnalysis: string;
  detectedThemes: string;
  languageName: string;
  categoryAll: string;
  categoryKazakh: string;
  categoryWorld: string;
  noAiBadge: string;
  authTitleLogin: string;
  authTitleRegister: string;
  authLoginDesc: string;
  authRegisterDesc: string;
  authName: string;
  authEmail: string;
  authPassword: string;
  authLoginBtn: string;
  authRegisterBtn: string;
  authLogoutBtn: string;
  authSwitchToRegister: string;
  authSwitchToLogin: string;
  authDemoLogin: string;
  authRequiredToAddTitle: string;
  authRequiredToAddDesc: string;
  authErrorEmpty: string;
  authErrorShortPassword: string;
  authErrorEmailTaken: string;
  authErrorNotFound: string;
  authErrorWrongPassword: string;
  authMyBooks: string;
  authProfile: string;
  authAddedByYou: string;
  authDeleteBook: string;
  authConfirmDeleteBook: string;
  categoryMyBooks: string;
  signInPrompt: string;
  adminTitle: string;
  adminDescription: string;
  adminAccessDenied: string;
  adminUsers: string;
  adminReaders: string;
  adminCategories: string;
  adminBooks: string;
  adminTrash: string;
  adminRestore: string;
  adminPermanentlyDelete: string;
  adminDeletedAt: string;
  adminConfirmPermanentDeleteBook: string;
  adminRefresh: string;
  adminSearch: string;
  adminNoResults: string;
  adminJoined: string;
  adminRoleAdmin: string;
  adminRoleUser: string;
  adminReadings: string;
  adminCurrentBook: string;
  adminNoCurrentBook: string;
  adminReading: string;
  adminCompleted: string;
  adminLastRead: string;
  adminStarted: string;
  adminProgress: string;
  adminChapter: string;
  adminCategoryDescription: string;
  adminAddCategory: string;
  adminEditCategory: string;
  adminCategoryName: string;
  adminSlug: string;
  adminCancel: string;
  adminSave: string;
  adminDelete: string;
  adminConfirmDeleteCategory: string;
  adminBookDescription: string;
  adminAddBook: string;
  adminEditBook: string;
  adminBookTitle: string;
  adminBookAuthor: string;
  adminBookGenre: string;
  adminBookContent: string;
  adminChapterTitle: string;
  adminCoverImage: string;
  adminCoverHint: string;
  adminCoverProcessing: string;
  adminRemoveCover: string;
  adminCoverError: string;
  adminImportPdf: string;
  adminPdfHint: string;
  adminPdfProcessing: string;
  adminPdfError: string;
  adminPdfTooLargeForServer: string;
  adminCatalog: string;
  adminPublished: string;
  adminPrivate: string;
  adminCreateBook: string;
  adminConfirmDeleteBook: string;
  adminRequiredFields: string;
  adminLoadError: string;
  adminActionError: string;
  adminAccessDeniedDescription: string;
}

export const translations: Record<Language, UIStrings> = {
  kk: {
    brand: "KitapBilim",
    tagline: "Кітап оқыңыз және жаңа әлемдерді ашыңыз",
    navLibrary: "Кітапхана",
    navStats: "Нәтижелер",
    navAddBook: "Өз мәтініңді қосу",
    heroTitle: "Оқыңыз және әдебиет әлеміне саяхаттаңыз",
    heroSubtitle: "Әлемдік және қазақ әдебиетінің інжу-маржандарын оқып, сүйікті кітаптарыңызға қайта оралыңыз.",
    searchPlaceholder: "Кітап атауы немесе авторы бойынша іздеу...",
    allGenres: "Барлық жанрлар",
    allLevels: "Барлық деңгейлер",
    levelBeginner: "Бастауыш",
    levelIntermediate: "Орта",
    levelAdvanced: "Жоғары",
    filterByLanguage: "Тіл",
    readTimeMin: "мин оқу",
    startReading: "Оқуды бастау",
    takeQuizDirectly: "Тест тапсыру",
    continueReading: "Оқуды жалғастыру",
    completedBadge: "Оқылды",
    quizScoreBadge: "Тест нәтижесі",
    chapter: "Бөлім",
    tableOfContents: "Мазмұны",
    nextChapter: "Келесі бөлім",
    prevChapter: "Алдыңғы бөлім",
    finishReadingAndQuiz: "Оқуды аяқтау және викторина тапсыру",
    finishReading: "Оқуды аяқтау",
    readingSettings: "Оқу баптаулары",
    themeLight: "Жарық",
    themeSepia: "Сепия",
    themeDark: "Қараңғы",
    fontSize: "Қаріп өлшемі",
    fontSerif: "Классикалық (Serif)",
    fontSans: "Заманауи (Sans)",
    backToLibrary: "Кітапханаға қайту",
    backToReader: "Кітапқа оралу",
    quizTitle: "Есте сақтауды тексеру сауалнамасы",
    quizSubtitle: "Оқыған мәліметтеріңізді еске түсіріп, дұрыс жауаптарды белгілеңіз",
    questionOf: "сұрақ",
    nextQuestion: "Келесі сұрақ",
    prevQuestion: "Алдыңғы сұрақ",
    submitQuiz: "Жауаптарды тексеру",
    openReflectionTitle: "Оқырмандық ой-толғау",
    openReflectionPrompt: "Кітаптың басты ойы мен негізгі тағылымы неде деп ойлайсыз? Өз сөзіңізбен жазыңыз:",
    openReflectionPlaceholder: "Кітаптан түйген негізгі ойларыңызды осында жазыңыз...",
    yourAnswer: "Сіздің жауабыңыз",
    correctAnswer: "Дұрыс жауап",
    explanation: "Түсіндірме және дәлел",
    bookQuoteRef: "Кітаптан үзінді",
    scoreTitle: "Сауалнама нәтижесі",
    scoreGreat: "Тамаша есте сақтау қабілеті! Кітап мазмұнын мүлтіксіз меңгердіңіз.",
    scoreGood: "Жақсы нәтиже! Негізгі оқиғалар мен мәліметтерді жақсы білесіз.",
    scoreRetake: "Кітапты қайта шолып шығып, есте сақтау сауалнамасын тағы тапсырып көріңіз.",
    points: "балл",
    percent: "пайыз",
    timeSpent: "Жұмсалған уақыт",
    retakeQuiz: "Қайта тапсыру",
    readAgain: "Кітапты қайта оқу",
    printCertificate: "Сертификатты жүктеу / Басып шығару",
    certificateTitle: "Оқырман жетістігі сертификаты",
    certificateSubtitle: "Кітапты толық оқығаны үшін беріледі",
    certifiedThat: "Бұл құжат мына оқырманға беріледі:",
    completedBookAndPassed: "Аталған шығарманы толық оқып шықты:",
    withScoreOf: "Жинаған нәтижесі:",
    dateAwarded: "Берілген күні:",
    readerNamePrompt: "Сертификатқа жазылатын есіміңіз:",
    enterYourName: "Есіміңізді енгізіңіз",
    statsTitle: "Оқу статистикасы және жетістіктер",
    statsBooksRead: "Оқылған кітаптар",
    statsQuizzesTaken: "Тапсырылған тесттер",
    statsAvgScore: "Орташа балл",
    statsBestScore: "Үздік нәтиже",
    statsHistory: "Сауалнамалар тарихы",
    noAttemptsYet: "Әзірге тесттер тапсырылмаған. Кітап оқуды бастаңыз!",
    addCustomBookTitle: "Өз кітабыңызды немесе мәтініңізді қосыңыз",
    addCustomBookDesc: "Өз мәтініңізді енгізіп, сауалнама жасаңыз немесе оқып есте сақтауды шыңдаңыз.",
    bookTitleLabel: "Кітап атауы",
    bookAuthorLabel: "Авторы",
    bookContentLabel: "Мәтін (немесе үзінді)",
    saveBookBtn: "Кітапты қосу және оқу",
    resetProgress: "Нәтижелерді тазарту",
    confirmReset: "Барлық оқу және тест деректерін өшіргіңіз келетініне сенімдісіз бе?",
    openReflectionAnalysis: "Ой-толғауды талдау",
    detectedThemes: "Қамтылған маңызды тақырыптар",
    languageName: "Қазақша",
    categoryAll: "Барлық кітаптар",
    categoryKazakh: "Қазақ жазушылары",
    categoryWorld: "Әлем классикасы",
    noAiBadge: "100% ИИ-сіз (Толықтай дербес)",
    authTitleLogin: "Жүйеге кіру",
    authTitleRegister: "Тіркелу",
    authLoginDesc: "Кітаптарды қосу және оқу нәтижелерін сақтау үшін жеке кабинетіңізге кіріңіз",
    authRegisterDesc: "Жаңа есептік жазба ашып, өз кітаптарыңыз бен викториналарыңызды енгізіңіз",
    authName: "Аты-жөніңіз",
    authEmail: "Электрондық пошта",
    authPassword: "Құпия сөз",
    authLoginBtn: "Кіру",
    authRegisterBtn: "Тіркелуді аяқтау",
    authLogoutBtn: "Шығу",
    authSwitchToRegister: "Әлі аккаунтыңыз жоқ па? Тіркеліңіз",
    authSwitchToLogin: "Аккаунтыңыз бар ма? Кіріңіз",
    authDemoLogin: "Демо-оқырман ретінде жылдам кіру",
    authRequiredToAddTitle: "Кітап қосу үшін кіру қажет",
    authRequiredToAddDesc: "Өз шығармаңызды немесе мәтініңізді қосу және сұрақтар жасау үшін жүйеге кіріңіз",
    authErrorEmpty: "Барлық міндетті өрістерді толтырыңыз",
    authErrorShortPassword: "Құпия сөз кемінде 4 таңбадан тұруы қажет",
    authErrorEmailTaken: "Бұл электрондық пошта жүйеде тіркелген",
    authErrorNotFound: "Мұндай пайдаланушы табылмады. Поштаны тексеріңіз",
    authErrorWrongPassword: "Құпия сөз қате енгізілді",
    authMyBooks: "Мен қосқан кітаптар",
    authProfile: "Жеке кабинет",
    authAddedByYou: "Сіз қосқан кітап",
    authDeleteBook: "Кітапты өшіру",
    authConfirmDeleteBook: "Бұл кітапты кітапханадан біржола өшіргіңіз келетініне сенімдісіз бе?",
    categoryMyBooks: "Менің кітаптарым",
    signInPrompt: "Кіру / Тіркелу",
    adminTitle: "Әкімші панелі",
    adminDescription: "Кітаптарды, санаттарды және оқырмандар белсенділігін басқарыңыз.",
    adminAccessDenied: "Қолжетімділікке рұқсат жоқ",
    adminUsers: "Пайдаланушылар",
    adminReaders: "Оқу барысы",
    adminCategories: "Санаттар",
    adminBooks: "Кітаптар",
    adminTrash: "Себет",
    adminRestore: "Қалпына келтіру",
    adminPermanentlyDelete: "Біржола жою",
    adminDeletedAt: "Себетке салынған күні",
    adminConfirmPermanentDeleteBook: "Бұл кітапты және оның мұқабасын біржола жою керек пе? Бұл әрекетті қайтару мүмкін емес.",
    adminRefresh: "Жаңарту",
    adminSearch: "Іздеу...",
    adminNoResults: "Ештеңе табылмады.",
    adminJoined: "Тіркелген күні",
    adminRoleAdmin: "Әкімші",
    adminRoleUser: "Оқырман",
    adminReadings: "Оқылған кітаптар",
    adminCurrentBook: "Соңғы кітап",
    adminNoCurrentBook: "Әзірге кітап оқымаған",
    adminReading: "Оқып жатыр",
    adminCompleted: "Аяқтады",
    adminLastRead: "Соңғы оқу",
    adminStarted: "Басталды",
    adminProgress: "Орындалуы",
    adminChapter: "Бөлім",
    adminCategoryDescription: "Үш тілдегі кітап санаттарын басқарыңыз.",
    adminAddCategory: "Санат қосу",
    adminEditCategory: "Санатты өңдеу",
    adminCategoryName: "Санат атауы",
    adminSlug: "Сілтеме (slug)",
    adminCancel: "Болдырмау",
    adminSave: "Сақтау",
    adminDelete: "Жою",
    adminConfirmDeleteCategory: "Осы санатты жойғыңыз келетініне сенімдісіз бе?",
    adminBookDescription: "Каталогтағы және пайдаланушылар қосқан кітаптарды басқарыңыз.",
    adminAddBook: "Кітап қосу",
    adminEditBook: "Кітапты өңдеу",
    adminBookTitle: "Кітап атауы",
    adminBookAuthor: "Автор",
    adminBookGenre: "Жанр",
    adminBookContent: "Мәтін",
    adminChapterTitle: "Бөлім атауы",
    adminCoverImage: "Мұқаба суреті",
    adminCoverHint: "Сурет автоматты түрде оңтайландырылады (ең көбі 20 МБ).",
    adminCoverProcessing: "Сурет өңделуде…",
    adminRemoveCover: "Мұқабаны алып тастау",
    adminCoverError: "Суретті өңдеу мүмкін болмады. Басқа суретті таңдаңыз (ең көбі 20 МБ).",
    adminImportPdf: "PDF файлынан мәтін импорттау",
    adminPdfHint: "PDF өлшеміне қолданба шектеу қоймайды. Мәтін барлық тіл өрістеріне қойылады.",
    adminPdfProcessing: "PDF мәтіні шығарылуда…",
    adminPdfError: "PDF мәтінін шығару мүмкін болмады. PDF файлының дұрыстығын тексеріңіз.",
    adminPdfTooLargeForServer: "Сервер сұрауды қабылдамады. PHP немесе проксидегі сұрау өлшемі шектеуін тексеріңіз.",
    adminCatalog: "Жалпы каталогта жариялау",
    adminPublished: "Каталогта",
    adminPrivate: "Жеке",
    adminCreateBook: "Кітапты жасау",
    adminConfirmDeleteBook: "Бұл кітапты себетке жылжытқыңыз келетініне сенімдісіз бе?",
    adminRequiredFields: "Барлық міндетті өрістерді толтырыңыз.",
    adminLoadError: "Әкімші деректерін жүктеу сәтсіз аяқталды. Қайталап көріңіз.",
    adminActionError: "Әрекетті орындау сәтсіз аяқталды. Қайталап көріңіз.",
    adminAccessDeniedDescription: "Бұл бетке тек әкімшілер кіре алады.",
  },
  ru: {
    brand: "KitapBilim",
    tagline: "Читайте книги и открывайте новые миры",
    navLibrary: "Библиотека",
    navStats: "Мои результаты",
    navAddBook: "Добавить свой текст",
    heroTitle: "Читайте и открывайте мир литературы",
    heroSubtitle: "Читайте шедевры мировой и казахской литературы и возвращайтесь к любимым книгам.",
    searchPlaceholder: "Поиск по названию или автору...",
    allGenres: "Все жанры",
    allLevels: "Все уровни",
    levelBeginner: "Начальный",
    levelIntermediate: "Средний",
    levelAdvanced: "Продвинутый",
    filterByLanguage: "Язык",
    readTimeMin: "мин чтения",
    startReading: "Читать книгу",
    takeQuizDirectly: "Пройти опрос",
    continueReading: "Продолжить чтение",
    completedBadge: "Прочитано",
    quizScoreBadge: "Результат опроса",
    chapter: "Глава",
    tableOfContents: "Содержание",
    nextChapter: "Следующая глава",
    prevChapter: "Предыдущая глава",
    finishReadingAndQuiz: "Завершить чтение и пройти опрос",
    finishReading: "Завершить чтение",
    readingSettings: "Настройки ридера",
    themeLight: "Светлая ",
    themeSepia: "Сепия",
    themeDark: "Тёмная",
    fontSize: "Размер шрифта",
    fontSerif: "С засечками (Serif)",
    fontSans: "Без засечек (Sans)",
    backToLibrary: "В библиотеку",
    backToReader: "К книге",
    quizTitle: "Опросник на понимание и память",
    quizSubtitle: "Вспомните детали прочитанного и выберите верные варианты ответов",
    questionOf: "вопрос",
    nextQuestion: "Следующий вопрос",
    prevQuestion: "Предыдущий вопрос",
    submitQuiz: "Проверить результаты",
    openReflectionTitle: "Осмысление и вывод",
    openReflectionPrompt: "В чём, по вашему мнению, заключается главная мысль и урок этой книги? Напишите своими словами:",
    openReflectionPlaceholder: "Опишите главные мысли, выводы и что больше всего вам запомнилось...",
    yourAnswer: "Ваш ответ",
    correctAnswer: "Правильный ответ",
    explanation: "Объяснение и цитата",
    bookQuoteRef: "Из текста книги",
    scoreTitle: "Итоги опросника",
    scoreGreat: "Великолепная память и внимательность! Вы отлично усвоили материал.",
    scoreGood: "Хороший результат! Основные события и смысл сохранены в памяти.",
    scoreRetake: "Рекомендуем перечитать фрагменты текста и пройти опрос заново.",
    points: "баллов",
    percent: "процентов",
    timeSpent: "Затраченное время",
    retakeQuiz: "Пройти заново",
    readAgain: "Перечитать книгу",
    printCertificate: "Скачать / Распечатать сертификат",
    certificateTitle: "Сертификат внимательного читателя",
    certificateSubtitle: "Выдаётся за завершение чтения книги",
    certifiedThat: "Настоящий сертификат удостоверяет, что:",
    completedBookAndPassed: "полностью прочитал(а) произведение:",
    withScoreOf: "Итоговый результат:",
    dateAwarded: "Дата выдачи:",
    readerNamePrompt: "Имя для сертификата:",
    enterYourName: "Введите ваше имя",
    statsTitle: "Статистика чтения и достижения",
    statsBooksRead: "Книг прочитано",
    statsQuizzesTaken: "Опросников пройдено",
    statsAvgScore: "Средний балл",
    statsBestScore: "Лучший балл",
    statsHistory: "История прохождений",
    noAttemptsYet: "Вы ещё не прошли ни одного опросника. Выберите книгу для чтения!",
    addCustomBookTitle: "Добавить свою книгу или статью",
    addCustomBookDesc: "Вставьте любой текст произведения, чтобы прочитать и сгенерировать контрольные вопросы.",
    bookTitleLabel: "Название книги",
    bookAuthorLabel: "Автор",
    bookContentLabel: "Текст (или фрагмент)",
    saveBookBtn: "Сохранить и начать чтение",
    resetProgress: "Сбросить историю",
    confirmReset: "Вы уверены, что хотите сбросить статистику и результаты?",
    openReflectionAnalysis: "Анализ осмысления",
    detectedThemes: "Учтённые смысловые темы",
    languageName: "Русский",
    categoryAll: "Все книги",
    categoryKazakh: "Казахские писатели",
    categoryWorld: "Мировая классика",
    noAiBadge: "100% без ИИ (Точно по тексту)",
    authTitleLogin: "Вход в аккаунт",
    authTitleRegister: "Регистрация читателя",
    authLoginDesc: "Войдите в личный кабинет, чтобы добавлять свои книги, проходить опросы и сохранять достижения",
    authRegisterDesc: "Создайте учётную запись, чтобы публиковать произведения и формировать тесты",
    authName: "Ваше имя",
    authEmail: "Электронная почта",
    authPassword: "Пароль",
    authLoginBtn: "Войти",
    authRegisterBtn: "Зарегистрироваться",
    authLogoutBtn: "Выйти из аккаунта",
    authSwitchToRegister: "Нет аккаунта? Зарегистрироваться",
    authSwitchToLogin: "Уже есть аккаунт? Войти",
    authDemoLogin: "Быстрый демо-вход читателя",
    authRequiredToAddTitle: "Для добавления книг требуется авторизация",
    authRequiredToAddDesc: "Войдите в систему или создайте профиль, чтобы добавлять произведения и тесты на запоминание сюжета.",
    authErrorEmpty: "Пожалуйста, заполните все обязательные поля",
    authErrorShortPassword: "Пароль должен содержать не менее 4 символов",
    authErrorEmailTaken: "Пользователь с такой электронной почтой уже зарегистрирован",
    authErrorNotFound: "Пользователь с таким email не найден. Проверьте адрес или зарегистрируйтесь",
    authErrorWrongPassword: "Введён неверный пароль",
    authMyBooks: "Мои добавленные книги",
    authProfile: "Личный профиль",
    authAddedByYou: "Добавлено вами",
    authDeleteBook: "Удалить книгу",
    authConfirmDeleteBook: "Вы уверены, что хотите удалить эту добавленную книгу?",
    categoryMyBooks: "Мои книги",
    signInPrompt: "Войти / Регистрация",
    adminTitle: "Панель администратора",
    adminDescription: "Управляйте книгами, категориями и активностью читателей.",
    adminAccessDenied: "Доступ запрещён",
    adminUsers: "Пользователи",
    adminReaders: "Чтение",
    adminCategories: "Категории",
    adminBooks: "Книги",
    adminTrash: "Корзина",
    adminRestore: "Восстановить",
    adminPermanentlyDelete: "Удалить навсегда",
    adminDeletedAt: "В корзине с",
    adminConfirmPermanentDeleteBook: "Удалить книгу и её обложку навсегда? Это действие нельзя отменить.",
    adminRefresh: "Обновить",
    adminSearch: "Поиск...",
    adminNoResults: "Ничего не найдено.",
    adminJoined: "Дата регистрации",
    adminRoleAdmin: "Администратор",
    adminRoleUser: "Читатель",
    adminReadings: "Книг прочитано",
    adminCurrentBook: "Последняя книга",
    adminNoCurrentBook: "Пока не читал книги",
    adminReading: "Читает",
    adminCompleted: "Завершено",
    adminLastRead: "Последнее чтение",
    adminStarted: "Начато",
    adminProgress: "Прогресс",
    adminChapter: "Глава",
    adminCategoryDescription: "Управляйте категориями книг на трёх языках.",
    adminAddCategory: "Добавить категорию",
    adminEditCategory: "Редактировать категорию",
    adminCategoryName: "Название категории",
    adminSlug: "Ссылка (slug)",
    adminCancel: "Отмена",
    adminSave: "Сохранить",
    adminDelete: "Удалить",
    adminConfirmDeleteCategory: "Вы уверены, что хотите удалить эту категорию?",
    adminBookDescription: "Управляйте книгами каталога и книгами пользователей.",
    adminAddBook: "Добавить книгу",
    adminEditBook: "Редактировать книгу",
    adminBookTitle: "Название книги",
    adminBookAuthor: "Автор",
    adminBookGenre: "Жанр",
    adminBookContent: "Текст",
    adminChapterTitle: "Название главы",
    adminCoverImage: "Обложка",
    adminCoverHint: "Изображение будет автоматически оптимизировано (до 20 МБ).",
    adminCoverProcessing: "Обработка изображения…",
    adminRemoveCover: "Убрать обложку",
    adminCoverError: "Не удалось обработать изображение. Выберите другое (до 20 МБ).",
    adminImportPdf: "Импортировать текст из PDF",
    adminPdfHint: "Приложение не ограничивает размер PDF. Текст будет вставлен во все языковые поля.",
    adminPdfProcessing: "Извлекаем текст из PDF…",
    adminPdfError: "Не удалось извлечь текст из PDF. Проверьте, что файл не повреждён.",
    adminPdfTooLargeForServer: "Сервер отклонил запрос. Проверьте ограничения размера запроса в PHP или прокси.",
    adminCatalog: "Опубликовать в общем каталоге",
    adminPublished: "В каталоге",
    adminPrivate: "Личная",
    adminCreateBook: "Создать книгу",
    adminConfirmDeleteBook: "Переместить эту книгу в корзину?",
    adminRequiredFields: "Заполните все обязательные поля.",
    adminLoadError: "Не удалось загрузить данные администратора. Попробуйте ещё раз.",
    adminActionError: "Не удалось выполнить действие. Попробуйте ещё раз.",
    adminAccessDeniedDescription: "Эта страница доступна только администраторам.",
  },
  en: {
    brand: "KitapBilim",
    tagline: "Read books and discover new worlds",
    navLibrary: "Library",
    navStats: "My Records",
    navAddBook: "Add Custom Text",
    heroTitle: "Read and explore the world of literature",
    heroSubtitle: "Explore masterpieces of world and Kazakh literature, and return to the books you love.",
    searchPlaceholder: "Search by book title or author...",
    allGenres: "All Genres",
    allLevels: "All Levels",
    levelBeginner: "Beginner",
    levelIntermediate: "Intermediate",
    levelAdvanced: "Advanced",
    filterByLanguage: "Language",
    readTimeMin: "min read",
    startReading: "Read Book",
    takeQuizDirectly: "Take Quiz",
    continueReading: "Continue Reading",
    completedBadge: "Read",
    quizScoreBadge: "Quiz Score",
    chapter: "Chapter",
    tableOfContents: "Contents",
    nextChapter: "Next Chapter",
    prevChapter: "Previous Chapter",
    finishReadingAndQuiz: "Finish Reading & Take Quiz",
    finishReading: "Finish reading",
    readingSettings: "Reader Settings",
    themeLight: "Light",
    themeSepia: "Sepia",
    themeDark: "Dark",
    fontSize: "Font Size",
    fontSerif: "Serif (Classic)",
    fontSans: "Sans (Modern)",
    backToLibrary: "Back to Library",
    backToReader: "Back to Book",
    quizTitle: "Reading Comprehension & Memory Quiz",
    quizSubtitle: "Recall what you read and select the correct answers based on the text",
    questionOf: "question",
    nextQuestion: "Next Question",
    prevQuestion: "Previous Question",
    submitQuiz: "Check Answers",
    openReflectionTitle: "Reader Reflection",
    openReflectionPrompt: "What in your opinion was the main moral or takeaway of this book? Explain in your own words:",
    openReflectionPlaceholder: "Write your thoughts on what resonated and what you remembered most...",
    yourAnswer: "Your answer",
    correctAnswer: "Correct answer",
    explanation: "Explanation & quote",
    bookQuoteRef: "From the book",
    scoreTitle: "Quiz Results",
    scoreGreat: "Outstanding retention! You absorbed both the subtle nuances and key facts.",
    scoreGood: "Solid result! You remembered the essential narrative and themes.",
    scoreRetake: "Review the chapters again and retake the quiz to sharpen your recall.",
    points: "points",
    percent: "percent",
    timeSpent: "Time spent",
    retakeQuiz: "Retake Quiz",
    readAgain: "Reread Book",
    printCertificate: "Download / Print Certificate",
    certificateTitle: "Certificate of Thoughtful Reading",
    certificateSubtitle: "Awarded for completing a book",
    certifiedThat: "This certificate proudly confirms that:",
    completedBookAndPassed: "has completed reading the work:",
    withScoreOf: "Achieved Score:",
    dateAwarded: "Date:",
    readerNamePrompt: "Name for your certificate:",
    enterYourName: "Enter your full name",
    statsTitle: "Reading Metrics & Achievements",
    statsBooksRead: "Books Read",
    statsQuizzesTaken: "Quizzes Completed",
    statsAvgScore: "Average Score",
    statsBestScore: "Best Score",
    statsHistory: "Attempt History",
    noAttemptsYet: "No quizzes completed yet. Pick a book to begin your journey!",
    addCustomBookTitle: "Add Custom Book or Passage",
    addCustomBookDesc: "Paste any literary excerpt, story, or article to read and test your memory.",
    bookTitleLabel: "Book Title",
    bookAuthorLabel: "Author",
    bookContentLabel: "Text content",
    saveBookBtn: "Save & Start Reading",
    resetProgress: "Reset Records",
    confirmReset: "Are you sure you want to clear your reading and quiz history?",
    openReflectionAnalysis: "Comprehension Analysis",
    detectedThemes: "Detected Core Themes",
    languageName: "English",
    categoryAll: "All Books",
    categoryKazakh: "Kazakh Writers",
    categoryWorld: "World Classics",
    noAiBadge: "100% No AI (Deterministic local tests)",
    authTitleLogin: "Reader Login",
    authTitleRegister: "Create Reader Account",
    authLoginDesc: "Sign in to your personal account to add custom books, track quizzes, and earn certificates",
    authRegisterDesc: "Register an account to publish texts, design retention tests, and build your digital library",
    authName: "Your Full Name",
    authEmail: "Email Address",
    authPassword: "Password",
    authLoginBtn: "Sign In",
    authRegisterBtn: "Create Account",
    authLogoutBtn: "Sign Out",
    authSwitchToRegister: "Don't have an account? Sign up",
    authSwitchToLogin: "Already have an account? Log in",
    authDemoLogin: "Quick Reader Demo Sign-in",
    authRequiredToAddTitle: "Sign-in required to add books",
    authRequiredToAddDesc: "Log in or register an account to add your literary pieces and generate comprehension tests.",
    authErrorEmpty: "Please fill in all required fields",
    authErrorShortPassword: "Password must be at least 4 characters",
    authErrorEmailTaken: "A user with this email address already exists",
    authErrorNotFound: "No account found with this email. Please check your credentials or register",
    authErrorWrongPassword: "The password entered is incorrect",
    authMyBooks: "My Added Books",
    authProfile: "Reader Profile",
    authAddedByYou: "Added by you",
    authDeleteBook: "Delete book",
    authConfirmDeleteBook: "Are you sure you want to remove this book from your library?",
    categoryMyBooks: "My Books",
    signInPrompt: "Log In / Sign Up",
    adminTitle: "Admin dashboard",
    adminDescription: "Manage books, categories, and reader activity.",
    adminAccessDenied: "Access denied",
    adminUsers: "Users",
    adminReaders: "Reading activity",
    adminCategories: "Categories",
    adminBooks: "Books",
    adminTrash: "Trash",
    adminRestore: "Restore",
    adminPermanentlyDelete: "Delete permanently",
    adminDeletedAt: "In trash since",
    adminConfirmPermanentDeleteBook: "Permanently delete this book and its cover? This action cannot be undone.",
    adminRefresh: "Refresh",
    adminSearch: "Search...",
    adminNoResults: "No results found.",
    adminJoined: "Joined",
    adminRoleAdmin: "Administrator",
    adminRoleUser: "Reader",
    adminReadings: "Books read",
    adminCurrentBook: "Latest book",
    adminNoCurrentBook: "No reading activity yet",
    adminReading: "Reading",
    adminCompleted: "Completed",
    adminLastRead: "Last read",
    adminStarted: "Started",
    adminProgress: "Progress",
    adminChapter: "Chapter",
    adminCategoryDescription: "Manage book categories in all three languages.",
    adminAddCategory: "Add category",
    adminEditCategory: "Edit category",
    adminCategoryName: "Category name",
    adminSlug: "Slug",
    adminCancel: "Cancel",
    adminSave: "Save",
    adminDelete: "Delete",
    adminConfirmDeleteCategory: "Are you sure you want to delete this category?",
    adminBookDescription: "Manage catalog books and books added by users.",
    adminAddBook: "Add book",
    adminEditBook: "Edit book",
    adminBookTitle: "Book title",
    adminBookAuthor: "Author",
    adminBookGenre: "Genre",
    adminBookContent: "Text",
    adminChapterTitle: "Chapter title",
    adminCoverImage: "Cover image",
    adminCoverHint: "The image will be optimized automatically (up to 20 MB).",
    adminCoverProcessing: "Processing image…",
    adminRemoveCover: "Remove cover",
    adminCoverError: "Could not process the image. Choose another one (up to 20 MB).",
    adminImportPdf: "Import text from PDF",
    adminPdfHint: "The application does not limit PDF size. Extracted text will be placed in all language fields.",
    adminPdfProcessing: "Extracting text from PDF…",
    adminPdfError: "Could not extract text from the PDF. Check that the file is not corrupted.",
    adminPdfTooLargeForServer: "The server rejected the request. Check the request-size limits in PHP or the proxy.",
    adminCatalog: "Publish to public catalog",
    adminPublished: "In catalog",
    adminPrivate: "Private",
    adminCreateBook: "Create book",
    adminConfirmDeleteBook: "Move this book to the trash?",
    adminRequiredFields: "Please fill in all required fields.",
    adminLoadError: "Could not load admin data. Please try again.",
    adminActionError: "The action failed. Please try again.",
    adminAccessDeniedDescription: "This page is available to administrators only.",
  }
};
