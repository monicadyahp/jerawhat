// frontend-hapi > src > mvp > presenters > useQuizPresenter.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import QuizModel from '../models/QuizModel';

const QUIZ_DURATION_SECONDS = 60; // 1 menit

export default function useQuizPresenter() {
  const model = useMemo(() => new QuizModel(), []);
  const { quizId } = useParams();
  const navigate = useNavigate();

  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizzesList, setQuizzesList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [timerActive, setTimerActive] = useState(false);

  const [userAnswers, setUserAnswers] = useState([]);

  // Effect untuk memuat daftar kuis
  useEffect(() => {
    setQuizzesList(model.getAllQuizzes());
    setLoading(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [model]);

  // Effect untuk memuat kuis spesifik saat quizId berubah
  useEffect(() => {
    if (quizId) {
      setLoading(true);
      const quiz = model.getQuizById(quizId);
      if (quiz) {
        setCurrentQuiz(quiz);
        setCurrentQuestionIndex(0);
        setSelectedOptionIndex(null);
        setScore(0);
        setQuizFinished(false);
        setTimeLeft(QUIZ_DURATION_SECONDS);
        setTimerActive(true);
        setUserAnswers([]);
      } else {
        navigate('/quiz');
      }
      setLoading(false);
    } else {
      setCurrentQuiz(null);
      setTimerActive(false);
      setTimeLeft(QUIZ_DURATION_SECONDS);
      setUserAnswers([]);
    }
  }, [quizId, model, navigate]);

  // Timer Logic
  useEffect(() => {
    let timerInterval;
    if (timerActive && timeLeft > 0 && !quizFinished) {
      timerInterval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive && !quizFinished) {
      // Pastikan currentQuiz ada sebelum mencoba mengakses propertiesnya
      if (currentQuiz) {
        const remainingQuestions = currentQuiz.questions.length - userAnswers.length;
        setUserAnswers(prevAnswers => {
          let updatedAnswers = [...prevAnswers];
          for (let i = 0; i < remainingQuestions; i++) {
            updatedAnswers.push({
              questionIndex: userAnswers.length + i,
              selectedOptionIndex: null,
              isCorrect: false,
            });
          }
          return updatedAnswers;
        });
      }
      setQuizFinished(true);
      setTimerActive(false);
      clearInterval(timerInterval);
    } else if (quizFinished && timerActive) {
      setTimerActive(false);
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [timerActive, timeLeft, quizFinished, currentQuiz, currentQuestionIndex, userAnswers.length]);

  const handleOptionSelect = useCallback((optionIndex) => {
    if (!quizFinished) {
      setSelectedOptionIndex(optionIndex);
    }
  }, [quizFinished]);

  const handleNextQuestion = useCallback(() => {
    if (!currentQuiz) return; // Keluar jika kuis belum dimuat

    if (currentQuestionIndex < currentQuiz.questions.length) {
      const currentQuestionData = currentQuiz.questions[currentQuestionIndex];
      const correct = selectedOptionIndex !== null && currentQuestionData.options[selectedOptionIndex].isCorrect;

      setUserAnswers(prevAnswers => [
        ...prevAnswers,
        {
          questionIndex: currentQuestionIndex,
          selectedOptionIndex: selectedOptionIndex,
          isCorrect: correct,
        }
      ]);

      if (correct) {
        setScore(prevScore => prevScore + 1);
      }
    }

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOptionIndex(null);
    } else {
      setQuizFinished(true);
      setTimerActive(false);
    }
  }, [currentQuiz, currentQuestionIndex, selectedOptionIndex, userAnswers]);

  const handleStartQuiz = useCallback((id) => {
    navigate(`/quiz/${id}`);
  }, [navigate]);

  const handleRetakeQuiz = useCallback(() => {
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setTimerActive(true);
    setLoading(false);
    setUserAnswers([]);

    navigate(`/quiz/${quizId}`);
  }, [navigate, quizId]);

  const handleBackToQuizList = useCallback(() => {
    navigate('/quiz');
  }, [navigate]);

  // --- Fungsi Baru: handleCancelQuiz ---
  const handleCancelQuiz = useCallback(() => {
    // Reset semua state yang relevan dengan kuis yang sedang berjalan
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setTimerActive(false); // Pastikan timer berhenti
    setUserAnswers([]);
    setLoading(false); // Pastikan loading false

    navigate('/quiz'); // Kembali ke halaman daftar kuis
  }, [navigate]);
  // --- Akhir Fungsi Baru ---

  return {
    quizzesList,
    currentQuiz,
    currentQuestion: currentQuiz ? currentQuiz.questions[currentQuestionIndex] : null,
    currentQuestionIndex,
    selectedOptionIndex,
    score,
    quizFinished,
    loading,
    timeLeft,
    timerActive,
    userAnswers,
    handleOptionSelect,
    handleNextQuestion,
    handleStartQuiz,
    handleRetakeQuiz,
    handleBackToQuizList,
    handleCancelQuiz, // Sertakan fungsi baru di return
    totalQuestions: currentQuiz ? currentQuiz.questions.length : 0,
  };
}