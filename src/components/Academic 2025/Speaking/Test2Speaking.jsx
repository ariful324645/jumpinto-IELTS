import React from "react";

const Test2Speaking = () => {
  return (
    <div className="p-4 flex gap-3 justify-between">
      {/* left side */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold">PART 1</h1> <br />
        <p className="text-lg">
          The examiner asks you about yourself, your home, work or studies and
          other familiar topics.
        </p>
        <br />
        <h1 className="text-2xl font-bold"> EXAMPLE</h1> <br />
        <ul className="list-disc pl-8 list-inside space-y-2">
          <li className=""> What's your favourite fruit?</li>
          <li className="">
            Do you like eating cooked food that has fruit in it?
          </li>
          <li className="">
            {" "}
            Where's the best place to buy fruit where you live?
          </li>
        </ul>
      </div>
      {/* right side */}
      <div className="flex-1 items-center justify-center">
        <h3> Eikhane onno kichu rakhbo</h3>
      </div>
    </div>
  );
};

export default Test2Speaking;
