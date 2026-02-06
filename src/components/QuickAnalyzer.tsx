import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bed, Bath, Square, TreePine } from 'lucide-react';

const QuickAnalyzer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    beds: 3,
    baths: 2,
    sqft: 1800,
    lot: 0.25,
  });

  const handleChange = (field: string, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePredict = () => {
    navigate('/analyzer', { state: formData });
  };

  return (
    <div className="bg-card rounded-3xl p-6 md:p-8 shadow-soft">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {/* Beds */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Bed className="w-4 h-4" />
            Beds
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange('beds', Math.max(1, formData.beds - 1))}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium text-foreground">{formData.beds}</span>
            <button
              onClick={() => handleChange('beds', formData.beds + 1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Baths */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Bath className="w-4 h-4" />
            Baths
          </label>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChange('baths', Math.max(1, formData.baths - 1))}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              -
            </button>
            <span className="w-8 text-center font-medium text-foreground">{formData.baths}</span>
            <button
              onClick={() => handleChange('baths', formData.baths + 1)}
              className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* Sqft */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Square className="w-4 h-4" />
            Sq Ft
          </label>
          <input
            type="number"
            value={formData.sqft}
            onChange={(e) => handleChange('sqft', parseInt(e.target.value) || 0)}
            className="input-calm text-center"
          />
        </div>

        {/* Lot */}
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <TreePine className="w-4 h-4" />
            Lot (acres)
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.lot}
            onChange={(e) => handleChange('lot', parseFloat(e.target.value) || 0)}
            className="input-calm text-center"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex justify-center">
        <button onClick={handlePredict} className="btn-primary px-10">
          Predict Price
        </button>
      </div>
    </div>
  );
};

export default QuickAnalyzer;
