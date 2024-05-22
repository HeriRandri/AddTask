import { useState } from "react";
import { MdClose } from "react-icons/md";

// eslint-disable-next-line react/prop-types
export default function Add({ addTask }) {
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({
    titre: "",
    description: "",
    date: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(data);
    console.log(data);
    setAddSection(false);
    setData({ titre: "", description: "", date: "" }); // Reset form
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="border p-2 border-collapse mt-5 absolute top-0 left-0"
        onClick={() => setAddSection(true)}
      >
        Add
      </button>
      <div className="fixed bottom-0 left-0 w-full bg-white z-10">
        {/* List */}
      </div>
      {addSection && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="containerAdd p-5 bg-white rounded-lg relative">
            <div
              className="btn-close absolute top-2 right-2 cursor-pointer"
              onClick={() => setAddSection(false)}
            >
              <MdClose />
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label htmlFor="titre">Titre</label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={data.titre}
                onChange={handleOnChange}
                className="border p-2 rounded-md"
              />

              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={data.description}
                onChange={handleOnChange}
                className="border p-2 rounded-md"
              />

              <label htmlFor="date">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={data.date}
                onChange={handleOnChange}
                className="border p-2 rounded-md"
              />

              <button
                type="submit"
                className="border border-collapse p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
