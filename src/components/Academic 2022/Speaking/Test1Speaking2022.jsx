import React from 'react';

const Test1Speaking2022 = () => {
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
                        History
                      </h2>
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          What did you study in history lessons when you were at
                          school?
                        </li>
                        <li className="">
                          Did you enjoy studying history at school? [Why/Why
                          not?]
                        </li>
                        <li className="">
                          How often do you watch TV programmes about history
                          now? [Why/Why not?]
                        </li>
                        <li className="">
                          What period in history would you like to learn more
                          about? [Why?]
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

export default Test1Speaking2022;