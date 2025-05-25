// frontend-hapi > src > views > QuizView.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

export default function QuizView({
  quizzesList,
  currentQuiz,
  currentQuestion,
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
  totalQuestions,
}) {
  const { quizId } = useParams();

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderQuizList = () => (
    <div className="quiz-list-container">
      <h2 className="section__title reveal-from-bottom">Pilih Kuis</h2>
      <p className="section__description" style={{textAlign: 'center'}}>Uji pengetahuanmu tentang kesehatan kulit!</p>
      <div className="quiz-cards-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginTop: '2rem',
        justifyContent: 'center'
      }}>
        {quizzesList.map(quiz => (
          <div key={quiz.id} className="quiz-card" style={{
            background: '#fbeaea',
            padding: '1.5rem',
            borderRadius: '.75rem',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
            color: 'hsl(323, 70%, 30%)'
          }} onClick={() => handleStartQuiz(quiz.id)}>
            <h3 style={{ marginBottom: '0.5rem' }}>{quiz.title}</h3>
            <p style={{ fontSize: '.9rem', color: 'hsl(330, 4%, 55%)' }}>{quiz.description}</p>
            <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{quiz.questionCount} Soal</p>
            <button className="button" style={{
              marginTop: '1.5rem',
              background: 'hsl(330, 91%, 85%)',
              color: 'hsl(323, 70%, 30%)',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}>Mulai Kuis</button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderQuizQuestion = () => {
    if (!currentQuiz || !currentQuestion) {
      return (
        <div style={{ textAlign: 'center', paddingTop: '5rem', color: 'hsl(323, 70%, 30%)' }}>
          <h3>Memuat kuis...</h3>
        </div>
      );
    }

    return (
      <div className="quiz-question-container" style={{
        background: '#fbeaea',
        padding: '2rem',
        borderRadius: '.75rem',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
        maxWidth: '700px',
        margin: '0 auto',
        color: 'hsl(323, 70%, 30%)'
      }}>
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>{currentQuiz.title}</h2>
        {timerActive && !quizFinished && (
            <div style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: timeLeft <= 10 ? 'crimson' : 'hsl(323, 70%, 30%)' }}>
                Waktu Tersisa: {formatTime(timeLeft)}
            </div>
        )}
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'hsl(330, 4%, 55%)' }}>
          Soal {currentQuestionIndex + 1} dari {totalQuestions}
        </p>

        <div className="question-content" style={{ marginBottom: '2rem' }}>
          <p style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {currentQuestion.question}
          </p>
          <div className="options-grid" style={{ display: 'grid', gap: '0.8rem' }}>
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${selectedOptionIndex === index ? 'selected' : ''} ${quizFinished && option.isCorrect ? 'correct' : ''} ${quizFinished && selectedOptionIndex === index && !option.isCorrect ? 'incorrect' : ''}`}
                onClick={() => handleOptionSelect(index)}
                // --- PERBAIKAN DI SINI ---
                // Tombol pilihan jawaban hanya akan disabled jika loading atau waktu habis.
                // Kondisi `quizFinished` untuk mem-disable harus dipisah untuk feedback styling.
                disabled={loading || timeLeft === 0}
                // --- AKHIR PERBAIKAN ---
                style={{
                  background: selectedOptionIndex === index ? '#fbeaea' : 'white',
                  border: `2px solid ${selectedOptionIndex === index ? 'hsl(330, 91%, 85%)' : 'hsl(330, 4%, 55%)'}`,
                  color: 'hsl(323, 70%, 30%)',
                  padding: '0.8rem 1.2rem',
                  borderRadius: '0.5rem',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  boxShadow: selectedOptionIndex === index ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  ...(quizFinished && option.isCorrect && { borderColor: 'green', backgroundColor: '#e6ffe6' }),
                  ...(quizFinished && selectedOptionIndex === index && !option.isCorrect && { borderColor: 'red', backgroundColor: '#ffe6e6' }),
                  // Jika kuis sudah selesai, non-aktifkan semua interaksi
                  ...(quizFinished && { pointerEvents: 'none', opacity: 0.7 }) // Tambahkan ini untuk visual disabled setelah kuis selesai
                }}
              >
                {option.text}
              </button>
            ))}
          </div>
        </div>

        {!quizFinished && (
          <button
            onClick={handleNextQuestion}
            className="button"
            disabled={selectedOptionIndex === null || loading || timeLeft === 0}
            style={{
              display: 'block',
              margin: '0 auto',
              background: 'hsl(330, 91%, 85%)',
              color: 'hsl(323, 70%, 30%)',
              padding: '0.75rem 2rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {currentQuestionIndex < totalQuestions - 1 ? 'Soal Selanjutnya' : 'Selesai Kuis'}
          </button>
        )}
        
        {quizFinished && renderQuizResult()}
      </div>
    );
  };

  const renderQuizResult = () => (
    <div className="quiz-result-container" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1rem' }}>Kuis Selesai!</h3>
      <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
        Skor Anda: {score} / {totalQuestions}
      </p>
      {timeLeft === 0 && (
        <p style={{ color: 'crimson', fontWeight: 'bold', marginBottom: '1rem' }}>Waktu Habis!</p>
      )}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
        <button onClick={handleRetakeQuiz} className="button" style={{
          background: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          Ulangi Kuis
        </button>
        <button onClick={handleBackToQuizList} className="button button--ghost" style={{
          borderColor: 'hsl(330, 91%, 85%)',
          color: 'hsl(323, 70%, 30%)',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          background: 'transparent',
          cursor: 'pointer'
        }}>
          Lihat Kuis Lainnya
        </button>
      </div>

      <div className="quiz-review-section" style={{
        marginTop: '3rem',
        textAlign: 'left',
        background: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        color: 'hsl(323, 70%, 30%)'
      }}>
        <h4 style={{ marginBottom: '1.5rem', textAlign: 'center', fontSize: '1.1rem' }}>Tinjauan Jawaban Anda:</h4>
        {userAnswers.length > 0 ? (
          userAnswers.map((answer, index) => {
            const questionData = currentQuiz.questions[answer.questionIndex];
            const userAnswerText = answer.selectedOptionIndex !== null
              ? questionData.options[answer.selectedOptionIndex].text
              : "Tidak dijawab";
            const correctAnswerText = questionData.options.find(opt => opt.isCorrect).text;

            return (
              <div key={index} className="review-item" style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid #eee' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>{index + 1}. {questionData.question}</p>
                <p style={{ color: answer.isCorrect ? 'green' : 'crimson', fontSize: '0.95rem' }}>
                  Jawaban Anda: {userAnswerText} {answer.isCorrect ? '✅' : '❌'}
                </p>
                {!answer.isCorrect && ( // Tampilkan jawaban benar jika user salah atau tidak dijawab
                    <p style={{ color: 'green', fontSize: '0.95rem' }}>
                      Jawaban Benar: {correctAnswerText}
                    </p>
                )}
              </div>
            );
          })
        ) : (
          <p style={{textAlign: 'center'}}>Tidak ada jawaban untuk ditinjau (kuis mungkin tidak dimulai atau dihentikan secara tidak terduga).</p>
        )}
      </div>
    </div>
  );

  return (
    <section className="section quiz-page" id="quiz-page">
      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '3rem' }}>
        {quizId ? renderQuizQuestion() : renderQuizList()}
      </div>
    </section>
  );
}