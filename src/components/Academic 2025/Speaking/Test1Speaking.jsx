import React from 'react';

const Test1Speaking = () => {
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
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          {" "}
                          How much walking do you do in your daily life?
                        </li>
                        <li className="">
                          {" "}
                          Did you walk more when you were at school than now?
                        </li>
                        <li className="">
                          {" "}
                          What places are there to go for a walk near where you
                          live?
                        </li>
                        <li className="">
                          {" "}
                          Would you ever like to go on a walking holiday?
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

export default Test1Speaking;