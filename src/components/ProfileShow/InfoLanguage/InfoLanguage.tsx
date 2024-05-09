import React from "react";
type Props = {};

const InfoLanguage = (props: Props) => {
  return (
    <div className=" bg-gray-100 p-4 w-fit rounded-lg">
      <p className="text-xl font-bold mb-6">Ngoại ngữ</p>
      <div className=" flex flex-col w-fit gap-y-3">
        <div>
          <p className="text-sm font-medium text-gray-600">Tiếng anh</p>
          <div className="h-4 w-96 rounded-xl overflow-hidden bg-white">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${50}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Tiếng pháp</p>
          <div className="h-4 w-96 rounded-xl overflow-hidden bg-white">
            <div
              className="h-full bg-red-500"
              style={{ width: `${100}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Tiếng bồ</p>
          <div className="h-4 w-96 rounded-xl overflow-hidden bg-white">
            <div
              className="h-full bg-yellow-500"
              style={{ width: `${50}%` }}
            ></div>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Tiếng TBN</p>
          <div className="h-4 w-96 rounded-xl overflow-hidden bg-white">
            <div
              className="h-full bg-red-500"
              style={{ width: `${100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoLanguage;
