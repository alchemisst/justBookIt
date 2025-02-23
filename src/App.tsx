import "./App.css";
import male from "./assets/male.jpg";
import female from "./assets/female.jpg";
import { useState } from "react";
import useBooking from "./customHook/useBooking";

function App() {
  const [image, setImage] = useState(male);
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const handleImageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    if (selected === "male") {
      setImage(male);
    } else if (selected === "female") {
      setImage(female);
    }
  };

  const {
    availableSlots,
    bookings,
    bookSlot,
    cancelBooking,
    waitingList,
    joinWaitingList,
    reset,
  } = useBooking();

  const formatDate = (now: Date) => {
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const formattedDateTime = `${day}/${month} ${hours}:${minutes}`;
    return formattedDateTime;
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="max-w-7xl ">
          <div className="flex m-6 justify-center">
            <div className="bg-secondary px-10 py-4 shadow-[8px_8px_0px_#FFF9BF] font-bold">
              <h1 className="text-[#fffff0] text-xl">
                Just Book It <span>- {availableSlots} Spots Left</span>
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div className=" bg-secondary shadow-[8px_8px_0px_#FFF9BF] p-4 space-y-2">
              <div className="flex justify-center ">
                <img
                  src={image}
                  alt="image"
                  className="w-40 h-45 rounded-2xl"
                />
              </div>
              <div className="px-10 py-2 text-[#fffff0] space-y-2">
                <div className="flex space-x-2">
                  <h1 className="font-bold">Name:</h1>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 rounded-2xl px-2"
                  />
                </div>
                <div className="flex space-x-2">
                  <h1 className="font-bold">Gender:</h1>
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    className="border-1 rounded-2xl px-2"
                    onChange={(e) => {
                      handleImageChange(e);
                      setGender(e.target.value);
                    }}
                  >
                    <option value="male" className="text-black">
                      Male
                    </option>
                    <option value="female" className="text-black">
                      Female
                    </option>
                    {image}
                  </select>
                </div>
                <div className="flex justify-center mt-4">
                  <button
                    disabled={!name.trim()}
                    className="bg-primary hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition ease-in font-bold  px-4 py-2 shadow-[4px_4px_0px_#FFF9BF]"
                    onClick={() => {
                      if (availableSlots > 0) {
                        bookSlot(name, gender);
                      } else {
                        joinWaitingList(name, gender);
                      }
                    }}
                  >
                    {availableSlots > 0 ? "Book Now" : "Join Waiting List"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex m-6 space-x-6 items-start ">
            <div className="bg-secondary px-10 py-4 shadow-[8px_8px_0px_#FFF9BF] font-bold text-center space-y-2">
              <h1
                className="text-[#fffff0] text-xl underline-offset-4 underline
          "
              >
                Booked List
              </h1>
              {bookings.map((person) => (
                <div className="flex space-x-2 items-center" key={person.id}>
                  <h1>{person.name}</h1>
                  <h1>{formatDate(person.timestamp)}</h1>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      cancelBooking(person.id);
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className=" bg-secondary px-10 py-4 shadow-[8px_8px_0px_#FFF9BF] font-bold">
              <h1 className="text-[#fffff0] text-xl underline underline-offset-4">
                Waiting List
              </h1>
              {waitingList.map((person) => (
                <div className="flex space-x-2 items-center" key={person.id}>
                  <h1>{person.name}</h1>
                  <h1>{formatDate(person.timestamp)}</h1>
                  <button
                    className="cursor-pointer"
                    onClick={() => {
                      cancelBooking(person.id);
                    }}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex m-4 justify-center">
            <button
              className="bg-red-800 px-10 py-4 shadow-[4px_4px_0px_#FFF9BF] font-bold hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition ease-in"
              onClick={reset}
            >
              <h1 className="text-[#fffff0] text-xl">Reset</h1>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
