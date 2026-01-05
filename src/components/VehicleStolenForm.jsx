export default function VehicleStolenForm() {
  return (
    <form className="space-y-10">

      {/* ================= Vehicle Info ================= */}
      <Section title="Vehicle Info">
        <Input label="Vehicle Registration Number" />
        <Input label="Engine Number" />
        <Input label="Chassis Number" />
        <Select label="Vehicle Type" placeholder="Select type" />
        <Input label="Make" />
        <Input label="Model" />
        <Select label="Manufacturing Year" placeholder="Select Year" />
        <Input label="Color" />
      </Section>

      {/* ================= Stolen FIR Details ================= */}
      <Section title="Stolen FIR Details">
        <Input label="FIR Number" />
        <Input label="Police Station (FIR PS)" />
        <Select label="State" placeholder="Select State" />
        <Select label="District" placeholder="Select District" />
        <Input label="City" />
        <Input label="FIR Date" type="date" />
      </Section>

      {/* ================= Submit ================= */}
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-800 text-white px-12 py-3 rounded-lg font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

/* ================= Reusable Components ================= */

function Section({ title, children }) {
  return (
    <>
      <h2 className="text-center text-blue-800 font-semibold text-lg">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </>
  );
}

function Input({ label, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}

function Select({ label, placeholder }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">
        {label}
      </label>
      <select
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <option>{placeholder}</option>
      </select>
    </div>
  );
}
