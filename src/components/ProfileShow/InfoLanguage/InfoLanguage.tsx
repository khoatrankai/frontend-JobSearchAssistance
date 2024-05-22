import React from "react";
type Props = {
  dataProfile?: any;
};

const InfoLanguage = ({ dataProfile }: Props) => {
  const listColor = ["#16A34A", "#2563EB", "#EA580C", "#DC2626"];

  return (
    <div className=" bg-gray-100 p-4 w-fit rounded-lg">
      <p className="text-xl font-bold mb-6">Ngoại ngữ</p>
      <div className=" flex flex-col w-fit gap-y-3">
        {dataProfile?.profilesLanguages?.map((dt: any, ikey: any) => {
          return (
            <>
              <div key={ikey}>
                <p className="text-sm font-medium text-gray-600">
                  {dt.languageName}
                </p>
                <div className="h-4 w-96 rounded-xl overflow-hidden bg-white">
                  <div
                    className="h-full "
                    style={{
                      width: `${(dt.dataLevel.id - 7) * 25}%`,
                      backgroundColor: `${listColor[dt.dataLevel.id - 8]}`,
                    }}
                  ></div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default InfoLanguage;
