"use client";
import React, { useEffect, useRef } from "react";
import Achivement from "./Components/Achivement/Achivement";
import Award from "./Components/Award/Award";
import Activate from "./Components/Activate/Activate";
import Hobby from "./Components/Hobby/Hobby";
import Persional from "./Components/Persional/Persional";
import Project from "./Components/Project/Project";
import Skill from "./Components/Skill/Skill";
import Study from "./Components/Study/Study";
import Experience from "./Components/Experience/Experience";
import Target from "./Components/Target/Target";
import InfoMore from "./Components/InfoMore/InfoMore";

type Props = {
  index: any;
  indexItem: any;
  item: any;
  funcLibrary: any;
  data: any;
};

const CheckTypeProsper = (props: Props) => {
  const { data, funcLibrary, index, indexItem, item } = props;
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      {data?.type === "info_person" ? (
        <Persional
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_skill" ? (
        <Skill
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_hobby" ? (
        <Hobby
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_achivement" ? (
        <Achivement
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_award" ? (
        <Award
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_target" ? (
        <Target
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_experience" ? (
        <Experience
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_study" ? (
        <Study
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_activate" ? (
        <Activate
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_project" ? (
        <Project
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : data?.type === "info_more" ? (
        <InfoMore
          data={data}
          funcLibrary={funcLibrary}
          index={index}
          indexItem={indexItem}
          item={item}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default CheckTypeProsper;
