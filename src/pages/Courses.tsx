import { useState } from 'react';
import { Plus, Edit, Trash2, Play, Lock, Save, X, ChevronDown, FileText, GripVertical } from 'lucide-react';

interface Video { id: string; title: string; videoUrl: string; duration: number; }
interface SubModule { id: string; title: string; description: string; videos: Video[]; }
interface Module { id: string; title: string; isFree: boolean; submodules: SubModule[]; }
interface Course { id: string; title: string; description: string; thumbnail: string; status: 'published' | 'draft'; modules: Module[]; }

const initialCourses: Course[] = [
  {
    id: '1', title: 'Make Your First ₦10k-₦50k Online', status: 'published',
    description: 'The ultimate beginner guide to earning money online with proven strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=600&h=400&fit=crop',
    modules: [
      { id: 'm1', title: 'Module 1: Introduction', isFree: true, submodules: [
        { id: 's1', title: 'What is Online Income?', description: 'Understanding various ways to earn money online.', videos: [{ id: 'v1', title: 'Introduction Video', videoUrl: '', duration: 300 }] },
      ]},
      { id: 'm2', title: 'Module 2: Getting Started', isFree: false, submodules: [
        { id: 's2', title: 'Choosing Your Niche', description: 'How to pick a profitable niche.', videos: [{ id: 'v2', title: 'Niche Selection', videoUrl: '', duration: 600 }] },
      ]},
    ],
  },
  {
    id: '2', title: 'WhatsApp Monetization Basics', status: 'published',
    description: 'Turn your WhatsApp into a money-making machine.',
    thumbnail: 'https://images.unsplash.com/photo-1611746872915-64382b5c2b36?w=600&h=400&fit=crop',
    modules: [
      { id: 'm3', title: 'Module 1: Getting Started', isFree: true, submodules: [
        { id: 's3', title: 'WhatsApp Business Setup', description: 'Setting up WhatsApp Business for profit.', videos: [{ id: 'v3', title: 'Business Setup', videoUrl: '', duration: 400 }] },
      ]},
    ],
  },
];

