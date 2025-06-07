// frontend-hapi > src > mvp > models > QuizModel.js
import jerawatQuiz from '../../data/quizzes/jerawat.json';
import komedoQuiz from '../../data/quizzes/komedo.json';
import kulitKeringQuiz from '../../data/quizzes/kulit_kering.json';
import kulitBerminyakQuiz from '../../data/quizzes/kulit_berminyak.json';
import kulitSensitifQuiz from '../../data/quizzes/kulit_sensitif.json';
import pembersihWajahQuiz from '../../data/quizzes/pembersih_wajah.json';
import sunscreenQuiz from '../../data/quizzes/sunscreen.json';
import fleksibilitasKulitQuiz from '../../data/quizzes/fleksibilitas_kulit.json';
import makananKulitSehatQuiz from '../../data/quizzes/makanan_kulit_sehat.json';


export default class QuizModel {
  constructor() {
    // Kumpulkan semua data kuis yang diimpor ke dalam satu array
    this.quizzes = [
      jerawatQuiz,
      komedoQuiz,
      kulitKeringQuiz,
      kulitBerminyakQuiz,
      kulitSensitifQuiz,
      pembersihWajahQuiz,
      sunscreenQuiz,
      fleksibilitasKulitQuiz,
      makananKulitSehatQuiz,
    ];
  }

  getAllQuizzes() {
    return this.quizzes.map(quiz => ({
      id: quiz.id,
      title: quiz.title,
      description: quiz.description,
      questionCount: quiz.questions.length,
    }));
  }

  getQuizById(id) {
    return this.quizzes.find(quiz => quiz.id === id);
  }
}