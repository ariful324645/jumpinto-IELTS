import React from 'react';

const Test4Speaking2022 = () => {
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
                        Maps
                      </h2>
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          Do you think it's better to use a paper map or a map
                          on your phone? [Why?]
                        </li>
                        <li className="">
                          When was the last time you needed to use a map?
                          [Why/Why not?]
                        </li>
                        <li className="">
                          When was the last time you needed to use a map?
                          [Why/Why not?]
                        </li>
                        <li className="">
                          In general, do you find it easy to read maps? [Why/Why
                          not?]
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

export default Test4Speaking2022;