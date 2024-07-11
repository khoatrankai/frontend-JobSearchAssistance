"use client";
import React, { useEffect, useRef } from "react";
import CheckTypeProsper from "./LibSample/Prosper/CheckTypeProsper";
import CheckTypeDelicate from "./LibSample/Delicate/CheckTypeDelicate";
import CheckTypeAmbitious from "./LibSample/Ambitious/CheckTypeAmbitious";
import CheckTypeSenior from "./LibSample/Senior/CheckTypeSenior";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const CheckSample = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  const { templateId } = funcLibrary;
  // useEffect(() => {
  //   console.log(data, templateId);
  // }, [data, templateId]);
  return (
    <>
      {templateId == 0 && (
        <CheckTypeProsper
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      )}
      {templateId == 1 && (
        <CheckTypeDelicate
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      )}
      {templateId == 2 && (
        <CheckTypeAmbitious
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      )}
      {templateId == 3 && (
        <CheckTypeSenior
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      )}
    </>
  );
};

export default CheckSample;
