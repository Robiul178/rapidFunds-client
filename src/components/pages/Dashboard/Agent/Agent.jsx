// import React from 'react';

const Agent = () => {
    return (
        <section className="max-w-[60%] h-[650px] mx-auto border mt-14">
            <div className="p-24">
                <div>
                    <h2 className="text-xl font-bold ">Balance : 000 Tk</h2>
                </div>
                <div className="flex gap-4 flex-col w-full mt-6">

                    <div className="border w-full rounded">
                        <h2 className="text-xl font-bold btn w-full">Send Money</h2>
                    </div>
                    <div className="border w-full rounded">
                        <h2 className="text-xl font-bold btn w-full"> Cash-In/Out request</h2>
                    </div>
                    <div className="border w-full rounded">
                        <h2 className="text-xl font-bold btn w-full">Transactions History</h2>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Agent;