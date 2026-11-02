import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Layers, Sliders } from 'lucide-react';
import { ADMIN_CATEGORIES, Category, SubCategory, CustomField } from '../data/categories';

export const CategoryFieldBuilder: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(ADMIN_CATEGORIES);
  const [selectedCatId, setSelectedCatId] = useState<number>(categories[0].id);
  const [selectedSubcatId, setSelectedSubcatId] = useState<number>(categories[0].subcategories[0].id);

  // New field form state
  const [newFieldName, setNewFieldName] = useState('');
  const [newLabelEn, setNewLabelEn] = useState('');
  const [newLabelTa, setNewLabelTa] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select'>('select');
  const [newOptions, setNewOptions] = useState('');
  const [isRequired, setIsRequired] = useState(false);

  const currentCat = categories.find((c: Category) => c.id === selectedCatId);
  const currentSubcat = currentCat?.subcategories.find((s: SubCategory) => s.id === selectedSubcatId);

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName || !newLabelEn) return;

    const parsedOptions = newOptions ? newOptions.split(',').map((s: string) => s.trim()).filter(Boolean) : [];

    const newField: CustomField = {
      field_name: newFieldName.toLowerCase().replace(/\s+/g, '_'),
      label_en: newLabelEn,
      label_ta: newLabelTa || newLabelEn,
      field_type: newFieldType,
      options: parsedOptions,
      is_required: isRequired
    };

    setCategories((prev: Category[]) => prev.map((cat: Category) => {
      if (cat.id !== selectedCatId) return cat;
      return {
        ...cat,
        subcategories: cat.subcategories.map((sub: SubCategory) => {
          if (sub.id !== selectedSubcatId) return sub;
          return {
            ...sub,
            fields: [...sub.fields, newField]
          };
        })
      };
    }));

    // Reset inputs
    setNewFieldName('');
    setNewLabelEn('');
    setNewLabelTa('');
    setNewOptions('');
    alert(`Custom field "${newLabelEn}" added to ${currentSubcat?.name_en} without changing application code!`);
  };

  const handleRemoveField = (fieldName: string) => {
    setCategories((prev: Category[]) => prev.map((cat: Category) => {
      if (cat.id !== selectedCatId) return cat;
      return {
        ...cat,
        subcategories: cat.subcategories.map((sub: SubCategory) => {
          if (sub.id !== selectedSubcatId) return sub;
          return {
            ...sub,
            fields: sub.fields.filter((f: CustomField) => f.field_name !== fieldName)
          };
        })
      };
    }));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">Dynamic Category Form Builder</h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure categories, subcategories, and dynamic specification fields with zero code deployments.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Step 1: Select Category & Subcategory */}
        <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-5 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Select Category</span>
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Category</label>
            <select
              value={selectedCatId}
              onChange={(e) => {
                const id = Number(e.target.value);
                setSelectedCatId(id);
                const firstSub = categories.find((c: Category) => c.id === id)?.subcategories[0]?.id;
                if (firstSub) setSelectedSubcatId(firstSub);
              }}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
            >
              {categories.map((c: Category) => (
                <option key={c.id} value={c.id}>{c.name_en} ({c.name_ta})</option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs text-slate-400">Subcategory</label>
            <select
              value={selectedSubcatId}
              onChange={(e) => setSelectedSubcatId(Number(e.target.value))}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200"
            >
              {currentCat?.subcategories.map((s: SubCategory) => (
                <option key={s.id} value={s.id}>{s.name_en} ({s.name_ta})</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 2: Add New Dynamic Field Form */}
        <form onSubmit={handleAddField} className="lg:col-span-2 bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add Custom Field for {currentSubcat?.name_en}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">English Label *</label>
              <input
                type="text"
                placeholder="e.g. Battery Health (%)"
                value={newLabelEn}
                onChange={(e) => {
                  setNewLabelEn(e.target.value);
                  if (!newFieldName) setNewFieldName(e.target.value);
                }}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Tamil Label (விருப்பத்திற்குரியது)</label>
              <input
                type="text"
                placeholder="எ.கா. பேட்டரி தரம்"
                value={newLabelTa}
                onChange={(e) => setNewLabelTa(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Internal Field Key (system identifier)</label>
              <input
                type="text"
                placeholder="e.g. battery_health"
                value={newFieldName}
                onChange={(e) => setNewFieldName(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Field Input Type</label>
              <select
                value={newFieldType}
                onChange={(e) => setNewFieldType(e.target.value as any)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              >
                <option value="select">Dropdown Options (select)</option>
                <option value="text">Text Input (text)</option>
                <option value="number">Numeric (number)</option>
              </select>
            </div>
          </div>

          {newFieldType === 'select' && (
            <div className="space-y-1 pt-2">
              <label className="text-xs font-semibold text-slate-300">
                Dropdown Options <span className="text-slate-400 font-normal">(Comma-separated)</span>
              </label>
              <input
                type="text"
                placeholder="e.g. 100%, 90% - 99%, 80% - 89%, Below 80%"
                value={newOptions}
                onChange={(e) => setNewOptions(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <input
              type="checkbox"
              id="is_required"
              checked={isRequired}
              onChange={(e) => setIsRequired(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-400 bg-slate-900 border-slate-700"
            />
            <label htmlFor="is_required" className="text-xs text-slate-300 font-medium cursor-pointer">
              Mandatory field (Sellers must provide this value)
            </label>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-lg transition"
            >
              <Plus className="w-4 h-4" />
              Save Dynamic Field
            </button>
          </div>
        </form>

      </div>

      {/* Existing Configured Fields for this category */}
      <div className="bg-slate-800/80 border border-slate-700/70 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Configured Fields for: <span className="text-emerald-400">{currentCat?.name_en} &gt; {currentSubcat?.name_en}</span></span>
          </h2>
          <span className="text-xs bg-slate-900 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
            {currentSubcat?.fields.length || 0} Dynamic Fields
          </span>
        </div>

        {currentSubcat?.fields.length === 0 ? (
          <div className="text-center py-10 text-slate-400 text-xs">
            No custom fields configured for this subcategory yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Field Key</th>
                  <th className="py-2.5 px-3">English Label</th>
                  <th className="py-2.5 px-3">Tamil Label</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Options</th>
                  <th className="py-2.5 px-3">Required</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {currentSubcat?.fields.map((f: CustomField) => (
                  <tr key={f.field_name} className="hover:bg-slate-750">
                    <td className="py-3 px-3 font-mono text-emerald-400 font-semibold">{f.field_name}</td>
                    <td className="py-3 px-3 font-bold text-white">{f.label_en}</td>
                    <td className="py-3 px-3 text-slate-300">{f.label_ta}</td>
                    <td className="py-3 px-3 uppercase text-[10px] text-amber-400 font-bold">{f.field_type}</td>
                    <td className="py-3 px-3 text-slate-400 max-w-xs truncate">
                      {f.options.length > 0 ? f.options.join(', ') : '—'}
                    </td>
                    <td className="py-3 px-3">
                      {f.is_required ? (
                        <span className="text-emerald-400 font-bold">Yes</span>
                      ) : (
                        <span className="text-slate-500">Optional</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={() => handleRemoveField(f.field_name)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 transition"
                        title="Delete field"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
