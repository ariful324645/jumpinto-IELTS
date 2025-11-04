import React from 'react';

const Test1Speaking2023 = () => {
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
                        Paying bills
                      </h2>
                      <ul className="list-disc pl-8 list-inside space-y-2">
                        <li className="">
                          What kinds of bills do you have to pay?
                        </li>
                        <li className="">
                          How do you usually pay your bills - in cash or by
                          another method? [Why?]
                        </li>
                        <li className="">
                          Have you ever forgotten to pay a bill? [Why/Why not?]
                        </li>
                        <li className="">
                          Is there anything you could do to make your bills
                          cheaper? [Why/Why not?]
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

export default Test1Speaking2023;