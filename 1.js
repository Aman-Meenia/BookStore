// Regular expression pattern for a basic phone number validation
const phoneNumberPattern = /^\d{10}$/;

function validatePhoneNumber(phoneNumber) {
  return phoneNumberPattern.test(phoneNumber);
}

// Example usage:
const phoneNumber = "1a12457890"; // Replace this with the phone number you want to validate
if (validatePhoneNumber(phoneNumber)) {
  console.log("Phone number is valid.");
} else {
  console.log("Phone number is invalid.");
}

// select one thing out of this

<div>
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Category
  </label>
  <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
    <option selected="">Electronics</option>
    <option value="TV">TV/Monitors</option>
    <option value="PC">PC</option>
    <option value="GA">Gaming/Console</option>
    <option value="PH">Phones</option>
  </select>
</div>;
