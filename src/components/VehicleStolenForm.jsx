import { useState } from "react";
import { addCustomerStolenVehicle } from "../services/stolenVehicle.service";

export default function VehicleStolenForm() {

  const [formData, setFormData] = useState({
    registration_number: "",
    engine_number: "",
    chassis_number: "",
    vehicle_type: "",
    make: "",
    model: "",
    manufacturing_year: "",
    color: "",
    fir_number: "",
    police_station: "",
    state: "",
    district: "",
    city: "",
    fir_date: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addCustomerStolenVehicle(formData);

      if (data.success) {
        alert("Stolen vehicle submitted successfully");
      }
    } catch (error) {
      const response = error?.response?.data;

      if (response?.message) {
        alert(response.message);
      } else {
        alert("Error submitting stolen vehicle");
      }
    }
  };

  return (
    <form className="space-y-10" onSubmit={handleSubmit}>

      {/* Vehicle Info */}
      <Section title="Vehicle Info">
        <Input label="Vehicle Registration Number" name="registration_number" value={formData.registration_number} onChange={handleChange} />
        <Input label="Engine Number" name="engine_number" value={formData.engine_number} onChange={handleChange} />
        <Input label="Chassis Number" name="chassis_number" value={formData.chassis_number} onChange={handleChange} />

        <Select label="Vehicle Type" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange}>
          <option value="">Select type</option>
          <option value="Two Wheeler">Two Wheeler</option>
          <option value="Four Wheeler">Four Wheeler</option>
        </Select>

        <Input label="Make" name="make" value={formData.make} onChange={handleChange} />
        <Input label="Model" name="model" value={formData.model} onChange={handleChange} />

        <Select label="Manufacturing Year" name="manufacturing_year" value={formData.manufacturing_year} onChange={handleChange}>
          <option value="">Select Year</option>
          {Array.from({ length: 30 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return <option key={year} value={year}>{year}</option>;
          })}
        </Select>

        <Input label="Color" name="color" value={formData.color} onChange={handleChange} />
      </Section>

      {/* FIR Details */}
      <Section title="Stolen FIR Details">
        <Input label="FIR Number" name="fir_number" value={formData.fir_number} onChange={handleChange} />
        <Input label="Police Station (FIR PS)" name="police_station" value={formData.police_station} onChange={handleChange} />
        <Input label="State" name="state" value={formData.state} onChange={handleChange} />
        <Input label="District" name="district" value={formData.district} onChange={handleChange} />
        <Input label="City" name="city" value={formData.city} onChange={handleChange} />
        <Input label="FIR Date" type="date" name="fir_date" value={formData.fir_date} onChange={handleChange} />
      </Section>

      {/* Submit */}
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

/* Reusable Components */

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

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  );
}

function Select({ label, name, value, onChange, children }) {
  return (
    <div>
      <label className="block text-sm text-gray-700 mb-1">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2
                   text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        {children}
      </select>
    </div>
  );
}
