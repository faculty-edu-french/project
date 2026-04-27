import { useState, useEffect, useRef } from 'react';
import './index.css';
import refinedData1 from './module1_refined.json';
import refinedData2 from './module2_refined.json';
import refinedData3 from './module3_refined.json';
import refinedData4 from './module4_refined.json';
import introData from './intro.json';
import { MCQGroup, MCQBlock, StudentGate, EssaySubmitter } from './MCQ';
import {
  Lightbulb, BookOpen, Search, Link2, Clock, FileText,
  MessageSquare, CheckCircle2, Puzzle, LayoutTemplate,
  Users, GraduationCap, Sparkles
} from 'lucide-react';

const OBJ_ICONS = [
  { icon: BookOpen,       color: '#3b82f6', bg: '#eff6ff' },
  { icon: Search,         color: '#6366f1', bg: '#eef2ff' },
  { icon: Link2,          color: '#7c3aed', bg: '#f5f3ff' },
  { icon: Clock,          color: '#c026d3', bg: '#fdf4ff' },
  { icon: FileText,       color: '#db2777', bg: '#fdf2f8' },
  { icon: MessageSquare,  color: '#059669', bg: '#ecfdf5' },
  { icon: CheckCircle2,   color: '#0d9488', bg: '#f0fdfa' },
  { icon: Puzzle,         color: '#0891b2', bg: '#ecfeff' },
  { icon: LayoutTemplate, color: '#0284c7', bg: '#f0f9ff' },
  { icon: Users,          color: '#d97706', bg: '#fffbeb' },
  { icon: GraduationCap,  color: '#ea580c', bg: '#fff7ed' },
  { icon: Sparkles,       color: '#e11d48', bg: '#fff1f2' },
];

// =========================================================
// =========================================================
// Hard-coded MCQs (moved to inline JSON)
// =========================================================

const MCQ_BY_LESSON: Record<string, any[]> = {};

// =========================================================
// PersistentInput — controlled input that saves to localStorage
// =========================================================
const PersistentInput = ({ storageKey, isFirst }: { storageKey: string; isFirst: boolean }) => {
  const [value, setValue] = useState<string>(() => {
    try { return localStorage.getItem(storageKey) || ''; } catch { return ''; }
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    try { localStorage.setItem(storageKey, v); } catch { }
  };
  return (
    <input
      type="text"
      className="input-field"
      placeholder={isFirst ? "Votre réponse ici..." : ""}
      value={value}
      onChange={handleChange}
    />
  );
};

// =========================================================
// InlineInput — for fill-in-the-blank questions
// =========================================================
const InlineInput = ({ storageKey }: { storageKey: string }) => {
  const [value, setValue] = useState<string>(() => {
    try { return localStorage.getItem(storageKey) || ''; } catch { return ''; }
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    try { localStorage.setItem(storageKey, v); } catch { }
  };
  return (
    <input
      type="text"
      className="inline-input"
      value={value}
      onChange={handleChange}
      style={{
        width: '80px',
        border: 'none',
        borderBottom: '2px dotted var(--primary)',
        background: 'rgba(59, 130, 246, 0.05)',
        textAlign: 'center',
        padding: '0 4px',
        margin: '0 4px',
        outline: 'none',
        fontSize: 'inherit',
        color: 'var(--primary-dark)',
        fontWeight: 'bold',
        borderRadius: '4px'
      }}
    />
  );
};

// =========================================================
// PrintButton — prints the lesson page as PDF
// =========================================================
const PrintButton = ({ lessonTitle }: { lessonTitle: string }) => {
  const handlePrint = () => {
    const original = document.title;
    document.title = lessonTitle;
    window.print();
    document.title = original;
  };
  return (
    <button
      onClick={handlePrint}
      className="print-btn"
      title="Imprimer / Télécharger en PDF"
    >
      🖨️ Imprimer / PDF
    </button>
  );
};

const TELEGRAM_BOT_TOKEN_VF = '8688127385:AAEhkwyAzvZG4_WV1NVDirYwavrPSusBhtY';
const TELEGRAM_CHAT_IDS_VF = ['1350722553', '5126173879'];

async function sendVFToTelegram(text: string): Promise<void> {
  await Promise.all(
    TELEGRAM_CHAT_IDS_VF.map(chat_id =>
      fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN_VF}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id, text, parse_mode: 'HTML' }),
      })
    )
  );
}

