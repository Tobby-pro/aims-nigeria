// components/dashboard/Certificates
const certificates = [
  {
    title: "Diploma in Management",
    date: "March 2026",
  },
];

const Certificates = () => {
  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Certificates
      </h2>

      {certificates.map((cert, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-xl shadow flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-500">
              Issued: {cert.date}
            </p>
          </div>

          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm">
            Download
          </button>
        </div>
      ))}

    </div>
  );
};

export default Certificates;