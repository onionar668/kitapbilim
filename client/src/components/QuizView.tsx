import React, { useState, useEffect } from 'react';
import { Book, Language, QuizAttempt, UserStats } from '../types';
import { translations } from '../utils/translations';
import { evaluateOpenAnswer } from '../utils/storage';
import { formatDuration } from '../utils/formatDuration';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  Award,
  Printer,
  RotateCcw,
  BookOpen,
  Clock,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Quote
} from 'lucide-react';

interface QuizViewProps {
  book: Book;
  currentLang: Language;
  userStats: UserStats;
  onBackToLibrary: () => void;
  onBackToReader: () => void;
  onSaveQuizAttempt: (attempt: QuizAttempt) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  book,
  currentLang,
  userStats,
  onBackToLibrary,
  onBackToReader,
  onSaveQuizAttempt,
}) => {
  const t = translations[currentLang];
  const questions = book.quizzes.questions;
  const openQuestion = book.quizzes.openQuestion;

  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to questions.length (last step is open question)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [openText, setOpenText] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timeSeconds, setTimeSeconds] = useState<number>(0);
  const [readerName, setReaderName] = useState<string>(userStats.readerName || 'Оқырман / Читатель');
  const [attemptResult, setAttemptResult] = useState<QuizAttempt | null>(null);

  const bookTitle = book.title[currentLang] || book.title.ru;
  const author = book.author[currentLang] || book.author.ru;

  // Timer
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setTimeSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const calculateResults = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    const percentage = questions.length > 0
      ? Math.round((correctCount / questions.length) * 100)
      : 0;

    // Evaluate open question
    const keyThemes = openQuestion?.keyThemes[currentLang] || openQuestion?.keyThemes.ru || [];
    const openEval = openQuestion
      ? evaluateOpenAnswer(openText, keyThemes, currentLang)
      : undefined;

    const attempt: QuizAttempt = {
      id: 'attempt_' + Date.now(),
      bookId: book.id,
      bookTitle,
      bookAuthor: author,
      date: new Date().toLocaleDateString(),
      score: correctCount,
      total: questions.length,
      percentage,
      timeSpentSeconds: timeSeconds,
      answers: selectedAnswers,
      openAnswer: openText,
      openEvaluation: openEval,
    };

    setAttemptResult(attempt);
    setIsSubmitted(true);
    onSaveQuizAttempt(attempt);

    // Trigger celebration if passed well
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  const handlePrint = () => {
    window.print();
  };

  const isCurrentAnswered = currentStep < questions.length
    ? selectedAnswers[questions[currentStep].id] !== undefined
    : true;

  // Total steps = number of multiple choice questions + 1 for open reflection
  const totalSteps = Math.max(1, questions.length + (openQuestion ? 1 : 0));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Quiz Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <button
              onClick={onBackToReader}
              className="hover:text-stone-900 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToReader}</span>
            </button>
            <span aria-hidden="true">·</span>
            <span>{bookTitle}</span>
          </div>
          <h1 className="font-display-book text-2xl sm:text-3xl font-bold text-stone-900">
            {t.quizTitle}
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            {t.quizSubtitle}
          </p>
        </div>

        {/* Timer & Step Indicator */}
        <div className="flex items-center gap-4 text-xs font-semibold text-stone-600 bg-stone-100 p-2.5 rounded-xl self-start sm:self-auto">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-600" />
            <span className="tabular-nums">{formatTime(timeSeconds)}</span>
          </div>
          <div className="h-4 w-px bg-stone-300" />
          <div>
            {!isSubmitted ? (
              <span>
                {currentStep + 1} / {totalSteps} {t.questionOf}
              </span>
            ) : (
              <span className="text-emerald-700 font-bold">{t.completedBadge}</span>
            )}
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        /* Active Quiz Steps */
        <div className="space-y-6">
          {/* Progress bar */}
          <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-stone-900 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>

          {currentStep < questions.length ? (
            /* Multiple Choice Question Card */
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                  {currentLang === 'kk' ? 'Мәтінді есте сақтау' : currentLang === 'ru' ? 'Память о деталях' : 'Textual Memory'}
                </span>
                <h3 className="font-display-book text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {questions[currentStep].question[currentLang] || questions[currentStep].question.ru}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {(questions[currentStep].options[currentLang] || questions[currentStep].options.ru).map(
                  (optText, idx) => {
                    const isSelected = selectedAnswers[questions[currentStep].id] === idx;
                    const letter = String.fromCharCode(65 + idx); // A, B, C, D

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(questions[currentStep].id, idx)}
                        className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isSelected
                            ? 'border-stone-900 bg-stone-900 text-white font-medium shadow-xs'
                            : 'border-stone-200 hover:border-stone-400 bg-stone-50/50 hover:bg-stone-50 text-stone-800'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected
                              ? 'bg-white text-stone-900'
                              : 'bg-stone-200 text-stone-700'
                          }`}
                        >
                          {letter}
                        </span>
                        <span className="text-sm sm:text-base leading-relaxed">{optText}</span>
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            /* Open Reflection Question */
            <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-700">
                  {t.openReflectionTitle}
                </span>
                <h3 className="font-display-book text-xl sm:text-2xl font-bold text-stone-900 leading-snug">
                  {openQuestion?.prompt[currentLang] || openQuestion?.prompt.ru || t.openReflectionPrompt}
                </h3>
                <p className="text-xs text-stone-500">
                  {currentLang === 'kk'
                    ? 'Бұл сұрақ кітаптың түпкі идеясын қалай түсінгеніңізді бағалайды.'
                    : currentLang === 'ru'
                    ? 'Здесь оценивается ваше глубокое понимание философского смысла книги.'
                    : 'This question assesses your deep retention of the central philosophical message.'}
                </p>
              </div>

              <textarea
                rows={5}
                value={openText}
                onChange={(e) => setOpenText(e.target.value)}
                placeholder={t.openReflectionPlaceholder}
                className="w-full p-4 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white text-stone-900 transition-colors"
              />
            </div>
          )}

          {/* Stepper Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                currentStep === 0
                  ? 'opacity-40 border-stone-200 text-stone-400 cursor-not-allowed'
                  : 'border-stone-300 hover:bg-stone-100 text-stone-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{t.prevQuestion}</span>
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
                disabled={!isCurrentAnswered}
                className={`flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  !isCurrentAnswered
                    ? 'opacity-50 bg-stone-300 text-stone-500 cursor-not-allowed'
                    : 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
                }`}
              >
                <span>{t.nextQuestion}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={calculateResults}
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold rounded-lg bg-amber-700 hover:bg-amber-800 text-white shadow-md transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.submitQuiz}</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Results, Certificate & Question Review */
        <div className="space-y-10 animate-fade-in">
          {/* Score Header Card */}
          <div className="bg-stone-900 text-white rounded-2xl p-8 sm:p-10 border border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Award className="w-6 h-6 text-amber-400" />
                <span className="text-xs uppercase tracking-wider text-amber-400 font-bold">
                  {t.scoreTitle}
                </span>
              </div>
              <h2 className="font-display-book text-3xl sm:text-4xl font-bold">
                {attemptResult?.percentage}% {t.percent}
              </h2>
              <p className="text-sm text-stone-300 max-w-lg leading-relaxed">
                {(attemptResult?.percentage ?? 0) >= 80
                  ? t.scoreGreat
                  : (attemptResult?.percentage ?? 0) >= 50
                  ? t.scoreGood
                  : t.scoreRetake}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-4 text-xs text-stone-400 font-medium pt-2">
                <span>
                  {t.points}: {attemptResult?.score} / {attemptResult?.total}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {t.timeSpent}: {formatDuration(attemptResult?.timeSpentSeconds ?? 0, currentLang)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-col gap-2.5 shrink-0 w-full md:w-auto">
              <button
                onClick={handlePrint}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" />
                <span>{t.printCertificate}</span>
              </button>

              <button
                onClick={() => {
                  setSelectedAnswers({});
                  setOpenText('');
                  setIsSubmitted(false);
                  setCurrentStep(0);
                  setTimeSeconds(0);
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.retakeQuiz}</span>
              </button>

              <button
                onClick={onBackToReader}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>{t.readAgain}</span>
              </button>
            </div>
          </div>

          {/* Reader Name input for Certificate */}
          <div className="bg-stone-100 rounded-xl p-3.5 sm:p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3 text-xs">
            <span className="font-semibold text-stone-700">{t.readerNamePrompt}</span>
            <input
              type="text"
              value={readerName}
              onChange={(e) => setReaderName(e.target.value)}
              placeholder={t.enterYourName}
              className="w-full sm:w-64 px-3 py-2 sm:py-1.5 bg-white border border-stone-300 rounded-lg text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900 text-xs font-medium"
            />
          </div>

          {/* Printable Certificate Template */}
          <div
            id="printable-certificate"
            className="bg-white rounded-2xl border-2 sm:border-4 border-amber-900/20 p-4 sm:p-8 md:p-12 space-y-4 sm:space-y-6 text-center relative overflow-hidden shadow-xs"
          >
            {/* Elegant double border ornament */}
            <div className="border border-amber-800/40 p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 rounded-lg bg-amber-50/20">
              <div className="space-y-1">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-amber-800 font-bold">
                  {t.brand} · {t.certificateSubtitle}
                </span>
                <h3 className="font-display-book text-xl sm:text-3xl font-bold text-stone-900">
                  {t.certificateTitle}
                </h3>
              </div>

              <div className="py-1 sm:py-2 space-y-1">
                <p className="text-xs text-stone-500">{t.certifiedThat}</p>
                <p className="font-display-book text-xl sm:text-3xl font-bold text-amber-900 underline decoration-amber-300 underline-offset-4 break-words">
                  {readerName}
                </p>
              </div>

              <div className="space-y-1 max-w-lg mx-auto">
                <p className="text-xs text-stone-600">{t.completedBookAndPassed}</p>
                <p className="font-display-book text-lg sm:text-xl font-bold text-stone-900 break-words">
                  «{bookTitle}»
                </p>
                <p className="text-xs text-stone-500 font-medium">{author}</p>
              </div>

              <div className="pt-3 sm:pt-4 flex flex-row items-center justify-center gap-2 sm:gap-4 text-xs border-t border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[11px] sm:text-xs">{t.dateAwarded}</span>
                  <span className="font-bold text-stone-900 text-sm sm:text-base">{attemptResult?.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Open Reflection Evaluation Card (if answered) */}
          {attemptResult?.openEvaluation && (
            <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-amber-700" />
                <h4 className="font-display-book text-lg font-bold text-stone-900">
                  {t.openReflectionAnalysis}
                </h4>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="p-3 bg-white rounded-lg border border-stone-200 italic text-stone-700">
                  "{attemptResult.openAnswer}"
                </div>

                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-950 font-medium">
                  {attemptResult.openEvaluation.feedback[currentLang] || attemptResult.openEvaluation.feedback.ru}
                </div>

                {attemptResult.openEvaluation.foundThemes.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-stone-600 pt-1">
                    <span className="font-semibold text-stone-800">{t.detectedThemes}:</span>
                    <span>{attemptResult.openEvaluation.foundThemes.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Detailed Question by Question Review */}
          <div className="space-y-6">
            <h3 className="font-display-book text-xl font-bold text-stone-900">
              {currentLang === 'kk'
                ? 'Сұрақтар мен жауаптарды талдау'
                : currentLang === 'ru'
                ? 'Подробный разбор вопросов'
                : 'Detailed Question Analysis'}
            </h3>

            <div className="space-y-4">
              {questions.map((q, qIndex) => {
                const userChoice = attemptResult?.answers[q.id];
                const isCorrect = userChoice === q.correctIndex;
                const options = q.options[currentLang] || q.options.ru;

                return (
                  <div
                    key={q.id}
                    className={`rounded-xl border p-5 sm:p-6 space-y-4 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/20'
                        : 'border-rose-200 bg-rose-50/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-stone-500">
                          {t.chapter} {qIndex + 1}
                        </span>
                        <h4 className="font-display-book text-base sm:text-lg font-bold text-stone-900">
                          {q.question[currentLang] || q.question.ru}
                        </h4>
                      </div>

                      <div className="shrink-0 mt-1">
                        {isCorrect ? (
                          <div className="flex items-center gap-1 text-emerald-700 text-xs font-bold">
                            <CheckCircle className="w-5 h-5" />
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 text-rose-700 text-xs font-bold">
                            <XCircle className="w-5 h-5" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Answers comparison */}
                    <div className="space-y-2 text-xs sm:text-sm">
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-stone-500 shrink-0 w-28">
                          {t.yourAnswer}:
                        </span>
                        <span
                          className={`font-medium ${
                            isCorrect ? 'text-emerald-800' : 'text-rose-800 line-through'
                          }`}
                        >
                          {userChoice !== undefined ? options[userChoice] : '—'}
                        </span>
                      </div>

                      {!isCorrect && (
                        <div className="flex items-start gap-2">
                          <span className="font-bold text-emerald-700 shrink-0 w-28">
                            {t.correctAnswer}:
                          </span>
                          <span className="font-bold text-emerald-800">
                            {options[q.correctIndex]}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Book Quote / Text Explanation */}
                    <div className="pt-3 border-t border-stone-200/60 text-xs text-stone-600 bg-white/60 p-3 rounded-lg">
                      <span className="font-bold text-stone-800 block mb-1">
                        {t.explanation}:
                      </span>
                      <p>{q.explanation[currentLang] || q.explanation.ru}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Return CTA */}
          <div className="pt-6 border-t border-stone-200 flex justify-center">
            <button
              onClick={onBackToLibrary}
              className="px-8 py-3 text-sm font-bold text-white bg-stone-900 hover:bg-stone-800 rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              {t.backToLibrary}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
