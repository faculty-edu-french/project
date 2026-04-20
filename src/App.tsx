import { useState, useEffect, useRef } from 'react';
import './index.css';
import refinedData1 from './module1_refined.json';
import refinedData2 from './module2_refined.json';
import refinedData3 from './module3_refined.json';
import refinedData4 from './module4_refined.json';
import introData from './intro.json';
import { MCQGroup, MCQBlock, StudentGate, EssaySubmitter } from './MCQ';

// =========================================================
// Hard-coded MCQ for Leçon 1 (from the book content)
// Later: these will be auto-parsed from the refined JSON
// =========================================================
const LECON1_MCQ = [
  {
    id: 'l1q1',
    question: "1. Les espaces verts améliorent…",
    lessonId: 'lecon2',
    lessonTitle: 'Leçon 2 : Les espaces verts',
    options: [
      { id: 'a', text: 'la pollution' },
      { id: 'b', text: 'la qualité de l\'air' },
      { id: 'c', text: 'la circulation' },
    ],
    correctAnswer: 'b'
  },
  {
    id: 'l1q2',
    question: "2. Dans les espaces verts, les adultes…",
    lessonId: 'lecon2',
    lessonTitle: 'Leçon 2 : Les espaces verts',
    options: [
      { id: 'a', text: 'jouent au ballon' },
      { id: 'b', text: 'font des pique-niques' },
      { id: 'c', text: 'vont à l\'école' },
    ],
    correctAnswer: 'b'
  },
  {
    id: 'l1q3',
    question: "3. Les abeilles et les oiseaux trouvent dans les espaces verts…",
    lessonId: 'lecon2',
    lessonTitle: 'Leçon 2 : Les espaces verts',
    options: [
      { id: 'a', text: 'des voitures' },
      { id: 'b', text: 'de la nourriture' },
      { id: 'c', text: 'des bâtiments' },
    ],
    correctAnswer: 'b'
  },
];

const LECON3_MCQ = [
  {
    id: 'l3q1',
    question: "1. Le covoiturage permet de…",
    lessonId: 'lecon3',
    lessonTitle: 'Leçon 3 : Le covoiturage',
    options: [
      { id: 'a', text: 'Voyager plus cher' },
      { id: 'b', text: 'Économiser de l\'argent' },
      { id: 'c', text: 'Acheter une voiture' },
    ],
    correctAnswer: 'b'
  },
  {
    id: 'l3q2',
    question: "2. Selon le texte, le covoiturage est…",
    lessonId: 'lecon3',
    lessonTitle: 'Leçon 3 : Le covoiturage',
    options: [
      { id: 'a', text: 'Un service professionnel de transport' },
      { id: 'b', text: 'Une solution écologique et solidaire' },
      { id: 'c', text: 'Une obligation légale' },
    ],
    correctAnswer: 'b'
  },
  {
    id: 'l3q3',
    question: "3. Les passagers apprécient surtout…",
    lessonId: 'lecon3',
    lessonTitle: 'Leçon 3 : Le covoiturage',
    options: [
      { id: 'a', text: 'Les horaires stricts' },
      { id: 'b', text: 'Les rencontres et la discussion' },
      { id: 'c', text: 'Conduire seuls' },
    ],
    correctAnswer: 'b'
  },
];

// =========================================================
// Module 2 MCQs
// =========================================================
// Note: M2_LECON3_MCQ moved to module2_refined.json as inline mcq blocks

const MCQ_BY_LESSON: Record<string, typeof LECON1_MCQ> = {
  lecon2: LECON1_MCQ,
  lecon3: LECON3_MCQ,
};

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

