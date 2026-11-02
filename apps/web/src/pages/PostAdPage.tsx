import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Upload, 
  MapPin, 
  Tag, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  X,
  AlertCircle
} from 'lucide-react';
import { MOCK_CATEGORIES, TAMIL_NADU_DISTRICTS } from '../data/mockData';

interface PostAdPageProps {
  language: 'en' | 'ta';
}

export const PostAdPage: React.FC<PostAdPageProps> = ({ language }) => {
  const navigate = useNavigate();

  // Multi-step: 1 = Category, 2 = Dynamic Fields & Specs, 3 = Photos & Details, 4 = Location & Price, 5 = Success
  const [step, setStep] = useState<number>(1);

  // Form State
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState<number | null>(null);
  const [dynamicValues, setDynamicValues] = useState<Record<string, any>>({});
  
  // Listing details
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [condition, setCondition] = useState('used_good');
  const [district, setDistrict] = useState(TAMIL_NADU_DISTRICTS[1]); // Default Chennai
  const [locality, setLocality] = useState('');
  const [phone, setPhone] = useState('');
  
  // Images (simulated uploads)
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80'
  ]);
  const [imageInput, setImageInput] = useState('');

  // Selected Category & Subcategory objects
  const selectedCat = MOCK_CATEGORIES.find(c => c.id === selectedCategoryId);
  const selectedSubcat = selectedCat?.subcategories.find(s => s.id === selectedSubcategoryId);

  const handleDynamicChange = (fieldName: string, value: any) => {
    setDynamicValues(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleAddImage = () => {
    if (imageInput.trim()) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(5); // Show success screen
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Stepper Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {language === 'en' ? 'Post Free Advertisement' : 'இலவச விளம்பரம் வெளியிடுக'}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Reach genuine local buyers across Tamil Nadu in minutes.
        </p>

        {/* Progress Pills */}
        <div className="grid grid-cols-4 gap-2 mt-6 text-center text-xs font-bold">
          <div className={`p-2 rounded-lg border ${step >= 1 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 text-gray-400'}`}>
            1. Category
          </div>
          <div className={`p-2 rounded-lg border ${step >= 2 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 text-gray-400'}`}>
            2. Specifications
          </div>
          <div className={`p-2 rounded-lg border ${step >= 3 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 text-gray-400'}`}>
            3. Photos & Details
          </div>
          <div className={`p-2 rounded-lg border ${step >= 4 ? 'bg-emerald-50 border-emerald-500 text-emerald-800' : 'bg-gray-50 text-gray-400'}`}>
            4. Price & Submit
          </div>
        </div>
      </div>

      {/* STEP 1: Select Category & Subcategory */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Tag className="w-5 h-5 text-emerald-600" />
            <span>Select a Category & Subtype</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition ${
                  selectedCategoryId === cat.id 
                    ? 'border-emerald-600 bg-emerald-50/50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-bold text-sm text-slate-900">{cat.name_en}</div>
                <div className="text-xs text-gray-500">{cat.name_ta}</div>
              </div>
            ))}
          </div>

          {/* Subcategories (Visible once Category is clicked) */}
          {selectedCat && (
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
                Choose Subcategory for {selectedCat.name_en}:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedCat.subcategories.map((sub) => (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => {
                      setSelectedSubcategoryId(sub.id);
                      setStep(2);
                    }}
                    className={`p-3 rounded-lg border text-left flex items-center justify-between text-xs font-semibold transition ${
                      selectedSubcategoryId === sub.id
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-gray-50 text-gray-800 hover:bg-gray-100 border-gray-200'
                    }`}
                  >
                    <span>{sub.name_en}</span>
                    <ChevronRight className="w-4 h-4 opacity-70" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Dynamic Category Form Fields */}
      {step === 2 && selectedSubcat && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {selectedSubcat.name_en} — Specifications
              </h2>
              <p className="text-xs text-gray-500">
                Category template loaded dynamically without hardcoded schemas.
              </p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {selectedSubcat.fields.length === 0 ? (
            <p className="text-xs text-gray-500 py-4">No custom fields for this category. Proceed to general details.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {selectedSubcat.fields.map((field) => (
                <div key={field.field_name} className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 flex items-center justify-between">
                    <span>{field.label_en} ({field.label_ta})</span>
                    {field.is_required && <span className="text-red-500">*</span>}
                  </label>

                  {field.field_type === 'select' ? (
                    <select
                      value={dynamicValues[field.field_name] || ''}
                      onChange={(e) => handleDynamicChange(field.field_name, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    >
                      <option value="">Select {field.label_en}</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.field_type === 'number' ? 'number' : 'text'}
                      placeholder={`Enter ${field.label_en}`}
                      value={dynamicValues[field.field_name] || ''}
                      onChange={(e) => handleDynamicChange(field.field_name, e.target.value)}
                      className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition"
            >
              Next: Photos & Description &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Photos, Title & Description */}
      {step === 3 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-900">
              Upload Photos & Product Details
            </h2>
            <button
              onClick={() => setStep(2)}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Photo Uploader */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
              Photos (Upload up to 10 images)
            </label>
            
            <div className="flex flex-wrap gap-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200 group">
                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full shadow"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  {idx === 0 && (
                    <span className="absolute bottom-0 inset-x-0 bg-slate-900/80 text-[9px] text-white text-center font-bold py-0.5">
                      Cover
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick URL Adder for demo */}
            <div className="flex items-center gap-2 max-w-md pt-2">
              <input
                type="text"
                placeholder="Paste Image URL (or upload from device)"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="flex-1 text-xs border border-gray-300 rounded-lg p-2 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddImage}
                className="bg-gray-100 hover:bg-gray-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-lg"
              >
                + Add Photo
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Advertisement Title *</label>
            <input
              type="text"
              required
              placeholder="e.g. 2021 Hyundai Creta SX Diesel Automatic Sunroof"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <span className="text-[10px] text-gray-400">Include key details: Brand, Model, Year, Condition</span>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Detailed Description *</label>
            <textarea
              rows={4}
              required
              placeholder="Describe what makes your item unique, reason for selling, maintenance history..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Item Condition */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Condition</label>
            <div className="flex gap-4 text-xs">
              {['new', 'like_new', 'used_good', 'used_fair'].map((c) => (
                <label key={c} className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="post_condition"
                    checked={condition === c}
                    onChange={() => setCondition(c)}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className="capitalize">{c.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-lg text-xs transition"
            >
              Next: Location & Price &rarr;
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Price, Location & Submit */}
      {step === 4 && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-slate-900">
              Set Price & Location
            </h2>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>

          {/* Price Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Set Price (₹ INR) *</label>
            <div className="relative max-w-xs">
              <span className="absolute left-3 top-2.5 text-gray-500 font-bold text-sm">₹</span>
              <input
                type="number"
                required
                placeholder="e.g. 25000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full pl-8 pr-3 py-2 text-sm font-bold border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
            <label className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span>Price is negotiable</span>
            </label>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">District (Tamil Nadu) *</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 bg-gray-50 focus:bg-white focus:outline-none"
              >
                {TAMIL_NADU_DISTRICTS.filter(d => d !== 'All Tamil Nadu').map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Locality / Area *</label>
              <input
                type="text"
                required
                placeholder="e.g. Anna Nagar, Velachery, RS Puram"
                value={locality}
                onChange={(e) => setLocality(e.target.value)}
                className="w-full text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Contact Verification */}
          <div className="space-y-1.5 pt-2 border-t border-gray-100">
            <label className="text-xs font-bold text-gray-700">Your Contact Mobile Number (OTP Verified) *</label>
            <input
              type="tel"
              required
              placeholder="+91 98765 43210"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full max-w-xs text-xs border border-gray-300 rounded-lg p-2.5 focus:outline-none"
            />
          </div>

          {/* Moderation Notice */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-emerald-700 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800 space-y-1">
              <span className="font-bold">Flacon Quality Assurance</span>
              <p>Your advertisement will undergo quick moderation to protect buyers from fraud. You can opt to upgrade to a Featured or Top Ad for instant priority placement.</p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3 rounded-xl shadow-md transition text-xs"
            >
              Submit Advertisement for Free
            </button>
          </div>
        </form>
      )}

      {/* STEP 5: Success Screen & Upsell Promotions */}
      {step === 5 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              Advertisement Submitted Successfully!
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto">
              Your advertisement is now in our moderation queue and will be published shortly across {district}.
            </p>
          </div>

          {/* Upsell to Featured / Top Ad */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-lg mx-auto text-left space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Want to sell 3x faster?</span>
            </div>
            <p className="text-xs text-amber-800">
              Promote your ad to the top of category searches in {district} starting from just ₹99.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/pricing')}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs shadow-sm transition"
              >
                Promote for ₹99 &rarr;
              </button>
              <button
                type="button"
                onClick={() => navigate('/browse')}
                className="text-xs font-semibold text-gray-600 hover:underline"
              >
                Skip, view other ads
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

