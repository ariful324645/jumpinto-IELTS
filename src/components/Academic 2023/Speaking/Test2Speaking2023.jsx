import React from 'react';

const Test2Speaking2023 = () => {
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
                        Science
                      </h2>
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          Did you like studying science when you were at school?
                          [Why/Why not?]
                        </li>
                        <li className="">
                          What do you remember about your science teachers at
                          school?
                        </li>
                        <li className="">
                          How interested are you in science now? [Why/Why not?]
                        </li>
                        <li className="">
                          What do you think has been an important recent
                          scientific development? [Why?]
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

export default Test2Speaking2023;