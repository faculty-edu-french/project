import { useState, useEffect } from 'react';



// ── i18n ────────────────────────────────────────────────────
const T: Record<string, Record<string, string>> = {
  fr: {
    title: 'Panneau Administrateur',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    ghToken: 'Token GitHub (pour publier)',
    ghTokenHelp: 'Créez un token sur github.com → Settings → Developer settings → Personal access tokens',
    login: 'Se connecter',
    logout: 'Déconnexion',
    wrongCreds: 'Identifiants incorrects.',
    selectModule: 'Choisir un module',
    selectLesson: 'Choisir une leçon',
    editContent: 'Modifier le contenu',
    editLinks: 'Modifier les liens',
    blockType: 'Type',
    blockContent: 'Contenu',
    linkUrl: 'URL du lien',
    linkLabel: 'Étiquette du bouton',
    save: 'Enregistrer',
    publish: 'Publier sur le site',
    publishing: 'Publication en cours…',
    published: '✅ Publié avec succès !',
    publishError: '❌ Erreur de publication :',
    noLinks: 'Aucun lien dans cette leçon.',
    noToken: 'Veuillez saisir votre Token GitHub pour publier.',
    intro: 'Introduction',
    langBtn: 'العربية',
    close: 'Fermer',
    tokenSaved: 'Token sauvegardé.',
    allModules: 'Tous',
  },
  ar: {
    title: 'لوحة الإدارة',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    ghToken: 'رمز GitHub (للنشر)',
    ghTokenHelp: 'أنشئ رمزًا من: github.com → Settings → Developer settings → Personal access tokens',
    login: 'دخول',
    logout: 'تسجيل الخروج',
    wrongCreds: 'بيانات الاعتماد غير صحيحة.',
    selectModule: 'اختر الوحدة',
    selectLesson: 'اختر الدرس',
    editContent: 'تعديل المحتوى',
    editLinks: 'تعديل الروابط',
    blockType: 'النوع',
    blockContent: 'المحتوى',
    linkUrl: 'رابط URL',
    linkLabel: 'نص الزر',
    save: 'حفظ',
    publish: 'نشر على الموقع',
    publishing: 'جارٍ النشر…',
    published: '✅ تم النشر بنجاح!',
    publishError: '❌ خطأ في النشر:',
    noLinks: 'لا توجد روابط في هذا الدرس.',
    noToken: 'يرجى إدخال رمز GitHub للنشر.',
    intro: 'المقدمة',
    langBtn: 'Français',
    close: 'إغلاق',
    tokenSaved: 'تم حفظ الرمز.',
    allModules: 'الكل',
  },
};

// ── GitHub helpers ───────────────────────────────────────────
const GITHUB_OWNER = 'faculty-edu-french';
const GITHUB_REPO = 'project';
const GITHUB_BRANCH = 'main';

const FILE_MAP: Record<string, string> = {
  intro: 'src/intro.json',
  module1: 'src/module1_refined.json',
  module2: 'src/module2_refined.json',
  module3: 'src/module3_refined.json',
  module4: 'src/module4_refined.json',
};

async function githubGetFile(path: string, token: string) {
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}&_=${Date.now()}`,
    {
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
      cache: 'no-store',
    }
  );
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  return res.json();
}

async function githubPutFile(path: string, token: string, content: string, sha: string, message: string) {
  const encoded = btoa(unescape(encodeURIComponent(content)));
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${path}`,
    {
      method: 'PUT',
      headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: encoded, sha, branch: GITHUB_BRANCH }),
    }
  );
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `GitHub PUT failed: ${res.status}`);
  }
  return res.json();
}

// ── Types ────────────────────────────────────────────────────
type Block = Record<string, any>;
type Lesson = { id: string; title: string; blocks: Block[] };
type ModuleData = { moduleTitle?: string; title?: string; lessons?: Lesson[]; blocks?: Block[] };

// ── Main Component ───────────────────────────────────────────
interface AdminPanelProps {
  onClose: () => void;
  allData: Record<string, ModuleData>;
}