// =========================================================
// Block Renderer
// =========================================================
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
          {block.content}
        </div>
      );
    case 'paragraph':
      return <p className="article-paragraph">{block.content}</p>;
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
            <span>{title}</span>
          </div>
          <div className="info-box-content">{content}</div>
        </div>
      );
    }
    case 'objective': {
      const isGeneral = block.content.includes('Objectif général :');
      const text = isGeneral ? block.content.replace('Objectif général :', '').trim() : block.content;
      return (
        <div style={{
          background: 'var(--primary-light)',
          padding: '1.25rem 1.75rem',
          borderRadius: 'var(--radius-sm)',
          margin: '1.5rem 0 2rem',
          borderLeft: '4px solid var(--primary)',
          fontSize: '1rem',
          lineHeight: '1.8',
          color: 'var(--primary-dark)',
          boxShadow: '0 4px 15px rgba(59, 130, 246, 0.05)'
        }}>
          {isGeneral && <strong style={{ display: 'block', marginBottom: '0.5rem', fontSize: '1.05rem', color: 'var(--primary)' }}>💡 Objectif général :</strong>}
          {!isGeneral && <strong style={{ marginRight: '0.4rem', color: 'var(--primary)' }}>💡</strong>}
          <span style={{ fontWeight: 500 }}>{text}</span>
        </div>
      );
    }
    case 'list_item':
      return (
        <div style={{
          marginLeft: '0.5rem',
          marginBottom: '0.6rem',
          color: 'var(--text-main)',
          display: 'flex',
          gap: '0.75rem',
          fontSize: '1rem',
          lineHeight: '1.75',
          alignItems: 'flex-start',
        }}>
          <span style={{ color: 'var(--primary)', fontWeight: 700, marginTop: '0.15rem', flexShrink: 0 }}>›</span>
          <span>{block.content}</span>
        </div>
      );
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
    case 'video':
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
            background: '#000'
          }}>
            <video controls preload="metadata" className="lesson-video" style={{ width: '100%', display: 'block' }}>
              <source src={import.meta.env.BASE_URL + block.content.replace(/^\//, '')} type="video/mp4" />
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      );
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

  const getModuleData = () => {
    if (activeModule === 'module4') return refinedData4;
    if (activeModule === 'module3') return refinedData3;
    if (activeModule === 'module2') return refinedData2;
    return refinedData1;
  };

  const refinedData = getModuleData();

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

    const lesson = refinedData.lessons.find(l => l.id === activeTab);
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

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={import.meta.env.BASE_URL + 'minia_logo.png'}
              alt="Minia University"
              style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
            />
            <div>
              <div className="logo" style={{ fontSize: '0.9rem', lineHeight: '1.3' }}>Faculty of Education</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>French Department</div>
            </div>
          </div>
          {studentName && (
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
              👤 {studentName}
            </div>
          )}
        </div>

        <div className="nav-links">
          <div className="nav-group-title">Introduction</div>
          <div
            className={`nav-link ${activeTab === 'intro' ? 'active' : ''}`}
            onClick={() => handleNavClick('module1', 'intro')}
          >
            🏠 Accueil
          </div>

          <div className="nav-group-title">{refinedData1.moduleTitle}</div>
          {refinedData1.lessons.map((l: any) => (
            <div
              key={l.id}
              className="nav-link"
              style={{ paddingLeft: '2.5rem', opacity: 0.45, cursor: 'not-allowed', pointerEvents: 'none' }}
            >
              🔒 {l.title.split(':').pop()?.trim() || l.title}
            </div>
          ))}

          <div className="nav-group-title">{refinedData2.moduleTitle}</div>
          {refinedData2.lessons.map((l: any) => {
            const isUnlocked = l.id === 'm2_lecon1' || l.id === 'm2_lecon2' || l.id === 'm2_lecon3';
            return (
              <div
                key={l.id}
                className={`nav-link ${activeTab === l.id && isUnlocked ? 'active' : ''}`}
                onClick={() => isUnlocked && handleNavClick('module2', l.id)}
                style={{
                  paddingLeft: '2.5rem',
                  borderLeft: activeTab === l.id && isUnlocked ? '4px solid var(--primary)' : 'none',
                  opacity: isUnlocked ? 1 : 0.45,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
              >
                {isUnlocked ? '📖' : '🔒'} {l.title.split(':').pop()?.trim() || l.title}
              </div>
            );
          })}

          <div className="nav-group-title">{refinedData3.moduleTitle}</div>
          {refinedData3.lessons.map((l: any) => {
            const isUnlocked = ['m3_lecon1', 'm3_lecon2', 'm3_lecon3'].includes(l.id);
            return (
              <div
                key={l.id}
                className={`nav-link ${activeTab === l.id && isUnlocked ? 'active' : ''}`}
                onClick={() => isUnlocked && handleNavClick('module3', l.id)}
                style={{
                  paddingLeft: '2.5rem',
                  borderLeft: activeTab === l.id && isUnlocked ? '4px solid var(--primary)' : 'none',
                  opacity: isUnlocked ? 1 : 0.45,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
              >
                {isUnlocked ? '📖' : '🔒'} {l.title.split(':').pop()?.trim() || l.title}
              </div>
            );
          })}

          <div className="nav-group-title">{refinedData4.moduleTitle}</div>
          {refinedData4.lessons.map((l: any) => {
            const isUnlocked = ['m4_lecon1'].includes(l.id);
            return (
              <div
                key={l.id}
                className={`nav-link ${activeTab === l.id && isUnlocked ? 'active' : ''}`}
                onClick={() => isUnlocked && handleNavClick('module4', l.id)}
                style={{
                  paddingLeft: '2.5rem',
                  borderLeft: activeTab === l.id && isUnlocked ? '4px solid var(--primary)' : 'none',
                  opacity: isUnlocked ? 1 : 0.45,
                  cursor: isUnlocked ? 'pointer' : 'not-allowed'
                }}
              >
                {isUnlocked ? '📖' : '🔒'} {l.title.split(':').pop()?.trim() || l.title}
              </div>
            );
          })}
        </div>
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
