import React, { useEffect, useState, useCallback } from 'react';
import {
  fetchCategories,
  getUserInterests,
  saveUserInterests,
} from '../api';

interface InterestsPageProps {
  onLogout: () => void;
  userEmail: string;
}

const InterestsPage: React.FC<InterestsPageProps> = ({ onLogout, userEmail }) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [initialSelectedIds, setInitialSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [saving, setSaving] = useState(false);
  const LIMIT = 6;

  // Fetch categories for current page
  const loadCategories = useCallback(async () => {
    try {
      const res = await fetchCategories(currentPage, LIMIT);
      setCategories(res.data.categories);
      setTotalPages(Math.ceil(res.data.total / LIMIT));
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  }, [currentPage]);

  // Fetch user's saved interests
  const loadUserInterests = useCallback(async () => {
    try {
      const res = await getUserInterests(userEmail);
      const ids = res.data.categoryIds || [];
      setSelectedIds(ids);
      setInitialSelectedIds(ids);
    } catch (err) {
      console.error('Error fetching user interests:', err);
    }
  }, [userEmail]);

  // Save updated interests
  const saveInterests = useCallback(async () => {
    try {
      setSaving(true);
      await saveUserInterests(userEmail, selectedIds);
      setInitialSelectedIds(selectedIds);
    } catch (err) {
      console.error('Error saving interests:', err);
    } finally {
      setSaving(false);
    }
  }, [userEmail, selectedIds]);

  useEffect(() => {
    loadCategories();
    loadUserInterests();
  }, [loadCategories, loadUserInterests]);

  const toggleCategory = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const hasChanges =
    JSON.stringify(initialSelectedIds.sort()) !== JSON.stringify(selectedIds.sort());

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Please mark your interests!
        </h2>
        <p className="text-gray-600 text-sm">We will keep you notified.</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          My saved interests
        </h3>

        <div className="space-y-4">
          {categories.length === 0 ? (
            <p className="text-sm text-gray-500">No categories found.</p>
          ) : (
            categories.map((cat) => {
              const isSelected = selectedIds.includes(cat._id);

              return (
                <label key={cat._id} className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleCategory(cat._id)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-black border-black'
                          : 'bg-white border-gray-300 group-hover:border-gray-400'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-3 h-3 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <span className="ml-3 text-gray-800 text-sm group-hover:text-black transition-colors duration-200">
                    {cat.name}
                  </span>
                </label>
              );
            })
          )}
        </div>

        {/* Save Button */}
        <div className="mt-6">
          <button
            onClick={saveInterests}
            disabled={!hasChanges || saving}
            className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
              hasChanges
                ? 'bg-black text-white hover:bg-gray-800'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {saving ? 'Saving...' : 'Save Interests'}
          </button>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 hover:text-gray-700 disabled:text-gray-300"
          >
            &lt;
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded transition-all duration-200 ${
                currentPage === i + 1
                  ? 'text-black font-semibold'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 hover:text-gray-700 disabled:text-gray-300"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Logout */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <button
          onClick={onLogout}
          className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium text-sm hover:bg-gray-200 transition-all duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default InterestsPage;
