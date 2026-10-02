import { Book } from '../types';

export const kazakhClassics: Book[] = [
  {
    id: 'abai-joly',
    title: {
      kk: 'Абай жолы (Қайтқанда)',
      ru: 'Путь Абая (Возвращение)',
      en: 'The Path of Abai (Return)'
    },
    author: {
      kk: 'Мұхтар Әуезов',
      ru: 'Мухтар Ауэзов',
      en: 'Mukhtar Auezov'
    },
    year: 1942,
    genre: {
      kk: 'Тарихи роман, Эпопея',
      ru: 'Исторический роман, Эпопея',
      en: 'Historical Novel, Epic'
    },
    level: 'intermediate',
    coverImage: '/src/assets/images/book_abai_joly_1790149942172.jpg',
    estimatedReadMinutes: 9,
    tags: {
      kk: ['Қазақ әдебиеті', 'Мұхтар Әуезов', 'Абай', 'Дала өмірі'],
      ru: ['Казахская классика', 'Мухтар Ауэзов', 'Абай', 'Степь'],
      en: ['Kazakh classic', 'Mukhtar Auezov', 'Abai', 'Steppe']
    },
    synopsis: {
      kk: 'Қазақ әдебиетінің биік шыңы — ұлы ақын Абайдың жастық шағы, Семейдегі оқудан елге қайтуы және туған даласының күрделі тыныс-тіршілігіне араласуы баяндалатын әйгілі роман-эпопеяның алғашқы тарауы.',
      ru: 'Вершина казахской прозы — эпопея о взрослении и духовном становлении Абая Кунанбаева, его возвращении из Семипалатинского медресе в родные кочевья и первых столкновениях со степными нравами.',
      en: 'The pinnacle of Kazakh literature: Mukhtar Auezov’s epic tracing young Abai’s return from his studies in Semey to his ancestral nomadic steppes, confronting moral and societal crossroads.'
    },
    chapters: [
      {
        id: 'aj_c1',
        title: {
          kk: '1-бөлім: Қайтқанда (Семейден елге жол)',
          ru: 'Глава 1: Возвращение (Дорога домой)',
          en: 'Chapter 1: The Return (Road to the Steppe)'
        },
        content: {
          kk: `Күздің қоңыр салқын таңы. Семей қаласынан шыққан төрт атты жолаушы көсілген кең далаға қарай бет алып келеді. Алдарында — Шыңғыс тауы, туған ауыл.

Алдыңғы қатарда келе жатқан он үш жасар бала — Абай. Үш жыл бойы қаладағы Ахмет Риза медресесінде оқып, білім нәрімен сусындаған ол ауылын, аяулы анасы Ұлжанды, дана әжесі Зерені сағынып келеді. Балаң жүрегі сағыныштан лүпілдеп, даланың таза жусан иісін құныға жұтады.

Қасындағы серіктері — әкесі Құнанбайдың сенімді кісілері: Байтас пен Жұмабай. Олар жас Абайды қаладан алып қайтуға арнайы жіберілген еді. Байтас алда келе жатып, жол-жөнекей әңгіме тиегін ағытады.

— Абайжан, биыл даланың шөбі шүйгін, мал семіз, бірақ ел іші тыныш емес. Әкең Құнанбай мырза билік тізгінін қатты ұстап отыр. Ел басқару оңай дейсің бе, — деп күрсінді Байтас.

Абай үндемеді. Оның ойында тек анасының мейірімді құшағы мен әжесінің ертегілері сайрап тұрды. Семейде өткен күндері көз алдынан тізіліп өтті. Медреседе парсы, араб, түркі шайырларының кітаптарын оқыды. Низами мен Науаи, Физули мен Сағдидің жырларын жаттап, қала кітапханасынан орыс классиктерінің сөз өнеріне де құлақ түрген еді.

Күн көтеріле бастағанда, жолаушылар Қарауыл өзенінің бойына жақындады. Дала төсінде еркін жортқан киіктер көрінеді. Табиғаттың тылсым тыныштығы Абайдың бойына ерекше шабыт құйғандай болды. Ол өзінің ішкі толғанысын жыр жолдарымен өргісі келді.

— Мына кең дала менің жаныма қандай жақын! Енді мен тек кітап оқып қана қоймай, өз халқымның мұң-мұқтажын тыңдаймын, — деп түйді жас ақын ішінен.

Кеш бата алыстан ауыл оттары жылтырап көрінді. Абай аттың басын іркіп, тебіне түсті. Алда үлкен өмір, ақындық ұлы жол күтіп тұрған еді.`,
          ru: `Прохладное осеннее утро. Четверо всадников выехали из Семипалатинска и направились в сторону бескрайних чингизских степей. Впереди лежал путь в родной аул.

Впереди на вороном коне скакал тринадцатилетний мальчик — Абай. После трех лет учения в медресе Ахмета Ризы он возвращался домой. Его юное сердце трепетало от радости и светлой тоски: он ехал к любимой матери Улжан и мудрой бабушке Зере, чьи сказки и напевы вскормили его душу.

Рядом с ним ехали посланцы его строгого отца, волостного правителя Кунанбая — Байтас и Жумабай. Байтас, опытный степняк, неторопливо вел беседу:
— Абайжан, степь нынче тучная, травы высокие, но среди родов согласия мало. Твой отец Кунанбай держит власть железной рукой. Нелегко управлять людьми в такое время.

Абай слушал молча, вдыхая горьковатый аромат полыни. Мысли его возвращались к годам учебы в городе. В медресе он открыл для себя сокровищницу восточной поэзии — строки Низами, Навои, Физули и Саади, а вечерами тайком приобщался к русской литературе и светским книгам.

К полудню путники приблизились к изгибам реки Караул. Вдали мелькали вольные сайгаки. Величие степи наполнило душу мальчика предчувствием высокого призвания.
— Эта бескрайняя земля — моя плоть и кровь. Я хочу не просто знать книги, но слышать дыхание своего народа, — размышлял юноша.

В сумерках впереди блеснули огни родного аула. Впереди Абая ждала великая и тернистая дорога поэта и мыслителя.`,
          en: `A crisp autumn dawn. Four horsemen rode out from Semipalatinsk toward the boundless expanses of the Chingiz mountains. Ahead lay the return journey to their native settlement.

Leading the group on his steed was thirteen-year-old Abai. After three years of intensive study at the Akhmet Riza madrassa, he was traveling home. His youthful heart swelled with tender longing for his loving mother Ulzhan and wise grandmother Zere, whose ancient parables had nourished his imagination.

Accompanying him were trusted emissaries of his formidable father Qunanbai — Baitas and Zhumabai. Baitas rode alongside, remarking:
"Abai, the grasses are lush this season, yet peace among the clans remains fragile. Your father rules with an unwavering hand; governing these steppes is no gentle task."

Abai remained thoughtful. In the city, he had immersed himself not only in scholastic theology but in the immortal poetry of Nizami, Navoi, Fuzuli, and Saadi, alongside glimpses of Russian secular letters. 

By midday, nearing the Karaul River, herds of wild saiga antelopes dashed across the plains. The solemn beauty of the landscape crystallized his inner purpose: to understand and articulate the soul, struggles, and aspirations of his people.

As twilight descended, the welcoming hearth fires of his home encampment gleamed across the horizon, marking the commencement of an enduring literary and spiritual saga.`
        }
      },
      {
        id: 'aj_c2',
        title: {
          kk: '2-бөлім: Ана құшағы мен әже тағылымы',
          ru: 'Глава 2: Объятия матери и заветы бабушки',
          en: 'Chapter 2: Maternal Embrace and Grandmother’s Wisdom'
        },
        content: {
          kk: `Ауыл шетіне ілінгенде, алдан иттер шәуілдеп үріп, үйлерден адамдар шыға бастады. Абай атынан қарғып түсіп, үлкен ақ ордаға қарай асықты.

Есіктен кірген бойда алдынан мейірім төгілген анасы Ұлжан қарсы алды. Ол Абайын құшағына қысып, маңдайынан иіскеді.
— Құлыным менің, ержетіп оралдың ба! Жүзіңнен айналайын, — деп көзіне жас алды.

Төрдегі құс төсекте сүйікті әжесі Зере отыр еді. Көзі бұлдырап көрмей қалған қарт ана қолын созып, баланың бетін сипалады.
— Бұл менің Телғарам ба? Кәне, жаныма жақындашы, ботам! Сен келді деп естігенде көңілім жадырап сала берді, — деп Абайдың басынан сипап, маңдайына ернін басты. Зере әжесі Абайды еркелетіп «Телғара» дейтін.

Абай екі анасының ортасына отырып, қалада қалай оқығанын, қандай кітаптар парақтағанын баяндап берді. Зере әже немересінің сөзін ұйып тыңдап:
— Балам, білім — көздің нұры. Бірақ білімді тек атақ пен мал үшін емес, әлсізге қорған, елге пайдалы болу үшін жұмса. Әкең Құнанбай қанша қатал болса да, сен әділдік пен рақымды ту ет, — деп ақылын айтты.

Көп ұзамай шаңыраққа ауыл адамдары, ағайын-туған жиналды. Әкесі Құнанбай келіп, баласына байсалды көзбен қарап, қолын алды. Әке сыны қатал еді, бірақ Абайдың бойындағы парасат пен білімге деген құштарлық оның көзінен от болып жанып тұрды.`,
          ru: `Едва всадники подъехали к аулу, навстречу залаяли собаки, и из юрт высыпали домочадцы. Абай соскочил с коня и поспешил к большой белой юрте.

У порога его встретила мать Улжан. Она прижала сына к груди и долго целовала его лоб:
— Жеребеночек мой, вернулся взрослым джигитом! Свет очей моих!

На почетном месте юрты сидела бабушка Зере. Почти ослепшая от преклонных лет, она протянула дрожащие руки, нащупывая лицо внука:
— Это мой Телгара? Подойди ближе, дитя мое! Услышав о твоем приезде, сердце мое согрелось, — приговаривала она, гладя Абая по плечам. Дома бабушка ласково звала его Телгарой.

Сев между матерью и бабушкой, Абай увлеченно рассказывал о книгах, восточных поэмах и мудрости, почерпнутой в медресе. Бабушка Зере наставляла его:
— Знание, дитя мое — это свет разума. Но помни: ученость дана человеку не ради гордыни и чинов, а чтобы стать защитой слабым и опорой своему народу. Будь справедлив и милосерден сердцем.

Вскоре в юрту вошел сам Кунанбай. Сдержанно и строго он приветствовал сына за руку. Взгляд отца был пронзителен и суров, но в глазах юного Абая уже светилось собственное незыблемое достоинство.`,
          en: `As they reached the settlement, welcoming calls and barking dogs echoed between the white yurts. Abai dismounted swiftly and strode into the central family pavilion.

At the entrance stood his mother Ulzhan, embracing her son warmly:
"My gentle foal, you have returned as a mature youth! Bless your bright face!"

Seated upon cushions at the place of honor was his grandmother Zere. With failing eyesight, the revered elder reached out her hands to trace his features:
"Is this my Telgara? Come closer to me, my child! My heart blossomed the moment your arrival was announced." (Telgara was her cherished nickname for him).

Sitting between them, Abai shared tales of his studies, the parchment manuscripts of Eastern poets, and the broader world outside the valley. Grandmother Zere imparted:
"Knowledge is the light of the eyes, Abai. Yet remember: true learning is not granted for arrogance or pursuit of power, but to protect the vulnerable and bring healing to your people."

Soon his father Qunanbai entered. His greeting was austere and measured, testing his son’s composure, yet the spark of independent intellect in young Abai was already unmistakable.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'aj_q1',
          type: 'detail_memory',
          question: {
            kk: 'Абай Семей қаласынан ауылға оралғанда неше жаста еді және қай медреседе білім алған?',
            ru: 'Сколько лет было Абаю при возвращении из Семипалатинска и в каком медресе он учился?',
            en: 'How old was Abai when returning from Semey, and at which madrassa did he study?'
          },
          options: {
            kk: [
              '13 жаста, Ахмет Риза медресесінде',
              '16 жаста, Ғалия медресесінде',
              '10 жаста, Орынбор гимназиясында',
              '18 жаста, Қазан университетінде'
            ],
            ru: [
              '13 лет, в медресе Ахмета Ризы',
              '16 лет, в медресе Галия',
              '10 лет, в Оренбургской гимназии',
              '18 лет, в медресе при Казанском университете'
            ],
            en: [
              '13 years old, at the Akhmet Riza madrassa',
              '16 years old, at the Galiya madrassa',
              '10 years old, at Orenburg gymnasium',
              '18 years old, at Kazan university preparatory'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Абай 13 жасында үш жыл бойы оқыған Семейдегі Ахмет Риза медресесінен ауылына қайтты.',
            ru: 'Тринадцатилетний Абай вернулся в аул после трех лет обучения в медресе Ахмета Ризы.',
            en: 'Thirteen-year-old Abai returned after three years of schooling at the Akhmet Riza madrassa.'
          }
        },
        {
          id: 'aj_q2',
          type: 'detail_memory',
          question: {
            kk: 'Зере әжесі Абайды еркелетіп қандай есіммен атайтын еді?',
            ru: 'Каким ласковым именем называла Абая его бабушка Зере?',
            en: 'What affectionate nickname did grandmother Zere call Abai?'
          },
          options: {
            kk: [
              'Телғара',
              'Шоқан',
              'Көксерек',
              'Сұлтан'
            ],
            ru: [
              'Телгара',
              'Шокан',
              'Коксерек',
              'Султан'
            ],
            en: [
              'Telgara',
              'Shokan',
              'Kokserek',
              'Sultan'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Зере әжесі Абайдың зеректігі мен ерекше болмысына сүйсініп, оны еркелетіп «Телғара» дейтін.',
            ru: 'Бабушка Зере с любовью называла юного Абая именем «Телгара».',
            en: 'Grandmother Zere lovingly called young Abai "Telgara".'
          }
        },
        {
          id: 'aj_q3',
          type: 'quote_memory',
          question: {
            kk: 'Зере әжесі немересі Абайға білімнің мәні жайында қандай өсиет айтты?',
            ru: 'Какое напутствие дала бабушка Зере внуку относительно предназначения знаний?',
            en: 'What moral counsel did grandmother Zere impart to Abai regarding the purpose of knowledge?'
          },
          options: {
            kk: [
              'Білімді тек атақ пен мал үшін емес, әлсізге қорған, елге пайдалы болу үшін жұмсау керек',
              'Білімді тек сауда-саттық пен пайда табу үшін пайдалану қажет',
              'Білім алған соң ауылға қайтпай, тек қалада өмір сүру керек',
              'Кітапты тастап, тек мал бағумен айналысу керек'
            ],
            ru: [
              'Ученость дана не для гордыни и чинов, а чтобы стать защитой слабым и опорой народу',
              'Знания нужны исключительно для скорого обогащения и торговли',
              'После медресе следует навсегда остаться жить чиновником в городе',
              'Книги следует оставить и думать лишь о преумножении табунов'
            ],
            en: [
              'Learning is granted not for arrogance or wealth, but to protect the weak and serve the people',
              'Knowledge should be used strictly for commercial profit and trade',
              'One should abandon the steppes permanently to become an urban official',
              'Books should be set aside in favor of herding livestock'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Зере әже: «Білімді тек атақ пен мал үшін емес, әлсізге қорған, елге пайдалы болу үшін жұмса» деп өсиет еткен.',
            ru: 'Бабушка учила Абая служить правде, защищать обездоленных и не кичиться ученостью.',
            en: 'Grandmother Zere reminded him that true wisdom is dedicated to justice and sheltering the helpless.'
          }
        }
      ],
      openQuestion: {
        id: 'aj_open',
        prompt: {
          kk: 'Мұхтар Әуезовтің осы үзіндісінде жас Абайдың тұлғалық және азаматтық қалыптасуына ана мейірімі мен дала табиғаты қалай әсер етеді?',
          ru: 'Как в этом произведении Мухтара Ауэзова показано влияние родной степи, материнской любви и уроков бабушки на становление мировоззрения Абая?',
          en: 'How does Mukhtar Auezov depict the influence of native steppe heritage, maternal warmth, and grandmotherly counsel on Abai’s emerging worldview?'
        },
        keyThemes: {
          kk: ['білім', 'әділдік', 'ана', 'Зере', 'халық', 'дала', 'мейірім'],
          ru: ['знание', 'справедливость', 'мать', 'Зере', 'народ', 'степь', 'милосердие', 'гуманизм'],
          en: ['knowledge', 'justice', 'mother', 'Zere', 'people', 'steppe', 'mercy', 'humanism']
        },
        sampleAnswer: {
          kk: 'Жас Абайдың бойындағы ізгілік пен даналық анасы Ұлжанның мейірімі, Зере әжесінің әділдік пен халыққа қызмет ету туралы өсиеттері арқылы берік орнығады.',
          ru: 'Ауэзов показывает, что именно доброта матери Улжан и мудрые заветы бабушки Зере сформировали в юном Абае гуманизм, любовь к народу и нетерпимость к несправедливости.',
          en: 'Auezov illustrates that maternal love and Zere’s ethical teachings grounded Abai in compassion and devotion to justice above raw political dominance.'
        }
      }
    }
  },
  {
    id: 'kokserik',
    title: {
      kk: 'Көксерек',
      ru: 'Серый Лютый (Көксерек)',
      en: 'Kokserek (The Grey Wolf)'
    },
    author: {
      kk: 'Мұхтар Әуезов',
      ru: 'Мухтар Ауэзов',
      en: 'Mukhtar Auezov'
    },
    year: 1929,
    genre: {
      kk: 'Повесть, Табиғат лирикасы',
      ru: 'Повесть, Драматическая проза',
      en: 'Novella, Nature & Drama'
    },
    level: 'intermediate',
    coverImage: '/src/assets/images/book_kokserik_1790149963714.jpg',
    estimatedReadMinutes: 8,
    tags: {
      kk: ['Қазақ әдебиеті', 'Мұхтар Әуезов', 'Құрмаш', 'Қасқыр', 'Табиғат'],
      ru: ['Мухтар Ауэзов', 'Курмаш', 'Волк', 'Природа степи'],
      en: ['Mukhtar Auezov', 'Kurmash', 'Wolf', 'Nature']
    },
    synopsis: {
      kk: 'Адам мен табиғат, жыртқыштың жабайы түйсігі мен баланың пәк сезімі арпалысқан классикалық драмалық повесть. Бөлтірікті қолға үйретпек болған бала Құрмаштың тағдыры.',
      ru: 'Пронзительная классическая повесть о волчонке Коксереке, взятом из логова мальчиком Курмашем. Вечная драма противостояния дикой природы и человека.',
      en: 'Mukhtar Auezov’s gripping masterpiece exploring the primal tension between wild nature and human companionship, following the young boy Kurmash and the wolf cub Kokserek.'
    },
    chapters: [
      {
        id: 'ks_c1',
        title: {
          kk: '1-бөлім: Ұядан алынған бөлтірік',
          ru: 'Глава 1: Волчонок из логова',
          en: 'Chapter 1: The Cub from the Den'
        },
        content: {
          kk: `Ерте көктемнің салқын күнінде ауыл аңшылары қасқырдың апанын тауып, бірнеше бөлтірікті алып шықты. Басқа бөлтіріктер қырылып, тек жалғыз көккөз, арқасы күміс жал бөлтірік қана тірі қалды. 

Бұл бөлтірікті он жасар Құрмаш бала өзіне сұрап алды. Баланың жүрегі мейірімге толы еді. Ол күшікті бауырына басып, оған «Көксерек» деп ат қойды. 

Құрмаш оған ақ сүт беріп, ет турап, қой қораның жылы бұрышына жайлы төсек салып берді. Көксерек тез өсті, бірақ оның бойындағы жыртқыштық мінез еш басылмады. Басқа ауыл иттері оны жатсынып, жақындаса ырылдап, жүректері шайлығып тұратын. 

Ауыл ақсақалдары балаға:
— Құрмаш, бұл — қасқырдың баласы. Қасқырды қанша асырасаң да, орманға қарап ұлиды. Жабайы аңның қаны бір күні білінбей қалмайды, сақ бол, — деп ескертетін. Бірақ Құрмаш өз Көксерегіне шексіз сенді, оның маңдайынан сипап, жанындай жақсы көрді.

Көксерек бірте-бірте дәу көкжал қасқырға айналды. Оның көзінен суық сұрғылт от жылтырап, түнде айға қарап ұлитын әдет шығарды. Табиғаттың еркін заңы оны далаға қарай жетелеп тұрған еді.`,
          ru: `Ранней весной охотники выследили логово волчицы в зарослях ковыля и достали слепых волчат. Все детеныши погибли, и лишь один серый, крепкий волчонок с цепким взглядом остался в живых.

Десятилетний мальчик-сирота Курмаш выпросил волчонка себе. Сердце мальчика источало безграничную ласку. Он назвал его Коксереком — Серым Лютым.

Курмаш кормил его теплым кобыльим молоком, делился последним куском мяса, устроил логово в теплом углу загона. Волчонок крепчал не по дням, а по часам, но волчья сущность в нем не угасала. Дворовые собаки чуяли смертельного врага и боялись подходить близко.

Старики качали головами и предупреждали мальчика:
— Курмаш, волк не станет верным псом. Сколько волка ни корми, он всё в степь смотрит. Дикая волчья кровь рано или поздно заговорит!
Но мальчик лишь крепче прижимал зверя к груди, веря, что верность и забота сотворят чудо.

Шло время. Коксерек превратился в мощного серого зверя с холодным огнем в глазах. По ночам он всё чаще поднимал морду к луне, тоскуя по вечной свободе дикой степи.`,
          en: `In early spring, steppe hunters discovered a wolf den deep within the rocky ravines. Only one sturdy, slate-gray cub survived the raid.

Ten-year-old orphan Kurmash begged his relatives to spare the creature. With gentle devotion, the boy named the cub Kokserek ('The Grey Fierce One').

Kurmash fed him warm mare's milk, gave him meat, and prepared a soft bed in a secluded corner of the corral. Kokserek grew rapidly, yet his untamable wolf instinct never waned. The village sheepdogs bristled and trembled at his scent.

Village elders repeatedly cautioned the youth:
"Kurmash, a wolf is not a companion hound. No matter how dearly you nurture him, he will yearn for the wild. Predatory blood will answer its ancestral call." Yet Kurmash believed his affectionate care would tame the beast.

As seasons passed, Kokserek transformed into an imposing wolf. At night, gazing at the distant moon over the snowbound steppe, the untamed wilderness called out to his blood.`
        }
      },
      {
        id: 'ks_c2',
        title: {
          kk: '2-бөлім: Еркіндік шақыруы және трагедия',
          ru: 'Глава 2: Зов свободы и роковая развязка',
          en: 'Chapter 2: The Call of the Wild and the Tragic Fate'
        },
        content: {
          kk: `Бір күні қыстың қаһарлы бораны басталған түні Көксерек шынжырын үзіп, қараңғы далаға қашып кетті. Ол үйретілген ауыл тұрмысын біржола тастап, түз тағыларының көсеміне айналды. 

Бірнеше жыл өткенде, ел ішінде «Көксерек» атанып кеткен алып сұр қасқырдың аты шықты. Ол адамнан қорықпайтын, айлакер әрі өте қатал жыртқышқа айналған еді. Қыс қатты болып, мал қырылған жұт жылы қасқырлар ауылдарға шаба бастады.

Бір күні боранды күні қой іздеп далаға шыққан Құрмаш ақ түтек боранда адасып қалады. Алдынан көзінде от ойнаған, арқасында өзі салған қарғыбаудың белгісі бар дәу сұр қасқыр шыға келді.

— Көксерек! Бұл мен ғой, Құрмашпын! — деп бала қуана алға ұмтылды.

Бірақ аш әрі жабайы табиғатына қайта оралған қасқырдың жадында балалық шақтың мейірімі сақталмаған еді. Жыртқыш түйсік жеңіп, қайғылы оқиға орын алды. Артынан ауыл аңшылары жетіп, қасқырдың көзін жойғанымен, бұл оқиға бүкіл далаға табиғат пен адам арасындағы шекараны бұзуға болмайтынын мәңгілік сабақ етіп қалдырды.`,
          ru: `Однажды снежной метельной ночью Коксерек перегрыз веревку и бесследно умчался в холодную мглу степи. Он навсегда вернулся в свою естественную стихию, примкнув к дикой стае.

Прошли годы. По округе пошла страшная слава о неуловимом и свирепом волке-одиночке, нападавшем на отары. Он знал повадки людей и потому был опаснее любого другого хищника. В голодный морозный год волки стали подходить к самым жилищам.

В суровый буран юный Курмаш вышел на поиски отбившихся овец и заблудился в снежной пелене. Неожиданно сквозь вихри метели перед ним возник огромный матёрый зверь с седой шерстью.

— Коксерек! Это же я, твой Курмаш! — с радостной надеждой воскликнул мальчик, сделав шаг навстречу.

Но в сердце дикого зверя не осталось места для человеческой памяти. Голод и слепая свирепость хищника заглушили давнее прошлое. Произошла трагедия. Прибывшие по следам охотники настигли волка, но этот горький финал остался для всех суровым напоминанием: законы природы неизменны, и дикий зверь всегда останется диким.`,
          en: `One stormy winter night, Kokserek severed his tether and bounded into the darkness. He had returned permanently to the sovereignty of the wild, rising to become the formidable leader of the steppe wolves.

Years elapsed. Rumors spread of an extraordinarily cunning and ruthless predator haunting the winter camps. Having observed human habits from youth, he feared neither campfire nor rifle. During a catastrophic freeze, wolves encroached directly upon settlements.

In a blinding blizzard, young Kurmash ventured into the snow to rescue stray sheep and lost his path. Through swirling drifts appeared an immense silver-grey wolf with burning amber eyes.

"Kokserek! It is me, your Kurmash!" cried the boy, reaching out with innocent trust.

Yet in the starving predator's consciousness, memories of childhood milk and gentle hands had evaporated. Instinct reigned supreme, culminating in tragedy. Hunters eventually tracked down the beast, leaving behind an indelible parabolic lesson on the unyielding divide between humankind and the wild.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'ks_q1',
          type: 'character_action',
          question: {
            kk: 'Бөлтірікті апаннан алып шыққан соң, оған «Көксерек» деп ат қойып, мейіріммен баққан бала кім?',
            ru: 'Как звали мальчика, который приютил волчонка и дал ему кличку Коксерек?',
            en: 'What was the name of the young boy who took in the wolf cub and named him Kokserek?'
          },
          options: {
            kk: [
              'Құрмаш',
              'Абай',
              'Ыбырай',
              'Қожа'
            ],
            ru: [
              'Курмаш',
              'Абай',
              'Ибрай',
              'Кожа'
            ],
            en: [
              'Kurmash',
              'Abai',
              'Ibray',
              'Kozha'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Бөлтірікті асырап алып, сүт беріп өсірген мейірімді бала — Құрмаш.',
            ru: 'Мальчика звали Курмаш — он выходил волчонка и искренне любил его.',
            en: 'The boy was Kurmash, who cared for the cub with heartfelt devotion.'
          }
        },
        {
          id: 'ks_q2',
          type: 'detail_memory',
          question: {
            kk: 'Ауыл ақсақалдары бала Құрмашқа қасқыр туралы қандай ескерту жасаған еді?',
            ru: 'О чем предупреждали Курмаша аульные старики?',
            en: 'What timeless warning did the elders give Kurmash regarding wolves?'
          },
          options: {
            kk: [
              '«Қасқырды қанша асырасаң да, орманға қарап ұлиды, жабайы қаны бір күні білінеді»',
              'Қасқыр жылқы бағатын ең жақсы дос болады',
              'Қасқыр қыста ұйқыға кетіп, ешкімге тиіспейді',
              'Қасқыр ешқашан далаға қашпайды'
            ],
            ru: [
              '«Сколько волка ни корми, он всё в степь смотрит, дикая кровь заговорит»',
              'Волк станет лучшей пастушьей собакой для отары',
              'Волк зимой впадает в спячку и не опасен',
              'Волк навсегда забудет повадки диких сородичей'
            ],
            en: [
              '"No matter how you feed a wolf, his heart turns to the wild; predatory instinct will prevail"',
              'A wolf makes the finest sheepdog for the flock',
              'A wolf hibernates during harsh winters and remains docile',
              'A wolf raised by humans permanently loses all wild instincts'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Қариялар жыртқыштың жабайы табиғатын адам баласы өзгерте алмайтынын ескерткен болатын.',
            ru: 'Старики напоминали пословицу о том, что природу дикого хищника невозможно переделать.',
            en: 'The elders emphasized the immutable boundary of the wild predator instinct.'
          }
        },
        {
          id: 'ks_q3',
          type: 'quote_memory',
          question: {
            kk: 'М. Әуезовтің «Көксерек» шығармасының басты философиялық тұжырымы қандай?',
            ru: 'В чем заключается главная философская идея повести «Серый Лютый»?',
            en: 'What is the central philosophical lesson of Mukhtar Auezov’s "Kokserek"?'
          },
          options: {
            kk: [
              'Табиғат заңдары мен жабайы жыртқыштың еркін болмысын зорлап үйрету мүмкін емес, оған құрметпен қарау керек',
              'Жабайы аңдарды үй жануарларындай ұстау оңай',
              'Адам кез келген аңды өзіне толық бағындыра алады',
              'Даладағы барлық аңдарды жою керек'
            ],
            ru: [
              'Законы природы нерушимы, и дикого хищника невозможно насильно одомашнить против его естества',
              'Любого хищника можно легко превратить в ручного питомца',
              'Человек властен полностью подчинить себе законы дикой фауны',
              'Природа не имеет собственной воли и законов'
            ],
            en: [
              'Nature possesses unbreakable laws; wild predators cannot be subordinated against their innate essence',
              'Any ferocious beast can be easily turned into a domestic pet',
              'Human desire always triumphs over the natural instincts of wildlife',
              'Nature obeys human commands without consequence'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Жазушы табиғат пен адамның арасындағы үйлесімділік пен заңдылықтарды бұзу қауіпті екенін ұқтырады.',
            ru: 'Повесть раскрывает трагедию нарушения естественных законов гармонии между человеком и природой.',
            en: 'The work underscores that violating natural order leads to inevitable tragedy.'
          }
        }
      ],
      openQuestion: {
        id: 'ks_open',
        prompt: {
          kk: 'Неліктен Құрмаштың шексіз мейірімі мен қамқорлығы Көксеректің жыртқыштық түйсігін жеңе алмады? Ойыңызды қорытындылаңыз.',
          ru: 'Почему искренняя любовь и забота Курмаша не смогли изменить дикую природу Коксерека? Поделитесь вашим читательским выводом.',
          en: 'Why did Kurmash’s tender affection fail to alter Kokserek’s primal predatory nature? Reflect on the novella’s message.'
        },
        keyThemes: {
          kk: ['табиғат', 'жыртқыш', 'еркіндік', 'түйсік', 'заң', 'мейірім'],
          ru: ['природа', 'инстинкт', 'свобода', 'хищник', 'закон природы', 'дикость'],
          en: ['nature', 'instinct', 'freedom', 'predator', 'natural law', 'wildness']
        },
        sampleAnswer: {
          kk: 'Қасқырдың жаратылысы мен генетикалық еркіндік түйсігі кез келген адамның тәрбиесінен жоғары тұрады. Табиғат заңын күштеп өзгерту мүмкін емес.',
          ru: 'Автор показывает, что многовековой природный инстинкт дикого зверя непреодолим. Любовь человека бессильна против законов естественного отбора и зова дикой природы.',
          en: 'The novella demonstrates that ancient evolutionary instincts cannot be overturned by individual affection; nature obeys its own sovereign laws.'
        }
      }
    }
  },
  {
    id: 'shuganyn-belgisi',
    title: {
      kk: 'Шұғаның белгісі',
      ru: 'Памятник Шуге (Шұғаның белгісі)',
      en: 'Shuga’s Monument'
    },
    author: {
      kk: 'Бейімбет Майлин',
      ru: 'Беимбет Майлин',
      en: 'Beimbet Mailin'
    },
    year: 1915,
    genre: {
      kk: 'Повесть, Лиро-эпос',
      ru: 'Классическая повесть, Драма',
      en: 'Classic Novella, Steppe Romance'
    },
    level: 'beginner',
    coverImage: '/src/assets/images/book_shuga_1790149976819.jpg',
    estimatedReadMinutes: 7,
    tags: {
      kk: ['Қазақ әдебиеті', 'Бейімбет Майлин', 'Махаббат', 'Шұға', 'Әбдірахман'],
      ru: ['Беимбет Майлин', 'Любовь', 'Шуга', 'Абдрахман', 'Классика'],
      en: ['Beimbet Mailin', 'Love story', 'Shuga', 'Steppe romance']
    },
    synopsis: {
      kk: 'Қазақ әдебиетіндегі мөлдір махаббат пен қасіретті тағдырдың көркем ескерткіші. Сұлу әрі ақылды Шұға мен оқыған жас мұғалім Әбдірахманның шынайы сезімі.',
      ru: 'Жемчужина дореволюционной казахской прозы о чистой любви красавицы Шуги и молодого учителя Абдрахмана, разрушенной кознями завистников и сословными предрассудками.',
      en: 'A timeless jewel of Kazakh romantic prose narrating the pure love between the graceful Shuga and the enlightened teacher Abdrakhman, thwarted by clan envy and social barriers.'
    },
    chapters: [
      {
        id: 'sh_c1',
        title: {
          kk: '1-бөлім: Тобыл бойындағы сұлу қыз бен оқыған жігіт',
          ru: 'Глава 1: Красавица Шуга и просветитель Абдрахман',
          en: 'Chapter 1: The Beauty Shuga and the Enlightened Teacher'
        },
        content: {
          kk: `Жаздың мамыражай кешінде Тобыл өзенінің жағасында келе жатқан жолаушылар алыстан көзге түскен жалғыз төбеге назар аударды. Жолбасшы қария:
— Бұл төбені жұрт «Шұғаның белгісі» деп атайды. Мұнда көзі тірісінде ақылына көркі сай болған сұлу қыз Шұғаның мұңы жатыр, — деп сыр шертті.

Шұға — ауылдың беделді байы Есімбектің ерке өскен, он саусағынан өнері тамған, сөзі маржан, көркіне бүкіл дала тамсанған жалғыз қызы еді. Ол ауылға қаладан оқу бітіріп келген көзі ашық, білімді мұғалім Әбдірахманды жолықтырады.

Әбдірахман елдегі балаларды оқытып, жастардың сауатын ашуға бар күшін салып жүрген азамат еді. Екеуі бір-бірін көрген сәттен-ақ жүректеріне махаббат оты тұтанды. Әбдірахманның парасаты мен Шұғаның нәзік болмысы үндесіп, олардың пәк сезімі бүкіл елге жайылды.

Алайда, ескі дәстүрге байланған бай туыстары мен іші тар күншілдер бұл теңдессіз сезімді көре алмады. Ауылда жала жабылып, жастардың бақытына тосқауыл қойыла бастады.`,
          ru: `Теплым летним вечером двое путников ехали берегом реки Тобол и обратили внимание на одинокий курган, возвышавшийся над степью. Старик-спутник вздохнул:
— Это место зовут «Шұғаның белгісі» — памятником Шуге. Здесь похоронена девушка, чья красота и благородная душа не знали равных во всей округе.

Шуга была единственной дочерью почтенного бая Есимбека. О ее дивной стати, кротком нраве и остром уме слагали песни. В ту пору в их волость приехал молодой учитель Абдрахман, только что окончивший городскую семинарию. Он открыл школу для крестьянских детей и мечтал о просвещении народа.

Судьба свела их, и вспыхнула чистая, возвышенная любовь. В умных речах Абдрахмана Шуга нашла отзвук своих девичьих дум, а юноша был покорен ее кристальной чистотой.

Но завистники и сторонники косных феодальных обычаев не могли смириться со счастьем молодых. Вокруг юноши стали плести коварные сети наговоров.`,
          en: `On a serene summer evening by the Tobol River, travelers gazed upon an isolated mound rising above the prairie. The elder guide whispered:
"That landmark is known as Shuga’s Monument. It preserves the memory of a maiden whose brilliance and nobility were celebrated across the steppes."

Shuga was the cherished daughter of the respected elder Esimbek. Renowned for her eloquence and dignity, she met Abdrakhman, an enlightened young scholar who had returned from the city to teach rural children.

Their mutual admiration blossomed into selfless devotion. In Abdrakhman’s visions of learning, Shuga found kindred ideals, while he beheld in her the radiant spirit of the steppe.

Yet reactionary rivals and clan gossips conspired against the young pedagogue, unable to abide an alliance forged through mutual respect rather than tribal barter.`
        },
      },
      {
        id: 'sh_c2',
        title: {
          kk: '2-бөлім: Ғашықтар қасіреті және мәңгілік белгі',
          ru: 'Глава 2: Разлука и вечная память любви',
          en: 'Chapter 2: Separation and Eternal Memorial'
        },
        content: {
          kk: `Күншіл ағайындар уездік бастыққа Әбдірахманның үстінен жалған домалақ арыз түсіріп: «Ол үкіметке қарсы бүлік тудырушы» деп жала жабады. Зұлымдықтың құрбаны болған жас жігітті түрмеге қамап, алыс қалаға айдап әкетеді.

Бұл суық хабар Шұғаның нәзік жүрегіне ауыр жара салды. Сүйгенінен көз жазып қалған ару қыз төсек тартып, дертке шалдығады. Ешбір емші оның сырқатына дауа таба алмады, өйткені оның дерті — сағыныш пен әділетсіздік күйігі еді.

Арада біраз уақыт өткенде Әбдірахманның ақ екені дәлелденіп, ол босатылып ауылға қарай асыға ат басын бұрады. Бірақ ол жеткенше кеш еді. Шұға соңғы демінде өзінің жүрек сырын хатқа түсіріп, сүйіктісіне аманат қалдырып, мәңгілікке көз жұмған болатын.

Әбдірахман зар еңіреп, оны осы биік төбе басына арулап жерлейді. Халық сол күннен бастап бұл жерді адал махаббаттың, таза сезімнің белгісі ретінде «Шұғаның белгісі» деп атап кетті. Бұл повесть қазақ даласындағы еркіндік пен шынайы махаббаттың мәңгілік гимні болып қалды.`,
          ru: `Завистники оклеветали честного учителя перед уездным начальством, донеся, будто он подстрекает народ к неповиновению. Безвинного Абдрахмана арестовали и увезли по этапу в тюрьму.

Эта весть сломила хрупкое здоровье Шуги. От горя и тоски она слегла в тяжелом недуге. Никакие лекари не могли помочь — ее сердце угасало без света любимых глаз.

Спустя месяцы клевета развеялась, и Абдрахмана оправдали. Задыхаясь от тревоги, юноша мчался на коне в родной аул, меняя загнанных лошадей. Но было слишком поздно. Шуга скончалась за несколько часов до его приезда, оставив ему прощальное письмо, полное бессмертной любви и прощения.

Убитый горем Абдрахман похоронил ее на высокой степной сопке. С тех пор люди назвали эту высоту «Памятником Шуге». Повесть Беимбета Майлина осталась в веках как гимн верности, чистоте и борьбе за свободу человеческого чувства.`,
          en: `Slanderous adversaries forged a treasonous denunciation to imperial authorities, claiming the progressive teacher was instigating rebellion. Innocent Abdrakhman was arrested and exiled.

The shock shattered Shuga’s frail health. Consumed by grief and powerlessness against injustice, she fell gravely ill. No medicine could revive a spirit deprived of hope.

Eventually, the charges were proven utterly false, and Abdrakhman was exonerated. He raced day and night toward the steppe, urging his horse forward without rest. Yet he arrived hours too late: Shuga had passed away, clasping a farewell letter professing unalterable love.

Grief-stricken, Abdrakhman laid her to rest atop the prominent knoll overlooking the Tobol valley. Ever since, generation after generation has honored the landmark as 'Shuga’s Monument' — an immortal anthem to unblemished devotion.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'sh_q1',
          type: 'character_action',
          question: {
            kk: 'Шұғаның сүйіктісі Әбдірахманның ауылдағы негізгі қызметі мен мақсаты қандай еді?',
            ru: 'Кем был возлюбленный Шуги Абдрахман и каково было его призвание?',
            en: 'What was Abdrakhman’s profession and vocation in the village?'
          },
          options: {
            kk: [
              'Ол балаларды оқытып, халықтың сауатын ашқан жас мұғалім еді',
              'Ол алыс елдермен сауда жасайтын көпес болатын',
              'Ол уездік соттың төрағасы болып қызмет істеді',
              'Ол тек мал бағумен айналысатын байдың көмекшісі еді'
            ],
            ru: [
              'Он был молодым учителем, обучавшим сельских детей грамоте',
              'Он был богатым купцом, торговавшим на ярмарках',
              'Он служил уездным судьей',
              'Он был батраком, присматривавшим за табунами'
            ],
            en: [
              'He was a dedicated young teacher educating rural children',
              'He was a wealthy merchant trading at regional fairs',
              'He was a district judge',
              'He was a ranch hand tending herds'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Әбдірахман ауылда мектеп ашып, жастардың көзін ашуға тырысқан оқыған азамат болатын.',
            ru: 'Абдрахман посвятил себя благородному делу просвещения сельских детей.',
            en: 'Abdrakhman was a pioneering educator who established classes for local youth.'
          }
        },
        {
          id: 'sh_q2',
          type: 'detail_memory',
          question: {
            kk: 'Не себепті Тобыл бойындағы биік төбе «Шұғаның белгісі» деп аталып кетті?',
            ru: 'Почему высокий курган у реки Тобол получил название «Памятник Шуге»?',
            en: 'Why was the high knoll by the Tobol River named "Shuga’s Monument"?'
          },
          options: {
            kk: [
              'Онда адал сезімнің құрбаны болған ару қыз Шұға жерленіп, оның мөлдір махаббатының белгісі болып қалғандықтан',
              'Ол жерде үлкен жәрмеңке өткізілгендіктен',
              'Ол төбеде қала билеушісінің сарайы салынғандықтан',
              'Ол жерде алтын кеніші табылғандықтан'
            ],
            ru: [
              'Там была похоронена верная своей любви Шуга, и холм стал вечным символом чистых чувств',
              'На этой сопке проводились знаменитые конные скачки',
              'Там располагалась летняя ставка губернатора',
              'На том холме нашли клад'
            ],
            en: [
              'The faithful maiden Shuga was buried there, making it an eternal memorial of pure devotion',
              'A major trading festival took place on that summit',
              'A governor’s summer palace was built there',
              'A gold mine was discovered beneath the ridge'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Әбдірахман сүйіктісі Шұғаны осы төбеге жерлеп, халық бұл жерді махаббат ескерткіші деп таныған.',
            ru: 'Курган над Тоболом стал вечным памятником трагической и чистой любви Шуги.',
            en: 'The hill stands as a solemn monument honoring Shuga’s steadfast romantic sacrifice.'
          }
        },
        {
          id: 'sh_q3',
          type: 'quote_memory',
          question: {
            kk: 'Бейімбет Майлин бұл шығармасында қандай қоғамдық кеселді сынға алды?',
            ru: 'Какие пороки общества критикует Беимбет Майлин в своей повести?',
            en: 'What social injustice does Beimbet Mailin critique in this novella?'
          },
          options: {
            kk: [
              'Жастардың еркіндігін шектеген ескі қасаң әдеттерді, күншілдік пен жалақорлықты',
              'Ғылым мен өнерге ұмтылуды',
              'Кітап оқып, сауат ашуды',
              'Ел арасындағы достықты'
            ],
            ru: [
              'Косные предрассудки, феодальное бесправие молодежи, зависть и доносительство',
              'Стремление молодежи к знаниям и наукам',
              'Грамотность и открытие сельских школ',
              'Искреннюю дружбу и солидарность'
            ],
            en: [
              'Feudal constraints on youth liberty, petty clan envy, and malicious slander',
              'The pursuit of science and cultural enlightenment',
              'Literacy and expanding community education',
              'Mutual friendship and solidarity'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Автор жастардың махаббатына кедергі болған ескі салт пен іштарлықты аяусыз әшкерелейді.',
            ru: 'Повесть обличает сословную косность и доносы, губящие человеческое счастье.',
            en: 'The author exposes archaic social barriers and deceitful jealousy that destroy human happiness.'
          }
        }
      ],
      openQuestion: {
        id: 'sh_open',
        prompt: {
          kk: 'Шұға мен Әбдірахманның тағдыры арқылы жазушы оқырманға қандай басты ой тастайды? Қазіргі заманда бұл шығарманың маңызы неде?',
          ru: 'Какую главную гуманистическую мысль передает Беимбет Майлин через драму Шуги и Абдрахмана? В чем актуальность произведения?',
          en: 'What core humanitarian truth does Beimbet Mailin communicate through the romance of Shuga and Abdrakhman?'
        },
        keyThemes: {
          kk: ['махаббат', 'әділдік', 'еркіндік', 'адалдық', 'өсек', 'Шұға'],
          ru: ['любовь', 'справедливость', 'свобода', 'верность', 'честь', 'гуманизм', 'предрассудки'],
          en: ['love', 'justice', 'freedom', 'loyalty', 'honor', 'humanism', 'prejudice']
        },
        sampleAnswer: {
          kk: 'Шынайы махаббат пен адамның ар-намысы кез келген байлықтан жоғары. Жазушы адамның сезім еркіндігі мен әділдікті қорғауға шақырады.',
          ru: 'Майлин показывает, что чистая любовь, верность и просвещение противостоят клевете и косности, а человеческое достоинство — высшая ценность.',
          en: 'Mailin demonstrates that genuine love, moral dignity, and educational enlightenment prevail in historical memory over malice and archaic barriers.'
        }
      }
    }
  },
  {
    id: 'botagoz',
    title: {
      kk: 'Ботагөз (Ақбөпе)',
      ru: 'Ботагоз',
      en: 'Botagoz'
    },
    author: {
      kk: 'Сәбит Мұқанов',
      ru: 'Сабит Муканов',
      en: 'Sabit Mukanov'
    },
    year: 1938,
    genre: {
      kk: 'Тарихи роман, Драма',
      ru: 'Исторический роман, Драма',
      en: 'Historical Novel, Drama'
    },
    level: 'intermediate',
    coverImage: '/src/assets/images/book_botagoz_1790149988922.jpg',
    estimatedReadMinutes: 8,
    tags: {
      kk: ['Қазақ әдебиеті', 'Сәбит Мұқанов', 'Ботагөз', 'Асқар', 'Тарих'],
      ru: ['Сабит Муканов', 'Ботагоз', 'Аскар', 'История Казахстана'],
      en: ['Sabit Mukanov', 'Botagoz', 'Askar', 'History']
    },
    synopsis: {
      kk: 'Қазақ қызының қайсарлығы мен азаттық жолындағы табандылығын бейнелейтін тарихи роман. Батыл Ботагөз бен ұлтжанды мұғалім Асқардың қилы кезеңдегі өмірі.',
      ru: 'Масштабное историческое полотно о судьбе гордой и свободолюбивой казахской девушки Ботагоз и прогрессивного учителя Аскара в вихре исторических перемен начала XX века.',
      en: 'A sweeping historical novel detailing the courage of the proud Kazakh heroine Botagoz and teacher Askar amidst early 20th-century social transformations.'
    },
    chapters: [
      {
        id: 'bg_c1',
        title: {
          kk: '1-бөлім: Қайсар қыз бен жас ұстаз Асқар',
          ru: 'Глава 1: Непокорная Ботагоз и учитель Аскар',
          en: 'Chapter 1: The Resolute Botagoz and Teacher Askar'
        },
        content: {
          kk: `Көкшетау баурайындағы ауылда өскен Ботагөз — көркіне ақылы сай, намысшыл әрі жігерлі қыз. Ол ер балалармен бірдей атқа мініп, асау жылқыны үйретіп, әділетсіздікке ешқашан бас имейтін.

Ауылға жас ұстаз Асқар Досанов келеді. Ол Омбы қаласынан білім алып, ауыл жастарын ғылым мен өнерге баулуды мақсат еткен парасатты азамат еді. Асқар мектеп ашып, қарапайым елдің балаларына хат танытады.

Ботагөз Асқардың әңгімелерін естіп, кітапқа құмарта бастайды. Асқар қыздың зеректігіне таңғалып, оған кітаптар береді. Екеуінің арасында туған таза достық пен рухани үндестік бірте-бірте терең махаббатқа ұласады.

Алайда, бай-шонжарлар халықтың сауаттанғанын қаламады. Ботагөзге байдың тоқалы болу туралы мәжбүрлі ұсыныстар түседі. Қайсар қыз өз арын қорғап, барлық қысымға қарсы тұруға бел буады.`,
          ru: `В ауле у живописных отрогов Кокшетау росла Ботагоз — девушка редкой красоты, гордого нрава и неукротимой воли. С малых лет она бесстрашно скакала на горячих конях и смело говорила правду в лицо сильным мира сего.

В их края прибыл молодой учитель Аскар Досанов. Получив образование в Омске, он мечтал принести в родные степи свет знаний и справедливости. Аскар открыл аульную школу для бедняцких детей.

Ботагоз с жадностью внимала урокам Аскара и потянулась к чтению. Восхищенный ее острым умом, юноша щедро делился книгами. Скоро между ними завязалась трогательная дружба, переросшая в крепкое чувство.

Однако местная знать смотрела на школьного учителя как на смутьяна. Более того, влиятельный волостной попытался насильно взять независимую красавицу в жены. Но Ботагоз была не из тех, кто смиряется с чужой волей.`,
          en: `In a settlement beneath the wooded hills of Kokshetau lived Botagoz — a maiden distinguished by keen intelligence, fearless composure, and an unbending sense of honor.

To the region arrived educator Askar Dosanov. Educated in Omsk, Askar sought to bring literacy and modern knowledge to prairie children, founding an independent schoolhouse.

Botagoz was captivated by Askar’s enlightened lectures and immersed herself in literature. Their mutual intellectual fellowship blossomed into enduring romantic loyalty.

Yet feudal elders viewed education as a threat to their authority. When an influential chieftain attempted to force Botagoz into marriage, she stood unshakeable, defending her autonomy.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'bg_q1',
          type: 'character_action',
          question: {
            kk: 'Сәбит Мұқановтың романындағы басты кейіпкер Ботагөздің мінезі қандай қасиетімен ерекшеленеді?',
            ru: 'Какими главными чертами характера выделяется героиня романа Ботагоз?',
            en: 'What defining traits characterize the heroine Botagoz in Sabit Mukanov’s novel?'
          },
          options: {
            kk: [
              'Қайсарлық, әділдік, арын қорғай білу және білімге құштарлық',
              'Қорқақтық пен жалтақтық',
              'Тек байлық пен алтынға қызығушылық',
              'Ешкіммен сөйлеспейтін жалқаулық'
            ],
            ru: [
              'Решительность, обостренное чувство справедливости, верность чести и тяга к знаниям',
              'Покорность и робость перед сильными мира сего',
              'Алчность и погоня за роскошью',
              'Равнодушие ко всему происходящему'
            ],
            en: [
              'Resolute independence, thirst for knowledge, justice, and uncompromising personal honor',
              'Timid submission to despotic traditions',
              'Greed and obsession with luxury',
              'Apathy toward the community'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Ботагөз қазақ қыздарының арасынан шыққан еркін, қайсар әрі намысшыл бейне.',
            ru: 'Ботагоз символизирует несокрушимое достоинство и силу духа свободолюбивой женщины.',
            en: 'Botagoz embodies the resilient spirit and dignity of a progressive Kazakh heroine.'
          }
        },
        {
          id: 'bg_q2',
          type: 'detail_memory',
          question: {
            kk: 'Ауылға Омбыдан оқып келіп, мектеп ашып, халықты білімге шақырған мұғалім кім?',
            ru: 'Как звали учителя, вернувшегося из Омска и открывшего школу для детей?',
            en: 'What was the name of the teacher who returned from Omsk to establish a school?'
          },
          options: {
            kk: [
              'Асқар Досанов',
              'Әбдірахман',
              'Құнанбай',
              'Байтас'
            ],
            ru: [
              'Аскар Досанов',
              'Абдрахман',
              'Кунанбай',
              'Байтас'
            ],
            en: [
              'Askar Dosanov',
              'Abdrakhman',
              'Qunanbai',
              'Baitas'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Ауылда жастардың көзін ашқан білімді ұстаз — Асқар Досанов.',
            ru: 'Молодого прогрессивного учителя звали Аскар Досанов.',
            en: 'The educated teacher was Askar Dosanov.'
          }
        },
        {
          id: 'bg_q3',
          type: 'quote_memory',
          question: {
            kk: 'Романдағы Асқардың басты өмірлік ұстанымы қандай болды?',
            ru: 'Каково было главное жизненное кредо учителя Аскара?',
            en: 'What was teacher Askar’s core conviction in the novel?'
          },
          options: {
            kk: [
              'Халықтың көзін білім мен мәдениет арқылы ашу, әділетті қоғам орнату',
              'Тек өз пайдасын ойлап, байлық жинау',
              'Мектепті жауып, қалаға қайтып кету',
              'Ескі әділетсіздікке көніп өмір сүру'
            ],
            ru: [
              'Просвещать народ через культуру и науку, добиваясь справедливости',
              'Искать лишь чинов и личного обогащения',
              'Закрыть школу и отстраниться от нужд аула',
              'Смириться с произволом баев'
            ],
            en: [
              'Enlighten the people through education and science while striving for fairness',
              'Seek personal rank and material wealth at all costs',
              'Shut down the school and retreat to urban comfort',
              'Acquiesce to the whims of corrupt chieftains'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Асқар қараңғылықпен күресіп, халыққа білім сәулесін шашуды азаматтық борышы санады.',
            ru: 'Аскар видел свою миссию в борьбе с невежеством и служении народу.',
            en: 'Askar regarded educational enlightenment as his fundamental civic duty.'
          }
        }
      ],
      openQuestion: {
        id: 'bg_open',
        prompt: {
          kk: 'Ботагөз образы арқылы автор қазақ әйелінің қоғамдағы рөлі мен құқығы туралы қандай ой айтады?',
          ru: 'Какую идею о роли и правах женщины в обществе раскрывает автор через образ Ботагоз?',
          en: 'What message about women’s dignity and equality does the author convey through Botagoz?'
        },
        keyThemes: {
          kk: ['әйел теңдігі', 'намыс', 'білім', 'бостандық', 'қайсарлық', 'әділдік'],
          ru: ['равноправие', 'честь', 'свобода', 'достоинство', 'женщина', 'образование', 'мужество'],
          en: ['equality', 'honor', 'freedom', 'dignity', 'women', 'education', 'courage']
        },
        sampleAnswer: {
          kk: 'Сәбит Мұқанов әйел затының тек ошақ қасымен шектелмей, өз тағдырын өзі шешетін, қоғамда тең құқылы қайраткер бола алатынын дәлелдейді.',
          ru: 'Писатель утверждает ценность женского равноправия, свободы выбора и личного достоинства, показывая Ботагоз как самостоятельную и несгибаемую личность.',
          en: 'Mukanov champions women’s equality and self-determination, depicting Botagoz as a valiant actor in shaping her own destiny.'
        }
      }
    }
  },
  {
    id: 'alpamys-batyr',
    title: {
      kk: 'Алпамыс батыр (Батырлар жыры)',
      ru: 'Алпамыс батыр (Героический эпос)',
      en: 'Alpamys Batyr (Heroic Epos)'
    },
    author: {
      kk: 'Қазақ халық эпосы',
      ru: 'Казахский героический эпос',
      en: 'Kazakh Heroic Epos'
    },
    year: 1550,
    genre: {
      kk: 'Батырлар жыры, Эпос',
      ru: 'Героический эпос, Фольклор',
      en: 'Heroic Epos, Folklore'
    },
    level: 'beginner',
    coverImage: '/src/assets/images/book_alpamys_1790150001542.jpg',
    estimatedReadMinutes: 7,
    tags: {
      kk: ['Қазақ фольклоры', 'Алпамыс', 'Байшұбар', 'Гүлбаршын', 'Ерлік'],
      ru: ['Казахский фольклор', 'Алпамыс', 'Байшубар', 'Гульбаршин', 'Батыр'],
      en: ['Kazakh folklore', 'Alpamys', 'Baishubar', 'Heroism']
    },
    synopsis: {
      kk: 'Қазақ халқының қаһармандық дастаны — елі мен жерін қорғаған айбынды Алпамыс батырдың, оның адал тұлпары Байшұбар мен сұлу Гүлбаршынның аңызға айналған ерлігі.',
      ru: 'Жемчужина устного народного творчества — сказание о могучем витязе Алпамысе, его верном богатырском коне Байшубаре и верной супруге Гульбаршин, защитивших родину от захватчиков.',
      en: 'The monumental Kazakh heroic epos celebrating the legendary champion Alpamys Batyr, his faithful steed Baishubar, and the devoted Gulbarshin defending their homeland.'
    },
    chapters: [
      {
        id: 'ab_c1',
        title: {
          kk: '1-бөлім: Батырдың тууы және Байшұбар тұлпар',
          ru: 'Глава 1: Рождение богатыря и верный конь Байшубар',
          en: 'Chapter 1: Birth of the Hero and the Steed Baishubar'
        },
        content: {
          kk: `Ерте заманда Жиделі-Байсын жерінде Байбөрі деген атақты бай өмір сүріпті. Оның мыңғырған малы, ұшан-теңіз дәулеті болса да, қартайғанша перзент көрмей, зар еңірейді.

Күндердің күнінде тілегі қабыл болып, Байбөрінің шаңырағында дүниеге ерекше ұл келеді. Баланың есімін Алпамыс деп қояды. Алпамыс күн санап емес, сағат санап өседі: жеті жасында садақ тартып, он жасында алысқан жауын алып ұратын айбынды батырға айналады.

Әкесі оған арнап көп жылқының ішінен торы құлынды таңдайды. Бұл болашақта қанатты тұлпарға айналған атақты Байшұбар ат еді. Байшұбар мен Алпамыс бір-біріне айнымас серік болады.

Көрші Қаратау еліндегі Сарыбайдың сұлу қызы Гүлбаршын екеуінің атастырылған серті бар еді. Алпамыс елі мен жеріне төнген қауіпті естіп, жас жігіт шағында атқа қонып, туған халқының намысы мен бейбітшілігін қорғауға аттанады.`,
          ru: `В незапамятные времена в благословенном краю Жидели-Байсын жил знатный старец Байбори. Несметны были его табуны и отары, но на склоне лет горевал он, ибо не дал ему Создатель наследника.

Услышал Всевышний искренние мольбы старца, и родился у него долгожданный сын, нареченный Алпамысом. Младенец рос не по дням, а по часам: в семь лет натягивал богатырский лук, а к десяти годам стал могучим батыром, которому не было равных в поединках.

Из тысячи жеребят отец выбрал для сына невзрачного гнедого стригунка, которому суждено было стать крылатым богатырским конем — Байшубаром. Конь и батыр понимали друг друга без слов.

С детства Алпамыс был обручен с прекрасной и мудрой Гульбаршин. Узнав о бедствиях и кознях врагов, посягнувших на свободу родной земли, юный Алпамыс оседлал верного коня и отправился в дальний поход, чтобы защитить отчий край.`,
          en: `In ancient eras, in the blessed steppe haven of Zhideli-Baisyn, dwelt the elder Baibori. Despite immeasurable wealth and vast herds, he wept in his old age for lack of an heir.

His fervent prayers were answered when a son of supernatural vigor was born, named Alpamys. The youth grew with extraordinary speed: by age seven he bent mighty war bows, and by ten he surpassed all contenders in wrestling.

From the herd, his father selected an unassuming colt destined to become the legendary winged charger Baishubar. Steed and master forged an unbreakable bond.

Betrothed since infancy to the virtuous and sharp-witted Gulbarshin, Alpamys mounted his loyal warhorse to shield his homeland against foreign marauders and restore peace to the steppe.`
        },
      },
      {
        id: 'ab_c2',
        title: {
          kk: '2-бөлім: Қалмақ еліндегі зындан және елге оралу',
          ru: 'Глава 2: Подземная темница и спасение народа',
          en: 'Chapter 2: The Deep Dungeon and the Triumph of Justice'
        },
        content: {
          kk: `Жау еліне барған Алпамыс қапыда айлакер дұшпанның тұзағына түсіп, терең зынданға тасталады. Жеті жыл бойы тас қараңғы зынданда жатса да, батырдың рухы сынбады, еліне деген сағынышы сөнбеді.

Адал тұлпары Байшұбар мен мейірімді қыз Қарлығаштың көмегімен Алпамыс ақыры зынданнан босап шығады. Ол тұлпарына мініп, туған жеріне оралғанда, Жиделі-Байсынды озбыр Ұлтан басып алып, қартайған әке-шешесін түйеші қылып қорлап, Гүлбаршынды зорлықпен алмақ болып жатқанын көреді.

Алпамыс қарапайым бақташы кейпінде ауылға келіп, мергендік сайысына қатысады. Өзінің әйгілі садағын қолына алып, нысананы көздемей-ақ қақ жарғанда, халық өз батырын бірден таниды.

Озбырлық пен зұлымдық жазасын алып, елде әділдік орнайды. Алпамыс пен Гүлбаршын қайта қауышып, халыққа бейбіт те бақытты өмір сыйлайды. Бұл жыр қазақ халқының ерлік пен отансүйгіштік рухын мәңгілікке паш етеді.`,
          ru: `В стране неприятеля коварные враги обманом заманили батыра в глубокую темницу-зиндан. Семь долгих лет провел богатырь во мраке подземелья, но ни цепи, ни голод не сломили его несокрушимого духа.

Благодаря помощи верного коня Байшубара и благородной девы Карлыгаш богатырь вырвался на свободу. Помчавшись в родной край Жидели-Байсын, он обнаружил, что власть захватил жестокий и коварный Ултан: престарелых родителей Алпамыса он сделал рабами-верблюжатниками, а верную Гульбаршин принуждал к браку.

Не открывая своего имени, в одежде пастуха Алпамыс явился на свадебные состязания. Когда он взял в руки свой исполинский тугой лук и без промаха поразил далекую мишень, народ восторженно узнал своего истинного защитника.

Жестокий узурпатор понес заслуженное возмездие, а в степи воцарились мир и справедливость. Алпамыс воссоединился с преданной Гульбаршин, вернув счастье родителям и свободу своему народу.`,
          en: `In enemy territory, through treacherous trickery, Alpamys was cast into a subterranean dungeon. For seven years he languished in the dark pit, yet despair never eroded his heroic soul.

With the loyalty of his steed Baishubar and the aid of maiden Karlygash, the champion shattered his bonds. Galloping home, he discovered the usurper Ultan had subjugated the settlement, reducing Alpamys’s elderly parents to mistreated camel-herders and coercing Gulbarshin into marriage.

Disguised in humble attire, Alpamys entered the archery contest. Striding forth, he drew his colossal bow and split the bullseye effortlessly, whereupon the populace recognized their rightful protector.

Tyranny was vanquished and righteous order restored. Alpamys reunited with Gulbarshin, securing peace and honor for his grateful homeland.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'ab_q1',
          type: 'detail_memory',
          question: {
            kk: 'Алпамыс батырдың айнымас серігі, қанатты тұлпарының аты қалай?',
            ru: 'Как звали верного богатырского коня Алпамыса?',
            en: 'What was the name of Alpamys’s faithful winged warhorse?'
          },
          options: {
            kk: [
              'Байшұбар',
              'Тайбурыл',
              'Құлагер',
              'Тарлан'
            ],
            ru: [
              'Байшубар',
              'Тайбурыл',
              'Кулагер',
              'Тарлан'
            ],
            en: [
              'Baishubar',
              'Taiburyil',
              'Kulager',
              'Tarlan'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Алпамыс батырдың аты аңызға айналған серігі — Байшұбар тұлпар.',
            ru: 'Крылатого богатырского коня Алпамыса звали Байшубар.',
            en: 'Alpamys Batyr’s legendary steed was Baishubar.'
          }
        },
        {
          id: 'ab_q2',
          type: 'detail_memory',
          question: {
            kk: 'Алпамыс батырдың адал да ақылды жарының есімі кім?',
            ru: 'Как звали верную и мудрую невесту Алпамыса?',
            en: 'What was the name of Alpamys’s devoted and wise betrothed?'
          },
          options: {
            kk: [
              'Гүлбаршын',
              'Құртқа',
              'Ақжүніс',
              'Шұға'
            ],
            ru: [
              'Гульбаршин',
              'Куртка',
              'Акжунис',
              'Шуга'
            ],
            en: [
              'Gulbarshin',
              'Kurtka',
              'Akzhunis',
              'Shuga'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Алпамыстың сүйген жары әрі серігі — дана Гүлбаршын.',
            ru: 'Возлюбленной и мудрой спутницей батыра была Гульбаршин.',
            en: 'The faithful companion and heroine was Gulbarshin.'
          }
        },
        {
          id: 'ab_q3',
          type: 'quote_memory',
          question: {
            kk: '«Алпамыс батыр» дастанының басты патриоттық идеясы неде?',
            ru: 'В чем заключается главная патриотическая идея эпоса «Алпамыс батыр»?',
            en: 'What is the paramount patriotic ideal embodied in the epic of Alpamys Batyr?'
          },
          options: {
            kk: [
              'Туған ел мен жерді қорғау, әділдікті сақтау және зұлымдыққа қарсы табанды күресу',
              'Бөгде елдерді басып алып, байлық жинау',
              'Ешқандай соғыссыз жеңілісті қабылдау',
              'Тек өз қамын ойлап, елден кету'
            ],
            ru: [
              'Защита родной земли, преданность своему народу, торжество справедливости над насилием',
              'Захват чужих земель ради добычи',
              'Покорность врагам без сопротивления',
              'Бегство от трудностей и равнодушие к отчему дому'
            ],
            en: [
              'Defense of the homeland, steadfast fidelity to the people, and triumph of righteousness over tyranny',
              'Invasion of foreign lands solely for plunder',
              'Passivity and surrender before adversaries',
              'Deserting one’s community during tribulations'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Жыр халықты бірлікке, отаншылдыққа және әділеттілікке шақырады.',
            ru: 'Эпос воспевает любовь к родине, мужество и неминуемое поражение угнетателей.',
            en: 'The epos exalts courage, unyielding devotion to homeland, and the restoration of ethical order.'
          }
        }
      ],
      openQuestion: {
        id: 'ab_open',
        prompt: {
          kk: 'Алпамыс батыр жырынан қазақ халқының қандай дәстүрлері мен ерлік құндылықтарын байқауға болады?',
          ru: 'Какие обычаи, традиционные ценности и представления о воинской чести казахского народа отражены в эпосе?',
          en: 'What ancestral values, traditions, and principles of martial honor are highlighted in the Alpamys epic?'
        },
        keyThemes: {
          kk: ['ерлік', 'отан', 'адалдық', 'тұлпар', 'намыс', 'әділдік', 'бірлік'],
          ru: ['честь', 'родина', 'верность', 'батыр', 'справедливость', 'конь', 'единство'],
          en: ['honor', 'homeland', 'loyalty', 'champion', 'justice', 'steed', 'unity']
        },
        sampleAnswer: {
          kk: 'Дастанда ел қорғау ердің басты парызы екені, адал дос пен тұлпардың орны, әйел затының ақылы мен сертке беріктігі айқын көрсетілген.',
          ru: 'Эпос демонстрирует неразрывную связь батыра с родной землей, святость данного слова, верность боевого коня и мудрость женщины.',
          en: 'The epic highlights the sacred duty of defending one’s soil, the bond with one’s noble charger, and the indispensable fortitude of women.'
        }
      }
    }
  }
];
