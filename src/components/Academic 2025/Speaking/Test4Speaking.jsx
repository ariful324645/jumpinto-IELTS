import React from 'react';

const Test4Speaking = () => {
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
                          What do you think your best personal qualities are?
                        </li>
                        <li className="">
                          Do you have the same personal qualities as your
                          parents?
                        </li>
                        <li className="">
                          What personal qualities are important to you in a
                          friend?
                        </li>
                        <li className="">
                          Do you think you have the personal qualities to be a
                          good or successful leader?
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

export default Test4Speaking;