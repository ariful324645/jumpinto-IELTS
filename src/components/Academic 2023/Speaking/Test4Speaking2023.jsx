import React from 'react';

const Test4Speaking2023 = () => {
                return (
                  <div className="p-4 flex gap-3 justify-between">
                    {/* left side */}
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold">PART 1</h1> <br />
                      <p className="text-lg">
                        The examiner asks you about yourself, your home, work or
                        studies and other familiar topics.
                      </p>
                      <br />
                      <h1 className="text-2xl font-bold"> EXAMPLE</h1> <br />
                      <h2 className="text-xl font-bold text-center mb-5">
                        Sleep
                      </h2>
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          How many hours do you usually sleep at night?
                        </li>
                        <li className="">
                          Do you sometimes sleep during the day? [Why/Why not?]
                        </li>
                        <li className="">
                          What do you do if you can't get to sleep at night?
                          [Why?]
                        </li>
                        <li className="">
                          Do you ever remember the dreams you've had while you
                          were asleep?
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

export default Test4Speaking2023;