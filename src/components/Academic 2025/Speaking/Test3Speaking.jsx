import React from 'react';

const Test3Speaking = () => {
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
                          Did you enjoy going to museums when you were a child?
                        </li>
                        <li className="">
                          Are there any interesting museums near where you live
                          now?
                        </li>
                        <li className="">
                          Do you think it is best to go to museums by yourself
                          or with friends?
                        </li>
                        <li className="">
                          When you visit another city or country, do you think
                          it's important to go to a museum there?
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

export default Test3Speaking;