const VraiFauxBlock = ({
  content,
  storageKey,
  defaultAnswer,
  correctAnswer,
  studentName,
  lessonTitle,
}: {
  content: string;
  storageKey: string;
  defaultAnswer: string | null;
  correctAnswer?: string;
  studentName?: string;
  lessonTitle?: string;
}) => {
  const submittedKey = storageKey + '_submitted';
  const [selected, setSelected] = useState<string | null>(defaultAnswer);
  const [submitted, setSubmitted] = useState(!!localStorage.getItem(submittedKey));
  const [submitting, setSubmitting] = useState(false);

  const choose = (val: string) => { if (!submitted) setSelected(val); };

  const handleSubmit = async () => {
    if (!selected || submitted) return;
    setSubmitting(true);
    try {
      localStorage.setItem(storageKey, selected);
      localStorage.setItem(submittedKey, '1');
      const isOk = correctAnswer ? selected === correctAnswer : null;
      const result = isOk === true ? '✅ Correct' : isOk === false ? '❌ Incorrect' : '';
      const timestamp = new Date().toLocaleString('fr-FR');
      const msg = `📖 <b>Vrai ou Faux</b>\n\n👤 <b>Étudiant :</b> ${studentName || 'Inconnu'}\n📚 <b>Leçon :</b> ${lessonTitle || ''}\n❓ <b>Question :</b> ${content}\n✍️ <b>Réponse :</b> ${selected} ${result}\n🕐 <b>Date :</b> ${timestamp}`;
      await sendVFToTelegram(msg);
      setSubmitted(true);
    } catch { /* silent */ } finally { setSubmitting(false); }
  };

  const isCorrect = correctAnswer && submitted ? selected === correctAnswer : null;

  const optStyle = (val: string): React.CSSProperties => {
    let border = '2px solid #e2e8f0', bg = '#fff', clr = '#374151';
    if (selected === val) {
      if (submitted && isCorrect === true)  { border = '2px solid #16a34a'; bg = '#f0fdf4'; clr = '#16a34a'; }
      else if (submitted && isCorrect === false) { border = '2px solid #dc2626'; bg = '#fef2f2'; clr = '#dc2626'; }
      else { border = '2px solid var(--primary)'; bg = 'var(--primary-light)'; clr = 'var(--primary)'; }
    }
    return { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.25rem', borderRadius: '0.75rem', border, background: bg, cursor: submitted ? 'default' : 'pointer', fontWeight: selected === val ? 700 : 400, color: clr, transition: 'all 0.2s', marginBottom: '0.5rem' };
  };

  const badge = (val: string) => {
    if (selected === val && submitted) {
      if (isCorrect === true) return { bg: '#16a34a', fg: '#fff' };
      if (isCorrect === false) return { bg: '#dc2626', fg: '#fff' };
    }
    return selected === val ? { bg: 'var(--primary)', fg: '#fff' } : { bg: '#e2e8f0', fg: '#64748b' };
  };

  return (
    <div style={{ margin: '1rem 0', padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
      <p style={{ fontWeight: 600, marginBottom: '1rem', color: '#1e293b' }}>📋 {content}</p>
      {['Vrai', 'Faux'].map((val, i) => {
        const b = badge(val);
        return (
          <div key={val} onClick={() => choose(val)} style={optStyle(val)}>
            <span style={{ width: '1.75rem', height: '1.75rem', borderRadius: '50%', background: b.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.fg, fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{i === 0 ? 'a' : 'b'}</span>
            {val}
          </div>
        );
      })}
      {submitted ? (
        <p style={{ marginTop: '0.75rem', fontWeight: 700, fontSize: '0.9rem', color: isCorrect ? '#16a34a' : '#dc2626' }}>
          {isCorrect ? '✅ Bonne réponse ! Envoyée au professeur.' : `❌ Mauvaise réponse. La bonne réponse est : ${correctAnswer}`}
        </p>
      ) : (
        <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={handleSubmit} disabled={!selected || submitting} style={{ padding: '0.5rem 1.25rem', borderRadius: '0.5rem', border: 'none', background: selected ? 'var(--primary)' : '#cbd5e1', color: '#fff', fontWeight: 700, cursor: selected ? 'pointer' : 'not-allowed', fontSize: '0.9rem' }}>
            {submitting ? '⏳ Envoi...' : '✉️ Soumettre la réponse'}
          </button>
          {!selected && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Veuillez choisir une réponse d'abord</span>}
        </div>
      )}
    </div>
  );
};


// =========================================================
// Block Renderer
// =========================================================
const renderWithLinks = (text: string) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, i) => {
    if (part.match(urlRegex)) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'underline', wordBreak: 'break-all' }}>
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

type BlockRendererProps = {
  block: any;
  idx: number;
  allBlocks: any[];
  studentName?: string;
  lessonId?: string;
  lessonTitle?: string;
};

const BlockRenderer = ({
  block,
  idx,
  allBlocks,
  studentName = '',
  lessonId = '',
  lessonTitle = '',
}: BlockRendererProps) => {
  switch (block.type) {
    case 'phase':
      return (
        <div style={{ margin: '2.5rem 0 1rem' }}>
          <div className="phase-tag">🔘 {block.content}</div>
        </div>
      );
    case 'header':
      return <h3 className="section-header">{block.content}</h3>;
    case 'task':
      return (
        <div className="task-banner" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '-2px' }}>📝</span>
          <span style={{ whiteSpace: 'normal', wordWrap: 'break-word', overflowWrap: 'break-word', lineHeight: '1.5', flex: 1 }}>{block.content}</span>
        </div>
      );
    case 'instruction':
      return (
        <div className="instruction-box">
          <span style={{ fontWeight: 600, fontStyle: 'normal', marginRight: '0.4rem' }}>📌</span>
          {renderWithLinks(block.content)}
        </div>
      );
    case 'paragraph':
      return <p className="article-paragraph">{renderWithLinks(block.content)}</p>;
    case 'fill_blank': {
      const parts = (block.content || '').split('[...]');
      return (
        <p className="article-paragraph" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4px' }}>
          {parts.map((part: string, i: number) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              {part}
              {i < parts.length - 1 && (
                <InlineInput storageKey={`fill_blank_${lessonId}_${idx}_${i}`} />
              )}
            </span>
          ))}
        </p>
      );
    }
    case 'question':
      return (
        <div className="question-item">
          <span style={{ flexShrink: 0, marginTop: '0.1rem' }}>❓</span>
          <span>{block.content}</span>
        </div>
      );
    case 'input': {
      const isFirstInput = idx === 0 || allBlocks[idx - 1].type !== 'input';
      const storageKey = `livret_input_${lessonId}_${idx}`;
      return <PersistentInput key={storageKey} storageKey={storageKey} isFirst={isFirstInput} />;
    }
    case 'link': {
      const isLocal = block.url && block.url.startsWith('/');
      const href = isLocal ? import.meta.env.BASE_URL + block.url.replace(/^\//, '') : block.url;
      const label = block.label || (isLocal ? '📄 Ouvrir le texte' : '🔗 Lien externe');
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="link-button">
          <span>{isLocal ? '📄' : '🔗'}</span> {label.replace(/^📄|^🔗/, '').trim() || (isLocal ? 'Ouvrir le texte' : 'Lien externe')}
        </a>
      );
    }
    case 'info_box': {
      const content = block.content || '';
      let icon = '📚';
      let title = 'Des informations enrichissantes';
      if (content.toLowerCase().startsWith('aide lexicale')) {
        icon = '📝'; title = 'Aide lexicale';
      } else if (content.toLowerCase().startsWith('remarque')) {
        icon = '⚠️'; title = 'Remarque';
      } else if (content.toLowerCase().startsWith('présentation')) {
        icon = '✨'; title = 'Des informations enrichissantes';
      }
      return (
        <div className="info-box">
          <div className="info-box-header">
            <span>{icon}</span>
            <span>{block.title || title}</span>
          </div>
          <div className="info-box-content">
            {content.split('\n').map((line: string, i: number) => (
              <p key={i} style={{ margin: i > 0 ? '0.5rem 0 0 0' : 0 }}>
                {renderWithLinks(line)}
              </p>
            ))}
          </div>
        </div>
      );
    }
    case 'objective': {
      const objText = block.content
        .replace('Objectif général :', '')
        .replace('Objectifs :', '')
        .trim();
      return (
        <div className="obj-header-card">
          <div className="obj-header-blue-bar" />
          <div className="obj-header-glow" />
          <div className="obj-header-inner">
            <div className="obj-header-icon-wrap">
              <Lightbulb size={32} color="#f59e0b" />
            </div>
            <div>
              <h2 className="obj-header-title">Objectifs de cette leçon</h2>
              <p className="obj-header-subtitle">{objText || 'À la fin de la séance, l\'apprenant doit être capable de / d\' :'}</p>
            </div>
          </div>
        </div>
      );
    }
    case 'list_item': {
      // First list_item in a consecutive sequence → render ALL as a card grid
      const prevIsListItem = idx > 0 && allBlocks[idx - 1]?.type === 'list_item';
      if (prevIsListItem) return null; // already rendered by the first one

      // Collect all consecutive list_items
      const items: string[] = [];
      let j = idx;
      while (j < allBlocks.length && allBlocks[j]?.type === 'list_item') {
        // Strip leading number like "1. " or "• "
        const raw: string = allBlocks[j].content || '';
        const clean = raw.replace(/^\d+\.\s*/, '').replace(/^[•\-–]\s*/, '').trim();
        items.push(clean);
        j++;
      }

      return (
        <div className="obj-grid">
          {items.map((text, i) => {
            const slot = OBJ_ICONS[i % OBJ_ICONS.length];
            const IconComp = slot.icon;
            const num = (i + 1) < 10 ? `0${i + 1}` : `${i + 1}`;
            return (
              <div key={i} className="obj-card">
                <div className="obj-card-top">
                  <span className="obj-card-num">{num}</span>
                  <div className="obj-card-icon" style={{ background: slot.bg, color: slot.color }}>
                    <IconComp size={22} strokeWidth={2.5} />
                  </div>
                </div>
                <p className="obj-card-text">{text}</p>
                <div className="obj-card-line" />
              </div>
            );
          })}
        </div>
      );
    }
    case 'text':
      return (
        <div style={{
          margin: '0.75rem 0',
          color: 'var(--text-muted)',
          fontSize: '0.92rem',
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}>
          {block.content}
        </div>
      );
    case 'image_group':
      return (
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '1rem', margin: '2rem 0', WebkitOverflowScrolling: 'touch' }}>
          {block.images.map((imgSrc: string, i: number) => (
            <img key={i} src={import.meta.env.BASE_URL + imgSrc.replace(/^\//, '')} alt="Illustration group" style={{ height: '220px', borderRadius: '12px', flexShrink: 0, boxShadow: 'var(--shadow-md)', objectFit: 'cover' }} />
          ))}
        </div>
      );
    case 'image':
      return (
        <div style={{ margin: '2rem 0', textAlign: 'center' }}>
          <img
            src={import.meta.env.BASE_URL + block.content.replace(/^\//, '')}
            alt="Illustration de la leçon"
            style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}
          />
        </div>
      );
    case 'mcq':
      if (!studentName) return null;
      return (
        <div className="mcq-embed">
          <MCQBlock
            question={{
              id: block.id,
              question: block.question,
              options: block.options,
              lessonId: block.lessonId || lessonId,
              lessonTitle: block.lessonTitle || lessonTitle,
              correctAnswer: block.correctAnswer,
            }}
            studentName={studentName}
          />
        </div>
      );
    case 'video': {
      const src = block.content || '';
      const ytMatch = src.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([A-Za-z0-9_-]{11})/);
      const embedSrc = ytMatch ? `https://www.youtube-nocookie.com/embed/${ytMatch[1]}` : null;
      return (
        <div style={{ margin: '2rem 0' }}>
          {block.title && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              marginBottom: '1rem',
              color: 'var(--primary)',
              fontWeight: 700
            }}>
              <span>🎬</span> {block.title}
            </div>
          )}
          <div className="video-container" style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            background: '#000',
            position: 'relative',
            paddingTop: embedSrc ? '56.25%' : undefined
          }}>
            {embedSrc ? (
              <iframe
                src={embedSrc}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                title={block.title || 'Vidéo'}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls preload="metadata" className="lesson-video" style={{ width: '100%', display: 'block' }}>
                <source src={import.meta.env.BASE_URL + src.replace(/^\//, '')} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>
            )}
          </div>
        </div>
      );
    }
    case 'iframe':
      return (
        <div className="iframe-container">
          <iframe
            src={import.meta.env.BASE_URL + block.content.replace(/^\//, '')}
            className="lesson-iframe"
            title="External Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    case 'section_title':
      return (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          margin: '2.5rem 0 1.5rem',
          padding: '1rem 1.5rem',
          background: 'linear-gradient(135deg, var(--primary), #6366f1)',
          borderRadius: 'var(--radius-sm)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
        }}>
          <span style={{ fontSize: '1.4rem' }}>📐</span>
          <h3 style={{ margin: 0, color: '#fff', fontSize: '1.15rem', fontWeight: 700, letterSpacing: '0.01em' }}>
            {block.content}
          </h3>
        </div>
      );
    case 'vrai_faux': {
      const storageKeyVF = `vf_${lessonId}_${idx}`;
      const savedVF = typeof window !== 'undefined' ? localStorage.getItem(storageKeyVF) : null;
      return (
        <VraiFauxBlock
          key={storageKeyVF}
          storageKey={storageKeyVF}
          content={block.content}
          defaultAnswer={savedVF}
          correctAnswer={block.correctAnswer}
          studentName={studentName}
          lessonTitle={lessonTitle}
        />
      );
    }
    case 'grammar_card':
      return (
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(99,102,241,0.3)',
          borderRadius: '16px',
          padding: '1.5rem 1.75rem',
          margin: '1rem 0',
          boxShadow: '0 8px 32px rgba(99,102,241,0.12)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '0.85rem',
          }}>
            <span style={{ fontSize: '1.1rem' }}>🔷</span>
            <strong style={{ color: 'var(--primary)', fontSize: '1rem', fontWeight: 700 }}>
              {block.title}
            </strong>
            {block.description && (
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontStyle: 'italic', marginLeft: '0.4rem' }}>
                : {block.description}
              </span>
            )}
          </div>
          <div style={{
            background: 'rgba(99,102,241,0.1)',
            borderRadius: '8px',
            padding: '0.6rem 1rem',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            color: 'var(--primary-dark)',
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}>
            {block.structure}
          </div>
          {block.examples && block.examples.length > 0 && (
            <div style={{ borderTop: '1px solid rgba(99,102,241,0.15)', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                📌 Exemples du texte :
              </div>
              {block.examples.map((ex: string, i: number) => (
                <div key={i} style={{
                  fontSize: '0.95rem',
                  color: 'var(--text-main)',
                  lineHeight: '1.7',
                  padding: '0.2rem 0',
                  borderBottom: i < block.examples.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                }}>
                  {ex}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
};


// =========================================================
// App
// =========================================================
function App() {
  const [activeModule, setActiveModule] = useState('module1');
  const [activeTab, setActiveTab] = useState('intro');
  const [theme, setTheme] = useState('light');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lessonRef = useRef<HTMLDivElement>(null);
  const [studentName, setStudentName] = useState<string | null>(() =>
    localStorage.getItem('livret_student_name')
  );

  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    module1: false,
    module2: false,
    module3: false,
    module4: true,
  });

  const toggleModule = (modId: string) => {
    setExpandedModules(prev => ({ ...prev, [modId]: !prev[modId] }));
  };

  const renderModuleCard = (modNum: string, modId: string, title: string, data: any, unlockedList: string[]) => {
    const isExpanded = expandedModules[modId];
    const isActiveModule = activeModule === modId;
    
    return (
      <div className={`module-card ${isActiveModule ? 'active-module' : ''}`}>
        <div className="module-header" onClick={() => toggleModule(modId)}>
          <div className="module-num-box">0{modNum}</div>
          <div className="module-title-container">
            <div className="module-label">MODULE {modNum}</div>
            <div className="module-name">{title.split(':').pop()?.trim() || title}</div>
          </div>
          <div className="module-chevron" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</div>
        </div>
        {isExpanded && (
          <div className="module-lessons">
            {data.lessons.map((l: any) => {
              const isUnlocked = unlockedList.includes(l.id);
              const isActive = activeTab === l.id;
              return (
                <div
                  key={l.id}
                  className={`lesson-item ${isActive ? 'active' : ''} ${!isUnlocked ? 'disabled' : ''}`}
                  onClick={() => isUnlocked && handleNavClick(modId, l.id)}
                >
                  <div className="lesson-bullet"></div>
                  <span>{l.title.split(':').pop()?.trim() || l.title}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  };



  const handleNavClick = (moduleId: string, tabId: string) => {
    setActiveModule(moduleId);
    setActiveTab(tabId);
    setSidebarOpen(false); // Close sidebar on mobile after clicking
  };



  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const handleStudentConfirm = (name: string) => {
    localStorage.setItem('livret_student_name', name);
    setStudentName(name);
  };

  // Show name gate on first visit
  if (!studentName) {
    return <StudentGate onConfirm={handleStudentConfirm} />;
  }

  const renderContent = () => {
    if (activeTab === 'intro') {
      return (
        <div className="lesson-card">
          <h1 className="hero-title" style={{ fontFamily: 'var(--font-serif)', color: 'var(--primary)' }}>Le livret de l'étudiant</h1>
          <p className="hero-subtitle">Livre numérique interactif basé sur l'approche actionnelle</p>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            👋 Bonjour, <strong>{studentName}</strong> !
          </p>
          <hr style={{ margin: '2rem 0', opacity: 0.1 }} />
          {introData.blocks.map((block: any, idx: number) => (
            <BlockRenderer key={idx} block={block} idx={idx} allBlocks={introData.blocks} studentName={studentName} />
          ))}
        </div>
      );
    }

    // Search across ALL modules to avoid stale-state mismatch
    const allLessons = [
      ...refinedData1.lessons,
      ...refinedData2.lessons,
      ...refinedData3.lessons,
      ...refinedData4.lessons,
    ];
    const lesson = allLessons.find((l: any) => l.id === activeTab);
    if (lesson) {
      const mcqs = MCQ_BY_LESSON[activeTab];
      return (
        <div className="lesson-card" key={activeTab} ref={lessonRef}>
          <h1 style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
            fontWeight: 800,
            marginBottom: '2rem',
            letterSpacing: '-0.02em',
            color: 'var(--primary)'
          }}>
            {lesson.title}
          </h1>
          {lesson.blocks.map((block: any, idx: number) => (
            <BlockRenderer
              key={idx}
              block={block}
              idx={idx}
              allBlocks={lesson.blocks}
              studentName={studentName}
              lessonId={lesson.id}
              lessonTitle={lesson.title}
            />
          ))}
          {/* MCQ Section */}
          {mcqs && mcqs.length > 0 && (
            <MCQGroup
              questions={mcqs}
              studentName={studentName}
              lessonId={activeTab}
              lessonTitle={lesson.title}
            />
          )}
          {/* Essay Submitter */}
          <EssaySubmitter
            key={activeTab}
            lessonRef={lessonRef}
            studentName={studentName!}
            lessonTitle={lesson.title}
          />
          {/* Print Button */}
          <PrintButton lessonTitle={lesson.title} />
        </div>
      );
    }
  };

  return (
    <div className="app-layout">
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 999 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-brand">
          <div className="brand-icon" style={{ background: 'transparent', boxShadow: 'none' }}>
            <img
              src={import.meta.env.BASE_URL + 'minia_logo.png'}
              alt="Minia University"
              style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
          </div>
          <div className="brand-text">
            <div className="brand-title">FACULTÉ D'<span>ÉDU</span></div>
            <div className="brand-subtitle">DÉPARTEMENT DE FRANÇAIS</div>
          </div>
        </div>

        <div className="portal-tabs">
          <div className="portal-tab active">
            <span style={{ fontSize: "1rem" }}>⊞</span> PORTAIL
          </div>
        </div>

        <div className="academic-label">
          PROGRAMME ACADÉMIQUE
          <div className="academic-label-dot"></div>
        </div>

        <div className="nav-links">
          <div 
            className={`module-card ${activeTab === 'intro' ? 'active-module' : ''}`}
            style={{ marginBottom: '1.5rem' }}
          >
            <div 
              className="module-header" 
              onClick={() => handleNavClick('module1', 'intro')}
              style={{ padding: '0.85rem 1rem' }}
            >
              <div className="module-num-box" style={{ 
                background: activeTab === 'intro' ? '#1d4ed8' : '#f1f5f9', 
                color: activeTab === 'intro' ? '#fff' : '#64748b',
                fontSize: '1.2rem'
              }}>
                🏠
              </div>
              <div className="module-title-container">
                <div className="module-name" style={{ fontSize: '1rem' }}>Accueil / Introduction</div>
              </div>
            </div>
          </div>

          {renderModuleCard("1", "module1", refinedData1.moduleTitle, refinedData1, ["lecon1", "lecon2", "lecon3"])}
          {renderModuleCard("2", "module2", refinedData2.moduleTitle, refinedData2, ["m2_lecon1", "m2_lecon2", "m2_lecon3"])}
          {renderModuleCard("3", "module3", refinedData3.moduleTitle, refinedData3, ["m3_lecon1", "m3_lecon2", "m3_lecon3"])}
          {renderModuleCard("4", "module4", refinedData4.moduleTitle, refinedData4, ["m4_lecon1", "m4_lecon2", "m4_lecon3"])}
        </div>

        {studentName && (
          <div className="user-profile-footer">
            <div className="user-profile-card">
              <div className="user-avatar-container">
                👤
                <div className="user-status-dot"></div>
              </div>
              <div className="user-info">
                <div className="user-name">{studentName}</div>
              </div>
              <button className="logout-btn" onClick={() => {
                localStorage.removeItem("livret_student_name");
                setStudentName(null);
                setActiveTab("intro");
              }}>
                ↪
              </button>
            </div>
          </div>
        )}
      </aside>

      <main className="main-view">
        <div className="top-nav">
          <button className="hamburger" onClick={() => setSidebarOpen(true)}>☰</button>
          <button
            onClick={toggleTheme}
            style={{ padding: '0.5rem', borderRadius: '50%', border: 'none', background: 'var(--primary-light)', cursor: 'pointer' }}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>

        <div className="content-wrapper">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;
