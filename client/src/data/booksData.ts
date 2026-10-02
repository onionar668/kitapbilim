import { Book } from '../types';
import { kazakhClassics } from './kazakhClassicsData';
import { readingNationBook } from './readingNationData';

const worldAndAbaiBooks: Book[] = [
  {
    id: 'abai-words',
    title: {
      kk: 'Қара сөздер',
      ru: 'Слова назидания',
      en: 'Words of Edification'
    },
    author: {
      kk: 'Абай Құнанбайұлы',
      ru: 'Абай Кунанбаев',
      en: 'Abai Qunanbaiuly'
    },
    year: 1898,
    genre: {
      kk: 'Философия, Әдебиет',
      ru: 'Философия, Классика',
      en: 'Philosophy, Classics'
    },
    level: 'intermediate',
    coverImage: '/src/assets/images/book_abai_words_1790149372465.jpg',
    estimatedReadMinutes: 8,
    tags: {
      kk: ['Қазақ әдебиеті', 'Ақыл мен жүрек', 'Ғылым'],
      ru: ['Казахская литература', 'Мудрость', 'Философия'],
      en: ['Kazakh literature', 'Wisdom', 'Philosophy']
    },
    synopsis: {
      kk: 'Ұлы ақын әрі ойшыл Абайдың адамгершілік, ғылым, еңбек және парасат жайында толғанған мәңгілік философиялық трактаты.',
      ru: 'Фундаментальный философско-прозаический труд великого казахского мыслителя Абая о чести, разуме, науке, сердце и стремлении к просвещению.',
      en: 'A profound philosophical work by the great Kazakh thinker Abai, meditating on human virtue, scientific inquiry, heart, and wisdom.'
    },
    chapters: [
      {
        id: 'c1',
        title: {
          kk: 'Бірінші сөз (Бастау)',
          ru: 'Слово первое (Вступление)',
          en: 'Word One (The Beginning)'
        },
        content: {
          kk: `Бұл жасқа келгенше жақсы өткіздік пе, жаман өткіздік пе, әйтеуір бірталай өмірімізді өткіздік: алыстық, жұлыстық, айтыстық, тартыстық — әурешілікті көре-көре келдік. Енді жер ортасы жасқа келдік: қажыдық, жалықтық; қылып жүрген ісіміздің бәрінің баянсызын, байлаусызын көрдік, бәрі қоршылық екенін білдік.

Ал, енді қалған өмірді қалай өткіземіз? Не істеп бағамыз? Соны таба алмай өзім де қайранмын.

Ел бағу? Жоқ, елге бағым жоқ. Бағусыз дертке ұшырайын деген кісі бақпаса, не албыртқан, көңілі басылмаған жас бақпаса, бұл қылшылдаған жасымда қорлықты көп көрген соң, мені құдайым сақтасын.

Мал бағу? Жоқ, баға алмаймын. Балалар өздеріне керегінше бағар. Ендігі мал баққанның бәрі — ұры мен сұмның көзіне түсу үшін еңбек қылғанмен бірдей.

Ғылым бағу? Жоқ, ғылым бағарға да ғылым сөзін сөйлесер адам жоқ. Білгеніңді кімге үйретерсің, білмегеніңді кімнен сұрарсың?

Ақыры ойладым: осы ойыма келген нәрселерді қағазға жаза берейін, ақ қағаз бен қара сияны ермек қылайын, кімде-кім ішінен керекті сөз тапса, жазып алсын, я оқысын; керегі жоқ десе, өз сөзім өзімдікі дедім де, ақыры осыған байладым, енді мұнан басқа ешбір жұмысым жоқ.`,
          ru: `Хорошо ли я прожил до этих лет, плохо ли, а пройдено немало: в борьбе и ссорах, в суете и тяжбах дошел до преклонного возраста. И вот устал от всего, увидел бренность и бесплодность всех своих трудов, убедился в мелочности стремлений.

Как же теперь провести остаток жизни? Чем заняться? И сам поражаюсь, не находя ответа.

Править народом? Нет, народ не поддается правлению. Пусть правит тот, кто еще не испытал этого мучения, или тот, чье сердце молодо и неукротимо. А меня, испытавшего столько унижений, да избавит Всевышний от этой участи.

Преумножать скот? Нет, не стану. Пусть дети сами заботятся о хлебе насущном. Ныне копить добро — значит лишь привлекать зависть воров и проходимцев.

Заняться наукой? Но кому передать знания, с кем разделить мысли? Кто захочет слушать, и у кого самого спросить о неведомом?

В конце концов решил: буду записывать мысли, что приходят на ум, возьму в спутники белую бумагу и черные чернила. Пусть тот, кто найдет в этих строках нужное слово, перепишет или просто прочтет его; а коли сочтет бесполезным — мои слова останутся при мне. И другого дела у меня отныне нет.`,
          en: `Whether well or poorly I have lived up to this age, I have nevertheless lived quite a lifetime: struggling, striving, arguing, and enduring toil after toil. Now I have reached middle age; I am weary and exhausted. I have seen how unstable and futile all our efforts were, and how much humiliation lay within them.

How then shall I spend the remainder of my life? What path shall I take? I myself am at a loss to find an answer.

Govern the people? No, the people cannot be governed this way. Let him govern who has not yet suffered such affliction, or whose youthful ambition is unquenched.

Amass herds of livestock? No, my children will care for what they need. To hoard wealth today is merely to invite the greed of thieves and scoundrels.

Devote myself to science? But with whom can I share discourse on wisdom? To whom shall I teach what I know, and of whom shall I inquire of what I do not?

At last I resolved: I shall write down whatever thoughts arise within my mind, taking white paper and black ink as my solace. Whoever finds a useful word therein may transcribe or read it; and if they find it useless, my words remain my own. And now I have no other occupation.`
        }
      },
      {
        id: 'c2',
        title: {
          kk: 'Жетінші сөз (Баланың табиғаты)',
          ru: 'Слово седьмое (Природа познания)',
          en: 'Word Seven (The Nature of Learning)'
        },
        content: {
          kk: `Жас бала анадан туғанда екі түрлі мінезбен туады: біреуі — ішсем, жесем, ұйықтасам деп тұрады. Бұлар — тәннің құмары, бұлар болмаса, тән жанға қонақ үй бола алмайды, һәм өзі өспейді, қуат таппайды.

Екіншісі — білсем екен демеклік. Не көрсе соған талпынып, «ол немене?», «бұл немене?» деп, «ол неге үйтеді?», «бұл неге бүйтеді?» деп, көзі көрген, құлағы естігеннің бәрін сұрап, тыныштық көрмейді. Мұның бәрі — жан құмары, білсем екен, көрсем екен, үйренсем екен дегендік.

Дүниенің көрінген һәм көрінбеген сырын түгелдеп, ең болмаса денелеп білмесе, адам баласының адам болғаны қайсы? Ұқпаса, білмесе, жануардан несі артық?

Ержеткен соң сол жан құмарын суытып аламыз. Мақтан қуамыз, пайда қуамыз, ар-ұятты шетке ысырып қоямыз. Білім-ғылымды көбейтуге емес, атақ шығаруға құмар боламыз. Бұл — біздің қасіретіміз.`,
          ru: `Ребенок появляется на свет, имея две основные потребности: первая — пить, есть и спать. Это потребности тела, без них плоть не сможет служить пристанищем для души, не вырастет и не обретет сил.

Вторая потребность — жажда познания. Младенец тянется ко всему, что видит и слышит: «Что это?», «Почему так?», трогает предметы, прислушивается к звукам и не знает покоя. Все это — потребность души, неутолимое желание всё увидеть, узнать, постичь.

Если человек не стремится разгадать видимые и сокрытые тайны мира, то в чем тогда его человеческое достоинство? Если он не познает истины, чем он превосходит бессловесное животное?

Но повзрослев, мы часто остужаем в себе эту чистую жажду души. Мы начинаем гнаться за сиюминутной выгодой, хвастовством, чинами и забываем о совести. Мы тратим жизнь не на приобретение истинных знаний, а на пустую молву. И в этом наша величайшая беда.`,
          en: `A child is born into this world endowed with two primary instincts: the first is to drink, eat, and sleep. These belong to bodily cravings; without them, the physical form could not serve as a dwelling place for the soul, nor could it grow and gain strength.

The second instinct is the thirst for knowledge. The child reaches out to everything seen and heard, asking ceaselessly: "What is that?", "Why does it do this?", never resting. All this is the craving of the soul — the ardent desire to know, to see, and to learn.

If a human being does not strive to comprehend the visible and invisible secrets of the universe, wherein lies his humanity? Without understanding, how does he surpass a beast?

Yet when we grow into adulthood, we quench this noble craving of the soul. We chase vanity, fleeting profit, and cast shame aside. This is our tragedy.`
        }
      },
      {
        id: 'c3',
        title: {
          kk: 'Отыз бірінші сөз (Есте сақтаудың төрт шарты)',
          ru: 'Слово тридцать первое (Четыре условия памяти)',
          en: 'Word Thirty-One (Four Keys to Retention)'
        },
        content: {
          kk: `Естіген нәрсені ұмытпастыққа төрт түрлі себеп бар: әуелі — көкірегі байлаулы берік болмақ керек; екінші — сол нәрсені естігенде я көргенде ғибратлану керек, көңілденіп, тұшынып, ықыласпен тыңдау керек; үшінші — сол нәрсені ішінен бірнеше уақыт қайтарып ойланып, көңілге бекіту керек; төртінші — ой кеселді нәрселерден қашық болу керек.

Ой кеселі дегеніміз не? Ол — салғырттық, бойкүйездік, уайымсыздық, құмарпаздық немесе бос күлкі. Бұл кеселдер пайда болған жерде естіген ақыл, оқыған білім тоқтамайды, құмға құйған судай жоқ болады.

Кімде-кім осы төрт шартты орындаса, оның білімі ұзаққа барады, тозбайды, өзіне де, өзгеге де пайдасын тигізеді.`,
          ru: `Чтобы запомнить услышанное и не растерять знания, необходимы четыре условия: во-первых, нужно иметь твердость духа и ясный ум; во-вторых, воспринимать поучение с искренним воодушевлением и глубоким интересом, слушая с открытым сердцем; в-третьих, многократно мысленно возвращаться к услышанному, закрепляя истину в памяти; в-четвертых, избегать душевных пороков, разрушающих мысль.

Что же это за пороки мысли? Это беспечность, лень, праздность, пустые забавы и суетное легкомыслие. Где поселяются эти недуги, там мудрость не задерживается — она утекает, как вода в песок.

Тот, кто соблюдает эти четыре правила, сбережет знание на долгие годы, и оно принесет щедрые плоды ему самому и окружающим.`,
          en: `There are four conditions necessary to retain what has been heard and never forget it: first, one must possess steadfast resolve and an attentive mind; second, one must listen with genuine devotion and deep appreciation, absorbing the truth with warmth in the heart; third, one must revisit the concept repeatedly in quiet contemplation, anchoring it in the consciousness; fourth, one must shun the illnesses of the mind.

And what are the illnesses of the mind? They are carelessness, indolence, frivolous amusement, and vain distractions. Wherever these ailments take root, wisdom cannot dwell; it vanishes like water poured into dry desert sand.

Whoever observes these four conditions will preserve knowledge for years to come, bringing lasting benefit to oneself and others.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'abai_q1',
          type: 'multiple_choice',
          question: {
            kk: '«Бірінші сөзде» Абай қалған өмірін қалай өткізуге шешім қабылдайды?',
            ru: 'В «Слове первом» чему в итоге решает посвятить остаток дней Абай?',
            en: 'In "Word One", what does Abai ultimately decide to dedicate the rest of his days to?'
          },
          options: {
            kk: [
              'Ел басқарып, әкім болуға',
              'Қағаз бен сияны ермек етіп, ойларын жазуға',
              'Мал бағып, дүние-мүлік жинауға',
              'Шет елдерге саяхат жасауға'
            ],
            ru: [
              'Управлению народом и волостным делам',
              'Записи своих мыслей на белой бумаге черными чернилами',
              'Преумножению стад скота и богатства',
              'Дальним путешествиям в чужие края'
            ],
            en: [
              'Governing the clans and political matters',
              'Writing down his reflections with black ink on white paper',
              'Amassing cattle herds and tangible wealth',
              'Traveling to distant foreign lands'
            ]
          },
          correctIndex: 1,
          explanation: {
            kk: 'Абай ел бағудан, мал жинаудан бас тартып, «ақ қағаз бен қара сияны ермек қылайын» деп шешеді.',
            ru: 'Абай отверг управление, накопление скота и избрал путь письма: «возьму в спутники белую бумагу и черные чернила».',
            en: 'Abai declined political governance and wealth, choosing instead to write down his reflections.'
          }
        },
        {
          id: 'abai_q2',
          type: 'detail_memory',
          question: {
            kk: '«Жетінші сөзде» айтылғандай, бала анадан туғанда пайда болатын екі қажеттілік қандай?',
            ru: 'Согласно «Слову седьмому», какие две потребности заложены в человеке с рождения?',
            en: 'According to "Word Seven", what are the two core needs a human is born with?'
          },
          options: {
            kk: [
              'Тән құмары (ішіп-жеу, ұйқы) және жан құмары (білсем екен деу)',
              'Баюға ұмтылу және билікке таласу',
              'Ұйықтау және ойын ойнау',
              'Сөйлеу және жүру қабілеті'
            ],
            ru: [
              'Потребность тела (еда, питье, сон) и потребность души (жажда познания)',
              'Стремление к богатству и жажда власти',
              'Сон и постоянные игры',
              'Умение красиво говорить и путешествовать'
            ],
            en: [
              'Cravings of the body (eating, sleeping) and cravings of the soul (thirst for knowledge)',
              'Ambition for gold and lust for political power',
              'Rest and endless child games',
              'Eloquence in speech and physical speed'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Абай біреуі тән құмары (ішсем, жесем), екіншісі жан құмары (білсем, көрсем, үйренсем) деп атайды.',
            ru: 'Абай прямо разделяет потребности на плотские (пища, сон) и духовные (жажда познания «Что это? Почему так?»).',
            en: 'Abai clearly distinguishes the physical bodily needs from the soul’s relentless inquiry and thirst for learning.'
          }
        },
        {
          id: 'abai_q3',
          type: 'detail_memory',
          question: {
            kk: '«Отыз бірінші сөзде» естіген нәрсені ұмытпау үшін неше шарт аталады?',
            ru: 'В «Слове тридцать первом» сколько условий хорошей памяти называет мыслитель?',
            en: 'In "Word Thirty-One", how many conditions does Abai describe for retaining knowledge without forgetting?'
          },
          options: {
            kk: ['Екі шарт', 'Үш шарт', 'Төрт шарт', 'Жеті шарт'],
            ru: ['Два условия', 'Три условия', 'Четыре условия', 'Семь условий'],
            en: ['Two conditions', 'Three conditions', 'Four conditions', 'Seven conditions']
          },
          correctIndex: 2,
          explanation: {
            kk: 'Мәтінде: «Естіген нәрсені ұмытпастыққа төрт түрлі себеп бар» деп нақты көрсетілген.',
            ru: 'В тексте сказано: «Чтобы запомнить услышанное и не растерять знания, необходимы четыре условия».',
            en: 'The text explicitly states: "There are four conditions necessary to retain what has been heard and never forget it."'
          }
        },
        {
          id: 'abai_q4',
          type: 'quote_memory',
          question: {
            kk: 'Абайдың айтуынша, ақыл мен білімді «құмға құйған судай» жоқ қылатын ой кеселдері қандай?',
            ru: 'Что Абай называет «болезнями мысли», из-за которых знание уходит, как «вода в сухой песок»?',
            en: 'What does Abai label as "illnesses of the mind" that cause wisdom to evaporate like "water in desert sand"?'
          },
          options: {
            kk: [
              'Кітаптың аздығы мен уақыттың тапшылығы',
              'Салғырттық, бойкүйездік, уайымсыздық, бос күлкі',
              'Қартаю мен көздің нашарлауы',
              'Тіл білмеу мен сапарға шықпау'
            ],
            ru: [
              'Нехватка книг и дефицит времени',
              'Беспечность, лень, праздность и легкомыслие',
              'Физическое старение и слабое зрение',
              'Незнание иностранных языков'
            ],
            en: [
              'Shortage of scrolls and lack of free time',
              'Carelessness, indolence, frivolity, and vain distractions',
              'Bodily aging and declining eyesight',
              'Lack of foreign language training'
            ]
          },
          correctIndex: 1,
          explanation: {
            kk: 'Ой кеселдеріне Абай салғырттық, бойкүйездік пен бос күлкіні жатқызады.',
            ru: 'Абай причисляет к недугам мысли лень, беззаботность, пустые развлечения и беспечность.',
            en: 'Abai warns that laziness, careless distraction, and empty laughter dissolve any gathered knowledge.'
          }
        }
      ],
      openQuestion: {
        id: 'abai_open',
        prompt: {
          kk: 'Абайдың жастарға және оқырманға айтқан ең басты өсиеті мен насихаты неде? Өз ойыңызбен 2-3 сөйлеммен түсіндіріңіз.',
          ru: 'В чём главный нравственный наказ Абая для читателя и будущего поколения? Напишите своими словами.',
          en: 'What is the primary moral message and edification Abai offers to future generations? Explain in your own words.'
        },
        keyThemes: {
          kk: ['ғылым', 'білім', 'ақыл', 'еңбек', 'ар-ұят', 'жан құмары', 'есте сақтау'],
          ru: ['знания', 'наука', 'разум', 'душа', 'совесть', 'труд', 'память', 'просвещение'],
          en: ['knowledge', 'science', 'soul', 'virtue', 'conscience', 'labor', 'memory', 'wisdom']
        },
        sampleAnswer: {
          kk: 'Абай адамды өмір бойы білім мен ғылымға ұмтылуға, ар-ұятты сақтауға, тән ләззатынан гөрі жан құмарын (танымды) жоғары қоюға үндейді.',
          ru: 'Главный наказ Абая — непрерывное стремление к знаниям, развитие разума и совести, а также преобладание духовных поисков над материальной выгодой.',
          en: 'Abai urges humans to pursue knowledge unceasingly, cultivate steadfast moral conscience, and elevate the soul’s hunger for wisdom above fleeting bodily vanity.'
        }
      }
    }
  },
  {
    id: 'little-prince',
    title: {
      kk: 'Кішкентай ханзада',
      ru: 'Маленький принц',
      en: 'The Little Prince'
    },
    author: {
      kk: 'Антуан де Сент-Экзюпери',
      ru: 'Антуан де Сент-Экзюпери',
      en: 'Antoine de Saint-Exupéry'
    },
    year: 1943,
    genre: {
      kk: 'Ертегі, Философия',
      ru: 'Аллегория, Сказка',
      en: 'Philosophical Tale'
    },
    level: 'beginner',
    coverImage: '/src/assets/images/book_little_prince_1790149461291.jpg',
    estimatedReadMinutes: 7,
    tags: {
      kk: ['Достық', 'Махаббат', 'Раушан гүл', 'Түлкі'],
      ru: ['Дружба', 'Любовь', 'Роза', 'Лис'],
      en: ['Friendship', 'Love', 'Rose', 'The Fox']
    },
    synopsis: {
      kk: 'Өзге ғаламшардан келген алтын шашты баланың достық, жауапкершілік және нағыз құндылықтар туралы жүрекке жылы тиетін ертегісі.',
      ru: 'Трогательная философская повесть-притча о дружбе, верности, ответственности за тех, кого приручили, и видении сердцем.',
      en: 'A timeless poetic novella exploring friendship, devotion, responsibility, and the profound truth that what is essential is invisible to the eye.'
    },
    chapters: [
      {
        id: 'lp_c1',
        title: {
          kk: '1-тарау: Сахара шөліндегі кездесу',
          ru: 'Глава 1: Встреча в пустыне Сахара',
          en: 'Chapter 1: Meeting in the Sahara Desert'
        },
        content: {
          kk: `Алты жасымда бір керемет сурет көрген едім. Онда алып жыланның аңды тұтастай жұтып жатқаны бейнеленіпті. Мен де қарындаш алып, өзімнің алғашқы суретімді салдым. Оны үлкендерге көрсетіп: «Бұл суреттен қорықпайсыңдар ма?» деп сұрадым.
Үлкендер маған: «Қалпақтан несіне қорқамыз?» деді.
Ал ол қалпақ емес, пілді жұтып қойған айдаһар болатын! Үлкендер түсінбеген соң, мен оның ішкі жағын салып бердім. Сонда үлкендер маған сурет салуды қойып, география мен арифметикаға ден қоюға кеңес берді.

Осылайша мен ұшқыш болдым. Дүниені көп шарладым. Бір күні ұшағымның қозғалтқышы бұзылып, Сахара шөліне амалсыз қондым. Жалғыз қалдым, ауыз суым бір аптаға ғана жететін.

Таңертең ерте бейтаныс нәзік дауыс мені оятты:
— Өтінемін... маған бір қозы салып беріңізші!
— Не?
— Маған қозы салып беріңізші...

Орнымнан қарғып тұрып көзімді уқаладым. Қарсы алдымда ерекше, алтын шашты кішкентай бала маған байыппен қарап тұр екен. Ол шөлде адасқан немесе шөлдеп шаршаған балаға мүлде ұқсамайтын. Бұл — менің Кішкентай ханзадамен алғашқы жүздесуім еді. Мен оған қозының орнына қорап салып бердім: «Сен сұраған қозы осы қораптың ішінде», – дедім. Баланың жүзіне күлкі үйіріліп: «Міне, дәл мен қалаған қозы осы!» деп қуанды.`,
          ru: `Когда мне было шесть лет, я увидел в книге картинку: удав глотал хищного зверя. Я нарисовал свой первый рисунок и показал его взрослым, спросив, не страшно ли им.
Они ответили: «Разве шляпа страшная?»
Но это была не шляпа, а удав, проглотивший слона! Взрослые никогда ничего не понимают сами, и детям приходится бесконечно им всё объяснять. Они посоветовали мне бросить рисование и заняться географией, историей и арифметикой.

Я вырос и стал летчиком. Облетел почти весь свет. И вот однажды мой самолет потерпел аварию над Сахарой. Что-то сломалось в моторе. Я остался один на один с песками, воды у меня оставалось едва на неделю.

На рассвете меня разбудил тоненький голосок:
— Пожалуйста... нарисуй мне барашка!
— Что?!
— Нарисуй мне барашка...

Я вскочил, протер глаза. Передо мной стоял удивительный светловолосый мальчуган. Он не казался испуганным, голодным или заблудившимся. Так я познакомился с Маленьким принцем. Я долго не мог нарисовать нужного барашка, и в отчаянии набросал простой ящик с тремя отверстиями: «Вот тебе ящик. А барашек, которого ты просишь, сидит внутри». И лицо малыша озарилось: «Вот именно такого я и хотел!»`,
          en: `Once when I was six years old, I saw a picture of a boa constrictor swallowing an animal whole. Inspired, I drew my first masterpiece and showed it to grown-ups, asking if it frightened them.
They replied: "Why should anyone be frightened by a hat?"
My drawing was not of a hat; it was a boa constrictor digesting an elephant. Grown-ups never understand anything by themselves, and it is tiresome for children always and forever to be explaining things to them.

So I chose another profession and learned to pilot airplanes. I flew all over the world. Then, one day, something broke in my engine over the Sahara Desert. I was stranded a thousand miles from any inhabited region, with barely eight days of drinking water left.

At dawn, a tiny, extraordinary voice woke me:
"Please... draw me a sheep!"
"What?!"
"Draw me a sheep..."

I leaped to my feet, rubbing my eyes. Before me stood an enchanting little boy with golden hair. He did not seem lost, nor dying of thirst. In the end, out of patience to fix my motor, I sketched a simple wooden crate with three airholes: "This is only his box. The sheep you asked for is inside." To my astonishment, his face beamed: "That is exactly the way I wanted it!"`
        }
      },
      {
        id: 'lp_c2',
        title: {
          kk: '2-тарау: Раушан гүл және Түлкінің құпиясы',
          ru: 'Глава 2: Роза и тайна Лиса',
          en: 'Chapter 2: The Rose and the Fox’s Secret'
        },
        content: {
          kk: `Ханзада өз ғаламшарында бір ғана гүлді сүйетін еді. Ол гүл тым тәкаппар, әрі өзінің төрт тікеніне ғана сенетін сұлу қызыл раушан болатын. Ханзада оны суарып, түні бойы шыны қақпақпен желден қорғады. Бірақ Жерге келіп, мыңдаған раушан гүлдері толып тұрған бақты көргенде, ол жылап жіберді: оның гүлі өзін ғаламдағы жалғыз гүлмін деп мақтанған еді ғой.

Сол сәтте Түлкі пайда болды.
— Маған қосылып ойна, менің көңілім мұңды, — деді ханзада.
— Мен сенімен ойнай алмаймын, өйткені мен әлі бауыр баспағанмын, — деді Түлкі.
— «Бауыр басу» деген не?
— Ол — байланыс орнату, үйренісу деген сөз. Қазір сен мен үшін жүз мыңдаған өзге балалар сияқты қарапайым баласың, сен маған аса керек те емессің. Мен де сен үшін жай бір түлкімін. Бірақ егер сен мені баурап алсаң, біз бір-бірімізге дүниедегі ең жақын дос боламыз. Сен маған бүкіл әлемде жалғыз боласың, мен де саған жалғыз боламын.

Ханзада Түлкімен дос болды. Ал қоштасар сәтте Түлкі оған мәңгілік ұлы құпиясын сыйлады:
— Міне, менің құпия сырым, ол өте қарапайым: Жүрекпен ғана анық көруге болады. Ең маңызды, ең асыл нәрсе көзбен көрінбейді. Сенің раушаныңды соншалықты қымбат еткен — оған жұмсаған өз уақытың. Сен өзің бауыр басқан жанға әрқашан жауаптысың.`,
          ru: `На своей крошечной планете принц нежно лелеял розу. Она была прекрасна, но капризна и горделива, хвастаясь четырьмя шипами против тигров. Принц поливал ее родниковой водой и укрывал стеклянным колпаком от сквозняков. Но когда на Земле он увидел сад, полный цветущих роз, он упал в траву и заплакал: его роза уверяла его, будто она единственная во всей вселенной.

И тут появился Лис.
— Поиграй со мной, мне так грустно, — попросил Маленький принц.
— Не могу, я не приручен, — ответил Лис.
— А что значит «приручить»?
— Это забытое понятие. Оно означает: создать узы. Сейчас ты для меня всего лишь мальчик, точно такой же, как сто тысяч других мальчиков. И я тебе не нужен. Но если ты меня приручишь, мы станем нужны друг другу. Ты будешь для меня единственным на всем белом свете, и я буду для тебя один на всем свете.

И они подружились. А в час прощания Лис открыл принцу простую истину:
— Вот мой секрет, он очень прост: зорко одно лишь сердце. Самого главного глазами не увидишь. Твоя роза так дорога тебе потому, что ты отдал ей всю свою душу и всё свое время. Ты навсегда в ответе за всех, кого приручил.`,
          en: `On his tiny asteroid B-612, the prince loved a flower. She was breathtakingly beautiful, yet proud and dramatic, relying on her four thorns against the world. The prince watered her diligently and shielded her from drafts with a glass globe. But when he arrived on Earth and encountered an entire garden brimming with five thousand identical roses, he wept: his flower had assured him she was unique in all creation.

It was then that the Fox appeared.
"Come play with me, I am so sorrowful," said the Little Prince.
"I cannot play with you," said the Fox. "I am not tamed."
"What does 'tamed' mean?"
"It is an act too often neglected," said the Fox. "It means to establish ties. To me, you are still nothing more than a little boy who is just like a hundred thousand other little boys. And I have no need of you. But if you tame me, then we shall need each other. To me, you will be unique in all the world. To you, I shall be unique in all the world."

And so the prince tamed the Fox. When the hour of departure drew near, the Fox gave him a parting gift:
"Here is my secret, very simple: It is only with the heart that one can see rightly; what is essential is invisible to the eye. It is the time you have wasted on your rose that makes your rose so important. You become responsible, forever, for what you have tamed."`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'lp_q1',
          type: 'multiple_choice',
          question: {
            kk: 'Кішкентай ханзада Сахара шөлінде автордан ең алдымен нені салып беруді сұрады?',
            ru: 'О чем первым делом попросил Маленький принц летчика в Сахаре?',
            en: 'What did the Little Prince first ask the stranded pilot to draw in the Sahara Desert?'
          },
          options: {
            kk: ['Ұшақ салып беруді', 'Қозы салып беруді', 'Раушан гүлін салып беруді', 'Айдаһар салып беруді'],
            ru: ['Нарисовать самолет', 'Нарисовать барашка', 'Нарисовать куст розы', 'Нарисовать удава'],
            en: ['Draw an airplane', 'Draw a sheep', 'Draw a rose', 'Draw a boa constrictor']
          },
          correctIndex: 1,
          explanation: {
            kk: 'Кішкентай ханзада ұйқыдан оятып: «Маған бір қозы салып беріңізші!» деп өтінді.',
            ru: 'Малыш разбудил летчика словами: «Пожалуйста... нарисуй мне барашка!».',
            en: 'The Little Prince woke the pilot at dawn saying: "Please... draw me a sheep!"'
          }
        },
        {
          id: 'lp_q2',
          type: 'quote_memory',
          question: {
            kk: 'Түлкі ханзадаға сыйлаған ұлы құпия қандай сөздермен айтылады?',
            ru: 'Какую главную тайну открыл Лис Маленькому принцу на прощание?',
            en: 'What iconic secret did the Fox share with the Little Prince as a farewell gift?'
          },
          options: {
            kk: [
              '«Ең басты нәрсе – көп ақша мен атақ табу»',
              '«Жүрекпен ғана анық көруге болады. Ең маңызды нәрсе көзбен көрінбейді»',
              '«Ешкімге сенбе, жалғыз жүрген жақсы»',
              '«Үлкендер әрқашан балалардан ақылды»'
            ],
            ru: [
              '«Самое главное в жизни — иметь много денег и власти»',
              '«Зорко одно лишь сердце. Самого главного глазами не увидишь»',
              '«Никогда никого к себе не подпускай близко»',
              '«Взрослые всегда правы во всех делах»'
            ],
            en: [
              '"The only important thing is to gather coins and crowns"',
              '"It is only with the heart that one can see rightly; what is essential is invisible to the eye"',
              '"Never trust any beast you meet along your road"',
              '"Grown-ups possess deeper wisdom in all things"'
            ]
          },
          correctIndex: 1,
          explanation: {
            kk: 'Түлкінің сөзі: «Жүрекпен ғана анық көруге болады. Ең маңызды нәрсе көзбен көрінбейді».',
            ru: 'Знаменитый завет Лиса: «Зорко одно лишь сердце. Самого главного глазами не увидишь».',
            en: 'The Fox reveals that heart-sight is the true sight, and essence cannot be seen with physical eyes.'
          }
        },
        {
          id: 'lp_q3',
          type: 'detail_memory',
          question: {
            kk: 'Түлкінің айтуынша, ханзаданың раушаны неліктен мыңдаған өзге гүлдерден ерекше және қымбат болды?',
            ru: 'Почему роза Маленького принца оказалась дороже тысяч других роз в саду?',
            en: 'Why was the prince’s rose so much more precious to him than five thousand identical flowers in the garden?'
          },
          options: {
            kk: [
              'Өйткені ол алтыннан жасалған еді',
              'Өйткені ол оған өз уақыты мен жан жылуын жұмсап, бауыр басқан еді',
              'Өйткені оның тікені өзге гүлдерден ұзын болды',
              'Өйткені ол қыста да тоңбайтын еді'
            ],
            ru: [
              'Потому что она была сделана из чистого золота',
              'Потому что он отдал ей свое время, душу и приручил ее заботой',
              'Потому что у нее было двадцать шипов вместо четырех',
              'Потому что она никогда не увядала'
            ],
            en: [
              'Because she was forged of pure gold',
              'Because he devoted his time and love to her, watering and caring for her',
              'Because her thorns were sharp enough to fell a tiger',
              'Because she blossomed through frost without light'
            ]
          },
          correctIndex: 1,
          explanation: {
            kk: 'Түлкі: «Сенің раушаныңды соншалықты қымбат еткен — оған жұмсаған өз уақытың» деп үйретеді.',
            ru: 'Лис поясняет: «Твоя роза так дорога тебе потому, что ты отдал ей всю свою душу и время».',
            en: 'The Fox explains: "It is the time you have wasted on your rose that makes your rose so important."'
          }
        },
        {
          id: 'lp_q4',
          type: 'character_action',
          question: {
            kk: 'Автор бала кезінде бірінші суретіне нені салып еді, ал үлкендер оны не деп ойлады?',
            ru: 'Что изобразил автор в детстве на своем первом рисунке, и что в нем увидели взрослые?',
            en: 'What did the narrator draw as a six-year-old child, and what did grown-ups mistake it for?'
          },
          options: {
            kk: [
              'Пілді жұтқан айдаһарды салған, бірақ үлкендер қалпақ деп ойлады',
              'Қораптағы қозыны салған, бірақ үлкендер үңгір деп ойлады',
              'Ағашты салған, бірақ үлкендер гүл деді',
              'Ұшақты салған, бірақ құс деді'
            ],
            ru: [
              'Удава, проглотившего слона, но взрослые решили, что это обычная шляпа',
              'Барашка в ящике, но взрослые посчитали это сундуком',
              'Дерево баобаб, но взрослые увидели гриб',
              'Самолет, но взрослые приняли его за птицу'
            ],
            en: [
              'A boa constrictor digesting an elephant, but grown-ups saw a mere hat',
              'A sheep in a crate, but grown-ups saw a chest',
              'A baobab tree, but grown-ups saw a mushroom',
              'An airplane, but grown-ups saw a seagull'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Автор пілді жұтқан алып жыланды салды, бірақ үлкендер оны «жай қалпақ» деді.',
            ru: 'Взрослые приняли рисунок удава, переваривающего слона, за обыкновенную шляпу.',
            en: 'Grown-ups mistook the shape of the elephant inside the snake for a gentleman’s brimmed hat.'
          }
        }
      ],
      openQuestion: {
        id: 'lp_open',
        prompt: {
          kk: '«Сен өзің бауыр басқан жанға әрқашан жауаптысың» деген сөзді қалай түсінесіз? Достық пен жауапкершілік туралы өз ойыңызды жазыңыз.',
          ru: 'Как вы понимаете мысль: «Ты навсегда в ответе за всех, кого приручил»? Поделитесь своими размышлениями о дружбе и верности.',
          en: 'How do you understand the Fox’s maxim: "You become responsible, forever, for what you have tamed"? Share your reflection.'
        },
        keyThemes: {
          kk: ['достық', 'жауапкершілік', 'жүрек', 'сенім', 'уақыт', 'қамқорлық'],
          ru: ['дружба', 'ответственность', 'забота', 'сердце', 'верность', 'доверие', 'время'],
          en: ['friendship', 'responsibility', 'care', 'heart', 'loyalty', 'trust', 'love']
        },
        sampleAnswer: {
          kk: 'Біреумен дос болып, оның сеніміне кірген соң, оған қамқорлық таныту, қиын сәтте тастап кетпеу — әр адамның рухани борышы мен жауапкершілігі.',
          ru: 'Приручить — значит создать искреннюю душевную связь. Человек обязан беречь тех, кто доверился ему, и отвечать за их чувства и благополучие.',
          en: 'To tame someone is to forge an emotional bond of mutual vulnerability and trust; one must honor that bond through lifelong care, empathy, and loyalty.'
        }
      }
    }
  },
  {
    id: 'sherlock-holmes',
    title: {
      kk: 'Богемиядағы жанжал',
      ru: 'Скандал в Богемии',
      en: 'A Scandal in Bohemia'
    },
    author: {
      kk: 'Артур Конан Дойл',
      ru: 'Артур Конан Дойл',
      en: 'Arthur Conan Doyle'
    },
    year: 1891,
    genre: {
      kk: 'Детектив, Классика',
      ru: 'Детектив, Классика',
      en: 'Detective Mystery'
    },
    level: 'intermediate',
    coverImage: '/src/assets/images/book_sherlock_holmes_1790149472353.jpg',
    estimatedReadMinutes: 9,
    tags: {
      kk: ['Шерлок Холмс', 'Ирэн Адлер', 'Детектив', 'Бейкер-стрит'],
      ru: ['Шерлок Холмс', 'Ирен Адлер', 'Бейкер-стрит', 'Расследование'],
      en: ['Sherlock Holmes', 'Irene Adler', 'Baker Street', 'Mystery']
    },
    synopsis: {
      kk: 'Шерлок Холмсты өмірінде бір-ақ рет айласымен таңғалдырған жалғыз әйел — дарынды әнші әрі актриса Ирэн Адлер жайындағы әйгілі оқиға.',
      ru: 'Легендарное дело великого сыщика Шерлока Холмса, где единственная женщина сумела разгадать его замысел и превзойти его в проницательности.',
      en: 'The renowned case where Sherlock Holmes is matched and outwitted by the woman who forever held his intellectual admiration: Irene Adler.'
    },
    chapters: [
      {
        id: 'sh_c1',
        title: {
          kk: '1-тарау: Бейкер-стриттегі құпия қонақ',
          ru: 'Глава 1: Таинственный визитер на Бейкер-стрит',
          en: 'Chapter 1: The Royal Visitor on Baker Street'
        },
        content: {
          kk: `Шерлок Холмс үшін ол әрқашан «Ол әйел» болып қалды. Мен оның осы әйелге қатысты басқа сөз айтқанын өте сирек естігенмін. Холмстың көзқарасында Ирэн Адлер бүкіл әйел затының биігінде тұрды.

Бір күні кешке Бейкер-стриттегі 221-Б пәтерімізге бетперде киген, бойы сұңғақ әрі сымбатты мырза келді. Ол өзін граф фон Крамм деп таныстырғанымен, Холмс бірден оның Богемияның тақ мұрагері король екенін айтып, маскасын шешуді ұсынды.

Корольдің басына үлкен қауіп төнген еді: жақын күндері ол Скандинавия королінің қызына үйленбекші. Бірақ бұрын оның америкалық контральто әншісі Ирэн Адлермен байланысы болған. Ирэннің қолында екеуі бірге түскен компромат фотосурет бар. Егер ол сурет қалыңдықтың отбасына жетсе, неке бұзылады. Король үйді тінтуге ұрылар жалдаса да, фотосурет табылмаған.

— Менің мақсатым сол суретті табу, — деді король.
— Ал суреттің өлшемі қандай? — деп сұрады Холмс.
— Кабинеттік форматта, сондықтан оны әйел адам үнемі өзімен бірге алып жүре алмайды.
— Өте жақсы, — деді Холмс мырс етіп. — Мен бұл істі қолға аламын.`,
          ru: `Для Шерлока Холмса она навсегда осталась «Этой Женщиной». Я редко слышал, чтобы он называл ее иначе. В его глазах она затмила и превзошла всех представительниц своего пола.

Однажды мартовским вечером в гостиную дома 221-б по Бейкер-стрит вошел рослый джентльмен в черной маске. Он назвался графом фон Краммом, но Холмс с первого же взгляда разоблачил гостя: перед нами стоял сам наследный король Богемии.

Монарх оказался в отчаянном положении: он готовился к браку со скандинавской принцессой, однако его прошлая возлюбленная, оперная примадонна Ирен Адлер, угрожала отправить будущим родственникам их совместную кабинетную фотографию. Король нанимал грабителей, дважды обыскивал ее дом и багаж — снимок словно сквозь землю провалился.

— Мой брак расстроится, если фото станет известно, — сокрушался венценосный гость.
— Каков размер карточки? — уточнил Холмс.
— Большой кабинетный портрет. Женщина не сможет носить его в ридикюле.
— Превосходно, — холодно улыбнулся сыщик. — Оставьте это мне, Ваше Величество.`,
          en: `To Sherlock Holmes she is always *the* woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.

One evening, a tall, powerfully built visitor wearing a black vizard mask called at 221B Baker Street, introducing himself as Count von Kramm. Holmes, without a moment’s hesitation, addressed him by his true title: the hereditary King of Bohemia.

The King confessed his grave dilemma. He was betrothed to a young Scandinavian princess of strict sensibilities. However, years earlier, he had known Irene Adler, the well-known American contralto singer. She possessed a cabinet photograph of them together and threatened to send it to the royal family on the announcement of the betrothal. The King had hired burglars and waylaid her carriage twice, but the picture could not be discovered.

"What is the size of the photograph?" inquired Holmes.
"A cabinet size. Too large for easy carriage upon her person."
"Very good," said Holmes with a keen spark in his grey eyes. "Leave the matter with me."`
        }
      },
      {
        id: 'sh_c2',
        title: {
          kk: '2-тарау: Түтін шашкасы және құпия жасырынған орын',
          ru: 'Глава 2: Дымовая ракета и тайник',
          en: 'Chapter 2: The Smoke Rocket and the Secret Cache'
        },
        content: {
          kk: `Келесі күні Холмс қарт діни қызметкер кейпіне еніп, Ирэн Адлердің үйінің алдына барды. Күймеден түскен Ирэнге бұзақылар тиіскендей көрініс жасалып, Холмс көмекке ұмтылып, жерге құлап жарақат алғандай сыңай танытты. Жанашыр Ирэн жаралы «пасторды» өз қонақ бөлмесіне кіргізуді бұйырды.

Холмстың белгісі бойынша, мен ашық терезеден арнайы түтін шығаратын шашканы бөлмеге лақтырып: «Өрт! Өрт!» деп айқай салдым.
Көшедегі адамдар да «Өрт!» деп шулады.

Бөлме түтінге толған сол сәтте Ирэн Адлер не істеді? Әйел адамдар үйден өрт шыққанда ең қымбат бағалайтын затына қарай жүгіреді. Ирэн бөлменің түкпіріндегі қоңырау шнурының қасындағы жылжымалы тақташаға ұмтылып, жасырынған суретті қолына алуға тырысты. Бұл Холмсқа жеткілікті еді!

Алайда, келесі таңда біз корольмен бірге үйге кіргенде, Ирэннің түнде күйеуімен бірге Англиядан кетіп қалғанын білдік. Жасырынған орында тек бір ғана сурет — Ирэннің жеке портреті және Холмсқа жазған хаты қалған екен. Хатта ол Холмстың айласын түсініп, оны ер адам киімінде Бейкер-стритке дейін бақылап барғанын, ал корольге фотосурет ешқашан жарияланбайтынын уәде еткен. Холмс корольдің ұсынған алтын жүзігінен бас тартып, марапат ретінде Ирэннің сол қалдырған жалғыз суретін ғана сұрап алды.`,
          ru: `На следующий день Холмс переоделся благообразным пожилым священником. Когда экипаж Ирен Адлер подъехал к дому, подставные бродяги инсценировали драку. Сыщик бросился на защиту дамы и рухнул на мостовую с окровавленным лицом. Благородная женщина приказала внести раненого пастора в свою гостиную.

По условленному сигналу я метнул в открытое окно дымовую ракету и закричал: «Пожар! Пожар!». Улица тут же подхватила панический клич.

В критический миг смертельной опасности женщина инстинктивно бросается спасать самое дорогое сокровище. Ирен молнией метнулась к потайной деревянной панели над шнуром звонка и приоткрыла тайник, где покоилась злополучная карточка. Холмс увидел всё, что ему требовалось!

Однако на рассвете, когда мы с королем пришли изъять улику, дом оказался пуст. Ирен с новоиспеченным супругом тайно отплыла на континент. В пустом тайнике лежало письмо для Шерлока Холмса и ее собственная великолепная фотография. Она писала, что заподозрила неладное, проследила за мнимым пастором до порога дома 221-б в мужском костюме и переиграла его. Король был спасен, а Холмс отказался от золотого перстня с изумрудом, попросив у монарха лишь один трофей на память — портрет Ирен Адлер.`,
          en: `The following day, disguised as an amiable, aged nonconformist clergyman, Holmes orchestrated a staged scuffle outside Irene Adler’s villa. Rushing to shield her from the ruffians, he fell dramatically to the pavement, bathed in theatrical crimson blood. In natural compassion, she had the injured clergyman carried into her drawing room.

At Holmes’s precise signal, I hurled a plumber’s smoke rocket through the open window and shouted: "Fire! Fire!" The cry echoed down the street.

When a woman fears fire, she dashes by instinct to that which is dearest to her soul. Irene darted without hesitation toward a small secret panel just above the bell-rope, tearing back the sliding woodwork to snatch her treasure. Holmes had observed every fraction of the cache!

Yet when we returned next morning with the King, the bird had flown. Irene had crossed the Channel that very night with her new husband, leaving behind a letter for Sherlock Holmes and a portrait of herself in evening dress. She had detected the trick, tailed the clergyman back to Baker Street disguised in an ulster coat, and gracefully bowed out, promising never to harm the King. Holmes refused the monarch's emerald ring, requesting only Irene Adler’s photograph as his sole honorarium.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'sh_q1',
          type: 'character_action',
          question: {
            kk: 'Холмс Ирэн Адлердің үйіне кіру үшін қандай адам кейпіне еніп киінді?',
            ru: 'В кого переоделся Шерлок Холмс, чтобы проникнуть в гостиную Ирен Адлер?',
            en: 'What disguise did Sherlock Holmes adopt in order to gain entry to Irene Adler’s drawing room?'
          },
          options: {
            kk: ['Қарт діни қызметкер (пастор)', 'Күйме жүргізушісі', 'Полиция офицері', 'Богемия королі'],
            ru: ['Пожилой священник (пастор)', 'Кучер кэба', 'Полицейский инспектор', 'Богемский дворянин'],
            en: ['An elderly clergyman (pastor)', 'A cab driver', 'A Scotland Yard inspector', 'A bohemian nobleman']
          },
          correctIndex: 0,
          explanation: {
            kk: 'Холмс рақымшыл қарт пастор кейпіне еніп, жараланған болып үйге кірді.',
            ru: 'Холмс надел одеяние благообразного священника и сымитировал ранение.',
            en: 'Holmes disguised himself as a venerable clergyman and faked an injury to be carried indoors.'
          }
        },
        {
          id: 'sh_q2',
          type: 'detail_memory',
          question: {
            kk: 'Холмс пен Ватсон Ирэннің суретті жасырған жерін қалай анықтады?',
            ru: 'Каким трюком сыщик заставил Ирен выдать местоположение тайника с фотографией?',
            en: 'By what psychological stratagem did Holmes force Irene to reveal the secret hiding place of the photograph?'
          },
          options: {
            kk: [
              'Терезеден түтін шашкасын лақтырып, жалған өрт дабылын көтеру арқылы',
              'Үйдің барлық бөлмелерін күшпен тінтіп шығу арқылы',
              'Қызметшіні параға сатып алу арқылы',
              'Корольдің жеке келіссөз жүргізуі арқылы'
            ],
            ru: [
              'Бросили дымовую ракету и сымитировали тревогу пожара',
              'Обыскали дом силами королевской стражи',
              'Подкупили горничную крупной суммой',
              'Наняли грабителей с отмычками'
            ],
            en: [
              'Hurled a smoke rocket through the window and raised a panic of "Fire!"',
              'Conducted an armed police raid through the house',
              'Bribed the maid with gold sovereigns',
              'Demanded the key under royal decree'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Өрт қаупі туғанда әйел адам ең қымбат затына қарай жүгіреді деген психологиялық тәсіл қолданылды.',
            ru: 'При ложной тревоге о пожаре Ирен бросилась к тайнику над шнуром звонка, чтобы спасти снимок.',
            en: 'Holmes relied on the instinct that in a fire, a person rushes to protect their most vital secret.'
          }
        },
        {
          id: 'sh_q3',
          type: 'character_action',
          question: {
            kk: 'Холмс корольдің қымбат алтын жүзігінен бас тартып, марапат ретінде не сұрады?',
            ru: 'От какого вознаграждения отказался Холмс, попросив вместо него лишь одну вещь?',
            en: 'What did Holmes decline, choosing instead Irene Adler’s portrait as his sole reward?'
          },
          options: {
            kk: [
              'Король ұсынған алтын жүзіктен бас тартып, Ирэн Адлердің фотосуретін сұрады',
              'Үлкен ақшалай сыйақыдан бас тартып, ат сұрады',
              'Богемиядағы сарайдан бас тартып, кітап сұрады',
              'Жаңа ұшақ сұрады'
            ],
            ru: [
              'Отказался от изумрудного перстня короля, попросив фотопортрет Ирен Адлер',
              'Отказался от золотого мешка, попросив королевский экипаж',
              'Отказался от титула графа, попросив старинную трубку',
              'Попросил орден подвязки'
            ],
            en: [
              'Refused the King’s emerald ring, requesting Irene Adler’s photograph instead',
              'Refused a chest of gold, asking for a royal carriage',
              'Refused an earldom, asking for an antique pipe',
              'Asked for a diplomatic passport'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Холмс корольдің изумруд жүзігінен бас тартып, Ирэннің портретін естелікке қалдырды.',
            ru: 'Сыщик отклонил драгоценный перстень монарха, оставив себе карточку Ирен Адлер.',
            en: 'Holmes declined the King’s emerald ring, retaining only the photograph of Irene Adler.'
          }
        }
      ],
      openQuestion: {
        id: 'sh_open',
        prompt: {
          kk: 'Неліктен Ирэн Адлер Шерлок Холмстың көзқарасында «ерекше әйел» ретінде қалды? Ол детективті қалай жеңді?',
          ru: 'Почему Ирен Адлер навсегда осталась в памяти Шерлока Холмса как исключительная личность? Как ей удалось его опередить?',
          en: 'Why did Irene Adler forever hold a singular place in Sherlock Holmes’s intellect? How did she outmaneuver him?'
        },
        keyThemes: {
          kk: ['ақыл', 'айла', 'байқампаздық', 'ерлер киімі', 'құрмет', 'жеңіс'],
          ru: ['ум', 'проницательность', 'мужской костюм', 'хитрость', 'уважение', 'слежка', 'опередила'],
          en: ['intellect', 'wits', 'disguise', 'outsmarted', 'respect', 'cleverness']
        },
        sampleAnswer: {
          kk: 'Ирэн Адлер Холмстың өрт туралы айласын түсініп, оны ер адам киімінде Бейкер-стритке дейін өзі аңдып, Холмсты ақылымен сан соқтырған жалғыз әйел болды.',
          ru: 'Ирен Адлер проявила блестящую проницательность: раскрыла замысел с фальшивым пожаром, переоделась мужчиной, выследила Холмса и благополучно уехала, сохранив свое достоинство.',
          en: 'Irene Adler deciphered the smoke deception, trailed the detective in male disguise to his very doorstep, and proved that feminine wit could gracefully match the greatest deductive mind.'
        }
      }
    }
  },
  {
    id: 'animal-farm',
    title: {
      kk: 'Жануарлар қорасы',
      ru: 'Скотный двор',
      en: 'Animal Farm'
    },
    author: {
      kk: 'Джордж Оруэлл',
      ru: 'Джордж Оруэлл',
      en: 'George Orwell'
    },
    year: 1945,
    genre: {
      kk: 'Аллегория, Сатира',
      ru: 'Сатира, Притча',
      en: 'Satirical Allegory'
    },
    level: 'advanced',
    coverImage: '/src/assets/images/book_animal_farm_1790149482950.jpg',
    estimatedReadMinutes: 8,
    tags: {
      kk: ['Еркіндік', 'Теңдік', 'Саясат', 'Боксер'],
      ru: ['Свобода', 'Равенство', 'Заповеди', 'Боксер'],
      en: ['Freedom', 'Equality', 'Commandments', 'Boxer']
    },
    synopsis: {
      kk: 'Адамдардың қанауынан құтылып, теңдік қоғамын құрмақ болған ферма жануарларының билік пен өтірікке бой алдыруы туралы әлемге әйгілі сатира.',
      ru: 'Культовая притча-антиутопия о том, как благородная мечта о свободе и равенстве превращается в жестокую диктатуру и манипуляцию.',
      en: 'A world-famous allegorical fable depicting how an idealistic uprising for freedom and equality descends into authoritarian tyranny.'
    },
    chapters: [
      {
        id: 'af_c1',
        title: {
          kk: '1-тарау: Қарт Майордың түсі және Жеті өсиет',
          ru: 'Глава 1: Сон Старого Майора и Семь Заповедей',
          en: 'Chapter 1: Old Major’s Dream and the Seven Commandments'
        },
        content: {
          kk: `Ферма иесі мистер Джонс ұйықтауға кеткенде, қорадағы барлық жануарлар үлкен сарайға жиналды. Құрметті кәрі доңыз Қарт Майор оларға өзінің көрген түсін айтып берді.

— Жолдастар! — деді ол. — Біздің өміріміз неге соншалықты ауыр? Себебі адам біздің барлық еңбегімізді ұрлайды! Адам — ештеңе өндірмей, тек басқаның еңбегін жейтін жалғыз мақұлық. Біз осы қанаудан құтылсақ, барлығымыз еркін және тең боламыз! Барлық жануарлар — туыс!

Көп ұзамай жануарлар көтеріліс жасап, қатыгез Джонсты қуып шықты. Ферма атауы «Жануарлар қорасы» болып өзгерді. Шошқалар жазуды үйреніп, сарайдың қабырғасына ақ бояумен Жеті өсиетті жазып қойды:
1. Екі аяқпен жүретіннің бәрі — жау.
2. Төрт аяқпен жүретін немесе қанаты бардың бәрі — дос.
3. Ешбір жануар киім кимесін.
4. Ешбір жануар төсекте жатпасын.
5. Ешбір жануар спирттік ішімдік ішпесін.
6. Ешбір жануар өзге жануарды өлтірмесін.
7. Барлық жануарлар тең!`,
          ru: `Когда хозяин усадьбы мистер Джонс уснул мертвецким сном, животные тайком собрались в амбаре послушать мудрого хряка Старого Майора.

— Товарищи! — обратился он. — В чем суть нашей горькой доли? Наш единственный враг — Человек! Человек — единственное существо, которое потребляет, ничего не производя. Уничтожьте Человека, и плоды наших тяжких трудов будут принадлежать нам! Все животные — братья!

Вскоре животные восстали и прогнали Джонса. Ферму переименовали в «Скотный двор». Самыми сообразительными оказались свиньи. Они выучились грамоте и начертали на дегтярной стене амбара Семь Заповедей:
1. Тот, кто ходит на двух ногах — враг.
2. Тот, кто ходит на четырех ногах или имеет крылья — друг.
3. Животное да не носит платья.
4. Животное да не спит на кровати.
5. Животное да не пьет спиртного.
6. Животное да не убьет другое животное.
7. Все животные равны!`,
          en: `When Mr. Jones, the proprietor of Manor Farm, had drunkenly locked the hen-houses, all the animals gathered in the big barn to listen to Old Major, the prize boar.

"Comrades," he proclaimed, "what is the nature of this life of ours? Let us face it: our lives are miserable, laborious, and short. Why? Because nearly the whole of the produce of our labour is stolen from us by human beings! Man is the only creature that consumes without producing. Remove Man, and the root cause of hunger and overwork is abolished forever! All animals are comrades!"

Early that summer, the Rebellion took place: Jones was expelled, and the Manor Farm became Animal Farm. The pigs, having taught themselves to read, painted the Seven Commandments on the tarred barn wall:
1. Whatever goes upon two legs is an enemy.
2. Whatever goes upon four legs, or has wings, is a friend.
3. No animal shall wear clothes.
4. No animal shall sleep in a bed.
5. No animal shall drink alcohol.
6. No animal shall kill any other animal.
7. All animals are equal.`
        }
      },
      {
        id: 'af_c2',
        title: {
          kk: '2-тарау: Өсиеттердің бұрмалануы және соңғы ақиқат',
          ru: 'Глава 2: Искажение заповедей и финал',
          en: 'Chapter 2: The Altered Commandments and the Final Truth'
        },
        content: {
          kk: `Уақыт өте келе Наполеон есімді қатал шошқа барлық билікті қолына алды. Адал жұмысшы қара күш иесі — Боксер есімді жылқы күні-түні «Мен одан да көп жұмыс істеймін!» деп, жел диірменін салуға бар күшін салды.

Бірақ шошқалар адамдардың үйіне көшіп, төсекте жатып, шарап іше бастады. Жануарлар қабырғадағы өсиеттерді қайта оқыса, оларға сөздер қосылып кеткен екен:
«Ешбір жануар төсекте... жаймамен жатпасын».
«Ешбір жануар себепсіз басқаны өлтірмесін».

Ал қартайып ауырған Боксерді мал дәрігеріне апарамыз деп алдап, сойғыш қасапшыға сатып жіберді.

Ақырында қабырғадағы бүкіл өсиеттер өшіріліп, орнында бір-ақ сөйлем қалды:
«БАРЛЫҚ ЖАНУАРЛАР ТЕҢ, БІРАҚ КЕЙБІР ЖАНУАРЛАР ӨЗГЕЛЕРДЕН ГӨРІ ТЕҢІРЕК».

Ақырғы күні жануарлар терезеден қарағанда, шошқалардың екі аяқпен жүріп, адамдармен бірге карта ойнап, арақ ішіп отырғанын көрді. Олар шошқадан адамға, адамнан шошқаға қарады, бірақ қайсысы адам, қайсысы шошқа екенін ажырата алмады.`,
          ru: `Шли месяцы, и хряк Наполеон захватил абсолютную власть с помощью выращенных им свирепых псов. Верный ломовой конь Боксер самоотверженно трудился на ветряной мельнице, повторяя свой девиз: «Я буду работать еще усерднее!».

Но верхушка свиней переселилась в хозяйский дом, стала спать на шелковых простынях и пить вино. Всякий раз заповеди на стене тайно дописывались:
«Животное да не спит на кровати... с простынями».
«Животное да не убьет другое животное... без причины».

Когда надорвавшийся от каторжной работы Боксер заболел, свиньи обманом отправили его в фургоне на живодерню, а деньги пропили.

В конце концов все прежние заповеди были смыты, и осталась лишь одна страшная формула:
«ВСЕ ЖИВОТНЫЕ РАВНЫ, НО НЕКОТОРЫЕ ЖИВОТНЫЕ БОЛЕЕ РАВНЫ, ЧЕМ ДРУГИЕ».

В финале животные заглянули в окно фермерского дома: свиньи ходили на задних лапах, носили сюртуки и пили виски с окрестными плантаторами. И уже невозможно было разобрать, где свиньи, а где люди.`,
          en: `As seasons passed, the ferocious boar Napoleon consolidated dictatorial power using a pack of savage attack dogs. The noble cart-horse Boxer worked until his muscles cracked on the windmill, living by his personal motto: "I will work harder!"

Yet the pigs moved into the farmhouse, slept in feather beds, and drank whisky. Each time simpler animals grew uneasy, the commandments were found subtly amended:
"No animal shall sleep in a bed... with sheets."
"No animal shall kill any other animal... without cause."

When Boxer’s strength finally collapsed from exhausted labor, the pigs sold him to the knacker’s slaughterhouse, using the blood-money to purchase another case of whisky.

In the end, all the commandments were whitewashed out, replaced by a single decree:
"ALL ANIMALS ARE EQUAL, BUT SOME ANIMALS ARE MORE EQUAL THAN OTHERS."

In the climactic scene, the animals peered through the farmhouse window. The pigs were walking on their hind legs, brandishing whips, and toasting human farmers over cards and spirits. The creatures outside looked from pig to man, and from man to pig, and from pig to man again; but already it was impossible to say which was which.`
        }
      }
    ],
    quizzes: {
      questions: [
        {
          id: 'af_q1',
          type: 'quote_memory',
          question: {
            kk: 'Сарайдың қабырғасындағы барлық өсиеттер өшіріліп, соңында қандай жалғыз бұрмаланған ұран қалды?',
            ru: 'Какая единственная искаженная формулировка осталась в итоге на стене вместо семи заповедей?',
            en: 'What final paradoxical decree replaced all Seven Commandments upon the barn wall?'
          },
          options: {
            kk: [
              '«Барлық жануарлар тең, бірақ кейбір жануарлар өзгелерден гөрі теңірек»',
              '«Адам қайта оралсын»',
              '«Жануарларға тыныштық керек»',
              '«Тек қана жылқылар еңбек етсін»'
            ],
            ru: [
              '«Все животные равны, но некоторые животные более равны, чем другие»',
              '«Человек — лучший друг скота»',
              '«Никакой работы по воскресеньям»',
              '«Власть принадлежит всем поровну»'
            ],
            en: [
              '"All animals are equal, but some animals are more equal than others"',
              '"Man is the eternal protector of beasts"',
              '"Work shall cease on rainy days"',
              '"Every creature commands its own destiny"'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Шошқалар теңдік ұғымын толық жойып, осы әйгілі сөйлемді қалдырды.',
            ru: 'Знаменитый оксюморон авторитаризма: «Все животные равны, но некоторые более равны».',
            en: 'The pigs reduced all egalitarian ideals into the infamous mockery of equality.'
          }
        },
        {
          id: 'af_q2',
          type: 'character_action',
          question: {
            kk: 'Адал еңбек еткен күшті жылқы Боксер ауырып қалғанда, Наполеон оны қайда жіберді?',
            ru: 'Куда свиньи на самом деле отправили надорвавшегося коня Боксера, когда он заболел?',
            en: 'Where did Napoleon and the pigs secretly dispatch the faithful work-horse Boxer when he collapsed?'
          },
          options: {
            kk: [
              'Жануарлар қасапханасына (сойғышқа) сатып жіберді',
              'Жайлы демалыс орнына жіберді',
              'Қалалық ең үздік ауруханаға емдетті',
              'Өз еркімен орманға жіберді'
            ],
            ru: [
              'Продали на живодерню (на убой)',
              'Отправили на заслуженную пенсию на клеверное поле',
              'Положили в образцовую ветеринарную клинику',
              'Отпустили пастись на волю'
            ],
            en: [
              'Sold him to the knacker’s slaughterhouse for meat and glue',
              'Retired him with honor to the lush clover pasture',
              'Treated him in a premier hospital in the neighboring town',
              'Granted him freedom in the wild'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: 'Боксерді дәрігерге емес, қасапшының көлігіне тиеп, ақшасына ішімдік алды.',
            ru: 'Боксера коварно продали мяснику, а на вырученные деньги свиньи купили виски.',
            en: 'The pigs sent their most devoted worker to be slaughtered, using the proceeds for liquor.'
          }
        },
        {
          id: 'af_q3',
          type: 'detail_memory',
          question: {
            kk: 'Кітаптың соңында жануарлар терезеден қарағанда нені көріп, таңғалды?',
            ru: 'Что увидели потрясенные животные через окно фермы в финальной сцене книги?',
            en: 'What did the outside animals observe through the farmhouse window in the concluding scene?'
          },
          options: {
            kk: [
              'Шошқалардың екі аяқпен жүріп, адамдармен араласып кеткенін және оларды ажырату мүмкін болмай қалғанын',
              'Ферманың өртеніп кеткенін',
              'Джонстың қайтып келіп кешірім сұрағанын',
              'Жануарлардың барлығының қашып кеткенін'
            ],
            ru: [
              'Свиньи пировали с людьми на двух ногах, и было невозможно отличить человека от свиньи',
              'Ферма была полностью разрушена ураганом',
              'Джонс вернулся и мирно пас овец',
              'Все животные стали летать'
            ],
            en: [
              'The pigs were standing on two legs, drinking with humans, indistinguishable from them',
              'The entire farm had burned down in an accidental fire',
              'Mr. Jones had returned with humble gifts',
              'All other creatures had quietly crossed the border'
            ]
          },
          correctIndex: 0,
          explanation: {
            kk: '«Шошқадан адамға, адамнан шошқаға қарады, бірақ қайсысы адам, қайсысы шошқа екенін ажырата алмады».',
            ru: 'В финале свиньи уподобились прежним тиранам-людям до полной неразличимости.',
            en: 'The ruling pigs had transformed entirely into their former oppressors.'
          }
        }
      ],
      openQuestion: {
        id: 'af_open',
        prompt: {
          kk: 'Оруэлл бұл сатиралық шығармасы арқылы билік, өтірік және әділдік туралы қандай сабақ бергісі келді?',
          ru: 'Какой главный урок о природе власти, пропаганде и гражданской бдительности несет эта повесть?',
          en: 'What vital warning about power, deceptive propaganda, and civic apathy does Orwell impart?'
        },
        keyThemes: {
          kk: ['билік', 'теңдік', 'өтірік', 'насихат', 'бостандық', 'әділдік'],
          ru: ['власть', 'тирания', 'пропаганда', 'равенство', 'манипуляция', 'свобода', 'бдительность'],
          en: ['power', 'propaganda', 'tyranny', 'equality', 'manipulation', 'freedom', 'alertness']
        },
        sampleAnswer: {
          kk: 'Әділдік пен теңдік ұрандарымен билікке келгендер бақылаусыз қалса, олар бұрынғы қанаушылардан да сорақы тиранға айналады. Халық сауатты әрі қырағы болуы керек.',
          ru: 'Повесть предостерегает, что слепое повиновение, искажение фактов и отсутствие критики превращают любую революцию в еще более жестокую диктатуру.',
          en: 'Orwell warns that uncritical obedience and manipulation of truth inevitably allow cynical elites to turn ideals of equality into absolute despotism.'
        }
      }
    }
  }
];

export const initialBooks: Book[] = [
  readingNationBook,
  ...kazakhClassics,
  ...worldAndAbaiBooks
];
