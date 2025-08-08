export default function AssignmentCard() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between text-sm text-gray-700">
      <div>
        <p className="font-medium text-gray-800">Available From:</p>
        <p className="text-gray-500">April 24, 2025</p>
      </div>
      <div>
        <p className="font-medium text-gray-800">Due Date:</p>
        <p className="text-gray-500">April 28, 2025</p>
      </div>
    </div>
  );
}