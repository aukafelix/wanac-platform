export default function QuizCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-center">
      <p className="text-sm text-gray-500">Quiz Result</p>
      <p className="text-3xl font-bold text-green-600">100%</p>
      <a href="#" className="text-blue-500 text-sm underline mt-2 inline-block">View Details</a>
    </div>
  );
}