const defaultCourseForm = { title: '', description: '', thumbnail: '', status: 'draft' as 'published' | 'draft' };
const defaultModuleForm = { title: '', isFree: false };

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [activeTab, setActiveTab] = useState<'courses' | 'modules'>('courses');
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);

  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseForm, setCourseForm] = useState(defaultCourseForm);

  const [showModuleModal, setShowModuleModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [moduleForm, setModuleForm] = useState(defaultModuleForm);

  const openCourseModal = (course?: Course) => {
    setEditingCourse(course ?? null);
    setCourseForm(course ? { title: course.title, description: course.description, thumbnail: course.thumbnail, status: course.status } : defaultCourseForm);
    setShowCourseModal(true);
  };

  const saveCourse = () => {
    if (editingCourse) {
      setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...courseForm } : c));
    } else {
      setCourses([...courses, { id: Date.now().toString(), ...courseForm, modules: [] }]);
    }
    setShowCourseModal(false);
  };

  const deleteCourse = (id: string) => {
    if (confirm('Delete this course and all its content?')) setCourses(courses.filter(c => c.id !== id));
  };

  const openModuleModal = (courseId: string, module?: Module) => {
    setSelectedCourseId(courseId);
    setEditingModule(module ?? null);
    setModuleForm(module ? { title: module.title, isFree: module.isFree } : defaultModuleForm);
    setShowModuleModal(true);
  };

  const saveModule = () => {
    setCourses(courses.map(c => {
      if (c.id !== selectedCourseId) return c;
      if (editingModule) {
        return { ...c, modules: c.modules.map(m => m.id === editingModule.id ? { ...m, ...moduleForm } : m) };
      }
      return { ...c, modules: [...c.modules, { id: Date.now().toString(), ...moduleForm, submodules: [] }] };
    }));
    setShowModuleModal(false);
  };

  const deleteModule = (courseId: string, moduleId: string) => {
    if (confirm('Delete this module and all its content?')) {
      setCourses(courses.map(c => c.id === courseId ? { ...c, modules: c.modules.filter(m => m.id !== moduleId) } : c));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Course Management</h1>
          <p className="text-gray-500 text-sm">Create and manage courses, modules, and content</p>
        </div>
        <button
          onClick={() => openCourseModal()}
          className="text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold"
          style={{ background: '#F5820A' }}
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      <div className="flex gap-1 border-b border-gray-200">
        {(['courses', 'modules'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 font-medium text-sm capitalize transition-colors ${activeTab === tab ? 'border-b-2 border-amber-500' : 'text-gray-500 hover:text-gray-700'}`}
            style={activeTab === tab ? { color: '#F5820A' } : {}}
          >
            {tab === 'courses' ? `Courses (${courses.length})` : 'All Modules'}
          </button>
        ))}
      </div>

      {activeTab === 'courses' && (
        <div className="space-y-4">
          {courses.map(course => (
            <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-stretch">
                <div className="w-full h-44 sm:w-44 sm:h-auto shrink-0">
                  <img src={course.thumbnail || 'https://via.placeholder.com/200x150'} alt={course.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold">{course.title}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs ${course.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {course.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Play size={13} /> {course.modules.length} Modules</span>
                        <span className="flex items-center gap-1"><FileText size={13} /> {course.modules.reduce((s, m) => s + m.submodules.length, 0)} Submodules</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => openCourseModal(course)} className="p-2 hover:bg-gray-100 rounded-lg"><Edit size={16} className="text-gray-500" /></button>
                      <button onClick={() => deleteCourse(course.id)} className="p-2 hover:bg-gray-100 rounded-lg"><Trash2 size={16} className="text-red-500" /></button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-100">
                <button
                  onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  className="w-full px-5 py-3 flex items-center justify-between hover:bg-gray-50 text-sm font-medium"
                >
                  <span>Manage Modules ({course.modules.length})</span>
                  <ChevronDown size={18} className={`transition-transform text-gray-400 ${expandedCourse === course.id ? 'rotate-180' : ''}`} />
                </button>

                {expandedCourse === course.id && (
                  <div className="px-5 pb-4 space-y-3">
                    <button
                      onClick={() => openModuleModal(course.id)}
                      className="text-sm font-medium flex items-center gap-1 hover:underline"
                      style={{ color: '#F5820A' }}
                    >
                      <Plus size={15} /> Add Module
                    </button>
                    {course.modules.map((module, idx) => (
                      <div key={module.id} className="border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-t-lg">
                          <div className="flex items-center gap-2">
                            <GripVertical size={15} className="text-gray-400" />
                            <span className="font-medium text-sm">Module {idx + 1}: {module.title}</span>
                            {module.isFree
                              ? <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"><Play size={11} /> Free</span>
                              : <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded"><Lock size={11} /> Locked</span>
                            }
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => openModuleModal(course.id, module)} className="p-1 hover:bg-gray-200 rounded"><Edit size={13} className="text-gray-500" /></button>
                            <button onClick={() => deleteModule(course.id, module.id)} className="p-1 hover:bg-gray-200 rounded"><Trash2 size={13} className="text-red-500" /></button>
                          </div>
                        </div>
                        <p className="px-3 py-2 text-xs text-gray-500">{module.submodules.length} submodules</p>
                      </div>
                    ))}
                    {course.modules.length === 0 && <p className="text-sm text-gray-400 italic">No modules yet.</p>}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'modules' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full min-w-140">
            <thead className="bg-gray-50">
              <tr>
                {['Course', 'Module', 'Access', 'Submodules', 'Actions'].map(h => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.flatMap(c => c.modules.map(m => ({ course: c, module: m }))).map(({ course, module }) => (
                <tr key={module.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 text-gray-500 text-sm">{course.title}</td>
                  <td className="px-5 py-4 font-medium text-sm">{module.title}</td>
                  <td className="px-5 py-4">
                    {module.isFree
                      ? <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded w-fit"><Play size={11} /> Free</span>
                      : <span className="flex items-center gap-1 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded w-fit"><Lock size={11} /> Locked</span>
                    }
                  </td>
                  <td className="px-5 py-4 text-gray-500 text-sm">{module.submodules.length}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1">
                      <button onClick={() => openModuleModal(course.id, module)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Edit size={15} className="text-gray-500" /></button>
                      <button onClick={() => deleteModule(course.id, module.id)} className="p-1.5 hover:bg-gray-100 rounded-lg"><Trash2 size={15} className="text-red-500" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      )}

      {showCourseModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{editingCourse ? 'Edit Course' : 'Create New Course'}</h3>
              <button onClick={() => setShowCourseModal(false)}><X size={22} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Course Title</label>
                <input type="text" value={courseForm.title} onChange={e => setCourseForm({ ...courseForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:border-amber-500 text-sm"
                  placeholder="e.g., Make Your First ₦50k Online" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
                <textarea value={courseForm.description} onChange={e => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:border-amber-500 text-sm" rows={3}
                  placeholder="Describe what students will learn..." />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Thumbnail URL</label>
                <div className="flex gap-2">
                  <input type="text" value={courseForm.thumbnail} onChange={e => setCourseForm({ ...courseForm, thumbnail: e.target.value })}
                    className="flex-1 border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:border-amber-500 text-sm" placeholder="https://..." />
                  {courseForm.thumbnail && <img src={courseForm.thumbnail} alt="Preview" className="w-14 h-14 object-cover rounded-lg" />}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Status</label>
                <select value={courseForm.status} onChange={e => setCourseForm({ ...courseForm, status: e.target.value as Course['status'] })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:border-amber-500 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowCourseModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={saveCourse} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={16} /> Save Course
              </button>
            </div>
          </div>
        </div>
      )}

      {showModuleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold">{editingModule ? 'Edit Module' : 'Add Module'}</h3>
              <button onClick={() => setShowModuleModal(false)}><X size={22} className="text-gray-400" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Module Title</label>
                <input type="text" value={moduleForm.title} onChange={e => setModuleForm({ ...moduleForm, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm" placeholder="e.g., Module 1: Introduction" />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={moduleForm.isFree} onChange={e => setModuleForm({ ...moduleForm, isFree: e.target.checked })}
                  className="w-4 h-4 rounded accent-amber-500" />
                <span className="text-sm font-medium text-gray-700">Free module (available during trial)</span>
              </label>
            </div>
            <div className="flex gap-2 mt-6">
              <button onClick={() => setShowModuleModal(false)} className="flex-1 border border-gray-300 py-2.5 rounded-xl text-sm hover:bg-gray-50">Cancel</button>
              <button onClick={saveModule} className="flex-1 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2" style={{ background: '#F5820A' }}>
                <Save size={16} /> Save Module
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
