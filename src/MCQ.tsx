import { useState } from 'react';

const TELEGRAM_BOT_TOKEN = '8688127385:AAEhkwyAzvZG4_WV1NVDirYwavrPSusBhtY';
const TELEGRAM_CHAT_ID = '1350722553 ,  5126173879';

import { ESSAY_ANSWERS } from './answers';

interface MCQOption {
  id: string;
  text: string;
}

interface MCQQuestion {
  id: string;
  question: string;
  options: MCQOption[];
  lessonId: string;
  lessonTitle: string;
  correctAnswer?: string;
}

interface SubmissionResult {
  questionId: string;
  question: string;
  selectedOption: string;
  lessonId: string;
  lessonTitle: string;
  timestamp: string;
}

interface MCQState {
  selectedOption: string | null;
  submitted: boolean;
}

interface MCQBlockProps {
  question: MCQQuestion;
  studentName: string;
}

// =========================================================
// Send to Telegram helper
// =========================================================
async function sendToTelegram(text: string): Promise<void> {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.description || 'Erreur Telegram');
  }
}

// =========================================================
// MCQ Single Question Component
// =========================================================
export const MCQBlock = ({ question, studentName }: MCQBlockProps) => {
  const [state, setState] = useState<MCQState>({
    selectedOption: null,
    submitted: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (optionId: string) => {
    if (state.submitted) return;
    setState(prev => ({ ...prev, selectedOption: optionId }));
  };

  const handleSubmit = async () => {
    if (!state.selectedOption || state.submitted) return;
    setSubmitting(true);
    setError(null);

    const selectedText = question.options.find(o => o.id === state.selectedOption)?.text || '';
    const timestamp = new Date().toLocaleString('fr-FR');

    const submission: SubmissionResult = {
      questionId: question.id,
      question: question.question,
      selectedOption: selectedText,
      lessonId: question.lessonId,
      lessonTitle: question.lessonTitle,
      timestamp: new Date().toISOString(),
    };

    try {
      const existing = JSON.parse(localStorage.getItem('livret_answers') || '[]');
      const updated = [...existing.filter((a: SubmissionResult) => a.questionId !== question.id), submission];
      localStorage.setItem('livret_answers', JSON.stringify(updated));

      const msg = `📖 <b>Réponse QCM</b>\n\n👤 <b>Étudiant :</b> ${studentName}\n📚 <b>Leçon :</b> ${question.lessonTitle}\n❓ <b>Question :</b> ${question.question}\n✅ <b>Réponse :</b> ${selectedText}\n🕐 <b>Date :</b> ${timestamp}`;
      await sendToTelegram(msg);

      setState(prev => ({ ...prev, submitted: true }));
    } catch (e: any) {
      setError("Erreur lors de la soumission. Réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mcq-block">
      <div className="mcq-question-text">
        <span className="mcq-icon">📋</span>
        {question.question}
        {state.submitted && question.correctAnswer && (
          <span style={{ marginLeft: '1rem', color: state.selectedOption === question.correctAnswer ? '#15803d' : '#b91c1c' }}>
            {state.selectedOption === question.correctAnswer ? '✅ Correct' : '❌ Incorrect'}
          </span>
        )}
      </div>

      <div className="mcq-options">
        {question.options.map(option => (
          <button
            key={option.id}
            className={`mcq-option
              ${state.selectedOption === option.id ? 'selected' : ''}
              ${state.submitted && option.id === question.correctAnswer ? 'submitted' : ''}
              ${state.submitted && state.selectedOption === option.id && state.selectedOption !== question.correctAnswer ? 'incorrect' : ''}
              ${state.submitted ? 'disabled' : ''}
            `}
            onClick={() => handleSelect(option.id)}
            disabled={state.submitted}
          >
            <span className="option-label">{option.id}</span>
            <span className="option-text">{option.text}</span>
          </button>
        ))}
      </div>

      {state.submitted ? (
        <div className="mcq-success">
          <span>✅</span>
          <span>Réponse envoyée au professeur via Telegram !</span>
        </div>
      ) : (
        <div className="mcq-submit-row">
          <button
            className="mcq-submit-btn"
            onClick={handleSubmit}
            disabled={!state.selectedOption || submitting}
          >
            {submitting ? '⏳ Envoi...' : '✉️ Soumettre la réponse'}
          </button>
          {!state.selectedOption && (
            <span className="mcq-hint">Veuillez choisir une réponse d'abord</span>
          )}
          {error && <span className="mcq-error">{error}</span>}
        </div>
      )}
    </div>
  );
};

// =========================================================
// MCQ Group (for a set of questions inside a lesson)
// =========================================================
interface MCQGroupProps {
  questions: MCQQuestion[];
  studentName: string;
  lessonId: string;
  lessonTitle: string;
}

export const MCQGroup = ({ questions, studentName }: MCQGroupProps) => {
  if (!questions || questions.length === 0) return null;
  return (
    <div className="mcq-group">
      <div className="mcq-group-header">
        <span>🎯</span> Questions à choix multiple
      </div>
      {questions.map(q => (
        <MCQBlock key={q.id} question={q} studentName={studentName} />
      ))}
    </div>
  );
};

// =========================================================
// Essay Submitter — collects all inputs in a lesson
// =========================================================
interface EssaySubmitterProps {
  lessonRef: React.RefObject<HTMLDivElement | null>;
  studentName: string;
  lessonTitle: string;
}

export const EssaySubmitter = ({ lessonRef, studentName, lessonTitle }: EssaySubmitterProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationMsg, setValidationMsg] = useState<string | null>(null);
  const [submittedPairs, setSubmittedPairs] = useState<{ question: string, answer: string }[]>([]);

  const handleSubmit = async () => {
    if (!lessonRef.current) return;
    setValidationMsg(null);
    setError(null);

    const inputs = Array.from(
      lessonRef.current.querySelectorAll<HTMLInputElement>('input.input-field')
    );

    if (inputs.length === 0) return;

    // --- Group consecutive inputs into answer blocks ---
    // Each "group" = a set of consecutive inputs belonging to one question.
    // We detect group boundaries: a new group starts when there's a non-input
    // element between the previous and current input in the DOM.
    type Group = { inputs: HTMLInputElement[]; label: string };
    const groups: Group[] = [];
    let currentGroup: Group | null = null;

    inputs.forEach((inp) => {
      // Check if this input is directly preceded by another input (same group)
      //  or by something else (new group).
      let prevSibling = inp.previousElementSibling;

      // Walk up if input is deeply nested
      let isConsecutive = false;
      if (prevSibling && prevSibling.tagName === 'INPUT' && prevSibling.classList.contains('input-field')) {
        isConsecutive = true;
      }

      if (!isConsecutive || !currentGroup) {
        // Find the label: nearest preceding non-input text element
        let labelText = '';
        let searchEl: Element | null = inp;
        for (let i = 0; i < 6; i++) {
          if (!searchEl) break;
          let sib = searchEl.previousElementSibling;
          while (sib) {
            const t = sib.textContent?.trim() || '';
            if (t.length > 4 && !sib.querySelector('input')) {
              labelText = t.length > 150 ? t.slice(0, 150) + '…' : t;
              break;
            }
            sib = sib.previousElementSibling;
          }
          if (labelText) break;
          searchEl = searchEl?.parentElement ?? null;
        }

        currentGroup = { inputs: [inp], label: labelText || `Question ${groups.length + 1}` };
        groups.push(currentGroup);
      } else {
        currentGroup.inputs.push(inp);
      }
    });

    // --- Validate: each group must have at least one filled input ---
    const emptyGroups: number[] = [];
    groups.forEach((g, i) => {
      const hasAnswer = g.inputs.some(inp => inp.value.trim().length > 0);
      if (!hasAnswer) emptyGroups.push(i + 1);
    });

    if (emptyGroups.length > 0) {
      setValidationMsg(
        `⚠️ Veuillez répondre à toutes les questions avant de soumettre. ` +
        `Questions sans réponse : ${emptyGroups.join(', ')}.`
      );
      return;
    }

    // --- Build message: one entry per group ---
    const pairs = groups.map((g) => ({
      question: g.label,
      answer: g.inputs.map(inp => inp.value.trim()).filter(Boolean).join(' / '),
    }));

    setSubmitting(true);
    try {
      const timestamp = new Date().toLocaleString('fr-FR');
      const rows = pairs.map((p, i) =>
        `❓ <b>Q${i + 1} :</b> ${p.question}\n💬 <b>Réponse :</b> ${p.answer}`
      ).join('\n\n');

      const msg =
        `📝 <b>Réponses rédigées</b>\n` +
        `━━━━━━━━━━━━━━━━━━━\n` +
        `👤 <b>Étudiant :</b> ${studentName}\n` +
        `📚 <b>Leçon :</b> ${lessonTitle}\n` +
        `🕐 <b>Date :</b> ${timestamp}\n` +
        `━━━━━━━━━━━━━━━━━━━\n\n` +
        rows;

      await sendToTelegram(msg);

      const key = `livret_essays_${lessonTitle}`;
      localStorage.setItem(key, JSON.stringify({ studentName, lessonTitle, pairs, timestamp }));

      setSubmittedPairs(pairs);
      setSubmitted(true);
    } catch {
      setError("❌ Erreur de connexion. Vérifiez internet et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="essay-success-container">
        <div className="essay-success">
          <span className="essay-success-icon">🎉</span>
          <div>
            <strong>Réponses envoyées avec succès !</strong>
            <p>Vos réponses ont été transmises à votre professeur via Telegram.</p>
          </div>
        </div>

        <div className="essay-model-answers" style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--card-bg)', borderRadius: 'var(--radius)', border: '1px solid var(--border)', animation: 'slideUp 0.5s ease-out' }}>
          <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💡</span> Règles de correction (Pour référence)
          </h3>
          {submittedPairs.map((pair, idx) => {
            const lessonAnswers = ESSAY_ANSWERS[lessonTitle] || {};
            let modelAnswer = lessonAnswers[pair.question];

            if (!modelAnswer) {

              const cleanStr = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, '');
              const cleanQ = cleanStr(pair.question);
              const matchedKey = Object.keys(lessonAnswers).find(k => {
                const cleanK = cleanStr(k);
                return cleanK.includes(cleanQ) || cleanQ.includes(cleanK) ||
                  k.includes(pair.question) || pair.question.includes(k.substring(0, 40));
              });

              if (matchedKey) modelAnswer = lessonAnswers[matchedKey];
            }

            return (
              <div key={idx} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                  ❓ {pair.question}
                </div>
                <div style={{ color: 'var(--text-muted)', marginBottom: '0.75rem', fontStyle: 'italic', paddingLeft: '1rem', borderLeft: '3px solid var(--border)' }}>
                  Votre réponse : {pair.answer}
                </div>
                <div style={{ padding: '1rem', background: 'var(--primary-light)', borderRadius: '8px', color: 'var(--primary-dark)', fontSize: '0.95rem' }}>
                  <strong>Réponse attendue / possible :</strong><br />
                  <div style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                    {modelAnswer || "La réponse dépend de votre opinion personnelle (ou aucune réponse type n'est définie)."}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="essay-submitter">
      <div className="essay-submitter-header">
        <span>📨</span>
        <span>Soumettre mes réponses rédigées</span>
      </div>
      <p className="essay-submitter-hint">
        Vérifiez que vous avez répondu à toutes les questions, puis cliquez pour envoyer vos réponses à votre professeur.
      </p>
      {validationMsg && (
        <div className="essay-validation-msg">{validationMsg}</div>
      )}
      {error && (
        <div className="essay-error-msg">{error}</div>
      )}
      <button
        className="essay-submit-btn"
        onClick={handleSubmit}
        disabled={submitting}
      >
        {submitting ? '⏳ Envoi en cours...' : '📤 Envoyer mes réponses au professeur'}
      </button>
    </div>
  );
};

// =========================================================
// Student Name Gate
// =========================================================
interface StudentGateProps {
  onConfirm: (name: string) => void;
}
export const StudentGate = ({ onConfirm }: StudentGateProps) => {
  const [name, setName] = useState('');
  return (
    <div className="student-gate">
      <div className="gate-icon">📚</div>
      <h2>Bienvenue dans votre livret numérique</h2>
      <p>Veuillez entrer votre nom pour commencer</p>
      <input
        type="text"
        placeholder="Votre nom complet..."
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && name.trim().length >= 2 && onConfirm(name.trim())}
        className="gate-input"
      />
      <button
        className="mcq-submit-btn"
        style={{ marginTop: '1rem' }}
        disabled={name.trim().length < 2}
        onClick={() => onConfirm(name.trim())}
      >
        Commencer →
      </button>
    </div>
  );
};
