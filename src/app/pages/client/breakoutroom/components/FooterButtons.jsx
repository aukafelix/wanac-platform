export default function FooterButtons() {
  return (
    <div className="flex justify-between gap-4 mt-6">
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 w-full">
        View Experience
      </button>
      <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 w-full">
        View Summary
      </button>
    </div>
  );
}