export default function AdminPanel({ onClose, allData }: AdminPanelProps) {
  const [lang, setLang] = useState<'fr' | 'ar'>('fr');
  const t = (k: string) => T[lang][k] || k;
  const isRtl = lang === 'ar';

  // Auth
  const [authed, setAuthed] = useState(false);
  const [uInput, setUInput] = useState('');
  const [pInput, setPInput] = useState('');
  const [tokenInput, setTokenInput] = useState<string>(() => localStorage.getItem('admin_gh_token') || '');
  const [loginErr, setLoginErr] = useState('');

  // Load token automatically from public config (works for all users)
  useEffect(() => {
    if (!tokenInput) {
      const base = import.meta.env.BASE_URL || '/';
      fetch(`${base}admin_cfg.json`)
        .then(r => r.json())
        .then(cfg => {
          const tok = (cfg.k as number[]).map((n: number) => String.fromCharCode(n)).join('');
          localStorage.setItem('admin_gh_token', tok);
          setTokenInput(tok);
        })
        .catch(() => {});
    }
  }, []);

  // Navigation
  const [selectedModule, setSelectedModule] = useState<string>('intro');
  const [selectedLesson, setSelectedLesson] = useState<string>('intro');
  const [tab, setTab] = useState<'content' | 'links'>('content');

  // Editable data (deep clone of allData)
  const [editData, setEditData] = useState<Record<string, ModuleData>>(() =>
    JSON.parse(JSON.stringify(allData))
  );

  // Publish state
  const [publishStatus, setPublishStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [publishMsg, setPublishMsg] = useState('');

  // ── Login ──────────────────────────────────────────────────
  const handleLogin = () => {
    if (uInput === 'minia' && pInput === 'minia') {
      if (tokenInput.trim()) localStorage.setItem('admin_gh_token', tokenInput.trim());
      setAuthed(true);
      setLoginErr('');
    } else {
      setLoginErr(t('wrongCreds'));
    }
  };

  // ── Get current blocks ─────────────────────────────────────
  const getCurrentBlocks = (): Block[] => {
    if (selectedModule === 'intro') {
      return editData.intro?.blocks || [];
    }
    const mod = editData[selectedModule];
    if (!mod?.lessons) return [];
    const lesson = mod.lessons.find(l => l.id === selectedLesson);
    return lesson?.blocks || [];
  };

  const setCurrentBlocks = (blocks: Block[]) => {
    setEditData(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (selectedModule === 'intro') {
        next.intro.blocks = blocks;
      } else {
        const lessonIdx = next[selectedModule]?.lessons?.findIndex((l: Lesson) => l.id === selectedLesson);
        if (lessonIdx !== undefined && lessonIdx >= 0) {
          next[selectedModule].lessons[lessonIdx].blocks = blocks;
        }
      }
      return next;
    });
  };

  const updateBlock = (idx: number, field: string, value: string) => {
    const blocks = [...getCurrentBlocks()];
    blocks[idx] = { ...blocks[idx], [field]: value };
    setCurrentBlocks(blocks);
  };

  // ── Lessons for selected module ────────────────────────────
  const getLessons = (): { id: string; title: string }[] => {
    if (selectedModule === 'intro') return [];
    return editData[selectedModule]?.lessons?.map(l => ({ id: l.id, title: l.title })) || [];
  };

  const handleModuleChange = (mod: string) => {
    setSelectedModule(mod);
    setPublishStatus('idle');
    if (mod === 'intro') {
      setSelectedLesson('intro');
    } else {
      const lessons = editData[mod]?.lessons || [];
      setSelectedLesson(lessons[0]?.id || '');
    }
  };

  // ── Publish ────────────────────────────────────────────────
  const handlePublish = async () => {
    const token = tokenInput.trim();
    if (!token) { setPublishStatus('error'); setPublishMsg(t('noToken')); return; }

    // Determine which file(s) to publish
    const fileKey = selectedModule === 'intro' ? 'intro' : selectedModule;
    const filePath = FILE_MAP[fileKey];
    if (!filePath) return;

    setPublishStatus('loading');
    setPublishMsg('');
    try {
      // Get current SHA
      const existing = await githubGetFile(filePath, token);
      const sha = existing.sha;
      // Prepare content
      let contentObj: any;
      if (fileKey === 'intro') {
        contentObj = editData.intro;
      } else {
        contentObj = editData[fileKey];
      }
      const contentStr = JSON.stringify(contentObj, null, 2);
      const commitMsg = `admin: update content [${fileKey}] via admin panel`;
      await githubPutFile(filePath, token, contentStr, sha, commitMsg);
      setPublishStatus('ok');
      setPublishMsg(t('published'));
    } catch (e: any) {
      setPublishStatus('error');
      setPublishMsg(`${t('publishError')} ${e.message}`);
    }
  };

  // ── Render: Login ──────────────────────────────────────────
  if (!authed) {
    return (
      <div style={overlayStyle}>
        <div style={{ ...modalStyle, maxWidth: 420, direction: isRtl ? 'rtl' : 'ltr' }}>
          <div style={modalHeaderStyle}>
            <span style={{ fontSize: '1.5rem' }}>🔐</span>
            <h2 style={modalTitleStyle}>{t('title')}</h2>
            <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} style={langBtnStyle}>{t('langBtn')}</button>
            <button onClick={onClose} style={closeBtnStyle}>✕</button>
          </div>
          <div style={{ padding: '2rem' }}>
            <label style={labelStyle}>{t('username')}</label>
            <input style={inputStyle} value={uInput} onChange={e => setUInput(e.target.value)} autoComplete="username" />
            <label style={labelStyle}>{t('password')}</label>
            <input style={inputStyle} type="password" value={pInput} onChange={e => setPInput(e.target.value)} autoComplete="current-password" onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            {loginErr && <p style={{ color: '#ef4444', fontWeight: 600, marginBottom: '1rem', marginTop: '1rem' }}>{loginErr}</p>}
            <button style={primaryBtnStyle} onClick={handleLogin}>{t('login')}</button>
          </div>
        </div>
      </div>
    );
  }

  // ── Render: Panel ──────────────────────────────────────────
  const blocks = getCurrentBlocks();
  const linkBlocks = (blocks.map((b, i) => ({ ...b, _idx: i })) as (Block & { _idx: number })[]).filter(b => b.type === 'link');
  const modules = [
    { key: 'intro', label: t('intro') },
    { key: 'module1', label: 'Module 1' },
    { key: 'module2', label: 'Module 2' },
    { key: 'module3', label: 'Module 3' },
    { key: 'module4', label: 'Module 4' },
  ];

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: 780, maxHeight: '90vh', display: 'flex', flexDirection: 'column', direction: isRtl ? 'rtl' : 'ltr' }}>
        {/* Header */}
        <div style={modalHeaderStyle}>
          <span style={{ fontSize: '1.3rem' }}>⚙️</span>
          <h2 style={{ ...modalTitleStyle, flex: 1 }}>{t('title')}</h2>
          <button onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')} style={langBtnStyle}>{t('langBtn')}</button>
          <button onClick={() => setAuthed(false)} style={{ ...langBtnStyle, background: '#fee2e2', color: '#dc2626' }}>{t('logout')}</button>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        {/* Navigation row */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <select style={selectStyle} value={selectedModule} onChange={e => handleModuleChange(e.target.value)}>
            {modules.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
          </select>

          {selectedModule !== 'intro' && getLessons().length > 0 && (
            <select style={selectStyle} value={selectedLesson} onChange={e => { setSelectedLesson(e.target.value); setPublishStatus('idle'); }}>
              {getLessons().map(l => <option key={l.id} value={l.id}>{l.title.length > 50 ? l.title.slice(0, 50) + '…' : l.title}</option>)}
            </select>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
            <button onClick={() => setTab('content')} style={{ ...tabBtnStyle, background: tab === 'content' ? '#3b82f6' : '#f1f5f9', color: tab === 'content' ? '#fff' : '#475569' }}>{t('editContent')}</button>
            <button onClick={() => setTab('links')} style={{ ...tabBtnStyle, background: tab === 'links' ? '#3b82f6' : '#f1f5f9', color: tab === 'links' ? '#fff' : '#475569' }}>{t('editLinks')}</button>
          </div>
        </div>

        {/* Scrollable editor area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {tab === 'content' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {blocks.map((block, idx) => (
                <BlockEditor key={idx} block={block} idx={idx} onUpdate={updateBlock} lang={lang} />
              ))}
            </div>
          )}

          {tab === 'links' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {linkBlocks.length === 0 && (
                <p style={{ color: '#94a3b8', textAlign: 'center', padding: '2rem' }}>{t('noLinks')}</p>
              )}
              {linkBlocks.map(block => (
                <div key={block._idx} style={cardStyle}>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={typeBadgeStyle}>link</span>
                    <span style={{ fontSize: '0.85rem', color: '#64748b' }}>Block #{block._idx + 1}</span>
                  </div>
                  <label style={labelStyle}>{t('linkLabel')}</label>
                  <input style={inputStyle} value={block.label || ''} onChange={e => updateBlock(block._idx, 'label', e.target.value)} />
                  <label style={labelStyle}>{t('linkUrl')}</label>
                  <input style={inputStyle} value={block.url || block.content || ''} onChange={e => { updateBlock(block._idx, 'url', e.target.value); updateBlock(block._idx, 'content', e.target.value); }} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer: publish */}
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {publishStatus === 'ok' && <span style={{ color: '#16a34a', fontWeight: 600, fontSize: '0.9rem' }}>{publishMsg}</span>}
          {publishStatus === 'error' && <span style={{ color: '#dc2626', fontWeight: 600, fontSize: '0.9rem', flex: 1 }}>{publishMsg}</span>}
          <div style={{ marginLeft: 'auto', display: 'flex', gap: '0.75rem' }}>
            <button onClick={onClose} style={{ ...tabBtnStyle, background: '#f1f5f9', color: '#475569' }}>{t('close')}</button>
            <button
              onClick={handlePublish}
              disabled={publishStatus === 'loading'}
              style={{ ...primaryBtnStyle, width: 'auto', padding: '0.6rem 1.5rem', opacity: publishStatus === 'loading' ? 0.7 : 1 }}
            >
              {publishStatus === 'loading' ? t('publishing') : `🚀 ${t('publish')}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Block Editor sub-component ────────────────────────────────
const EDITABLE_TYPES = ['header', 'paragraph', 'task', 'instruction', 'question', 'list_item', 'objective', 'phase', 'info_box', 'text', 'section_title', 'link'];
const MULTILINE_TYPES = ['paragraph', 'task', 'instruction', 'info_box', 'objective', 'list_item', 'text'];

function BlockEditor({ block, idx, onUpdate, lang }: { block: Block; idx: number; onUpdate: (i: number, f: string, v: string) => void; lang: string }) {
  const isRtl = lang === 'ar';
  if (!EDITABLE_TYPES.includes(block.type)) return null;

  const isMulti = MULTILINE_TYPES.includes(block.type);
  const t = (k: string) => T[lang][k] || k;

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', marginBottom: '0.75rem' }}>
        <span style={typeBadgeStyle}>{block.type}</span>
        <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>#{idx + 1}</span>
      </div>

      {block.type === 'link' ? (
        <>
          <label style={labelStyle}>{t('linkLabel')}</label>
          <input style={{ ...inputStyle, direction: isRtl ? 'rtl' : 'ltr' }} value={block.label || ''} onChange={e => onUpdate(idx, 'label', e.target.value)} />
          <label style={labelStyle}>{t('linkUrl')}</label>
          <input style={inputStyle} value={block.url || block.content || ''} onChange={e => { onUpdate(idx, 'url', e.target.value); onUpdate(idx, 'content', e.target.value); }} />
        </>
      ) : (
        <>
          <label style={labelStyle}>{t('blockContent')}</label>
          {isMulti ? (
            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }}
              value={block.content || ''}
              onChange={e => onUpdate(idx, 'content', e.target.value)}
            />
          ) : (
            <input style={inputStyle} value={block.content || ''} onChange={e => onUpdate(idx, 'content', e.target.value)} />
          )}
        </>
      )}
    </div>
  );
}

// ── Styles ────────────────────────────────────────────────────
const overlayStyle: React.CSSProperties = {
  position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9999,
  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
};
const modalStyle: React.CSSProperties = {
  background: '#fff', borderRadius: '16px', boxShadow: '0 25px 60px rgba(0,0,0,0.35)',
  width: '100%', overflow: 'hidden',
};
const modalHeaderStyle: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '0.75rem',
  padding: '1rem 1.5rem', borderBottom: '1px solid #e2e8f0',
  background: 'linear-gradient(135deg, #1e40af, #3b82f6)',
};
const modalTitleStyle: React.CSSProperties = {
  margin: 0, color: '#fff', fontSize: '1.1rem', fontWeight: 700,
};
const closeBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
  borderRadius: '8px', cursor: 'pointer', padding: '0.35rem 0.6rem', fontSize: '1rem',
};
const langBtnStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
  color: '#fff', borderRadius: '8px', cursor: 'pointer', padding: '0.35rem 0.75rem',
  fontSize: '0.85rem', fontWeight: 600,
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.82rem', fontWeight: 600,
  color: '#475569', marginBottom: '0.35rem', marginTop: '0.75rem',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '0.6rem 0.85rem', border: '1px solid #cbd5e1',
  borderRadius: '8px', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
  background: '#f8fafc', color: '#1e293b',
};
const primaryBtnStyle: React.CSSProperties = {
  width: '100%', padding: '0.75rem', background: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
  color: '#fff', border: 'none', borderRadius: '10px', fontSize: '1rem',
  fontWeight: 700, cursor: 'pointer', marginTop: '1rem',
};
const selectStyle: React.CSSProperties = {
  padding: '0.5rem 0.85rem', border: '1px solid #cbd5e1', borderRadius: '8px',
  fontSize: '0.9rem', background: '#f8fafc', color: '#1e293b', cursor: 'pointer', outline: 'none',
};
const tabBtnStyle: React.CSSProperties = {
  padding: '0.5rem 1rem', borderRadius: '8px', border: 'none',
  cursor: 'pointer', fontWeight: 600, fontSize: '0.875rem',
};
const cardStyle: React.CSSProperties = {
  background: '#f8fafc', borderRadius: '12px', padding: '1rem 1.25rem',
  border: '1px solid #e2e8f0',
};
const typeBadgeStyle: React.CSSProperties = {
  background: '#eff6ff', color: '#1d4ed8', borderRadius: '6px',
  padding: '0.15rem 0.6rem', fontSize: '0.78rem', fontWeight: 700, fontFamily: 'monospace',
};
