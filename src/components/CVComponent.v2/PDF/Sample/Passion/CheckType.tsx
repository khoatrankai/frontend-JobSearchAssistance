import React from "react";
import Project from "./Type/Project";
import Persional from "./Type/Persional";
import Skill from "./Type/Skill";
import Achivement from "./Type/Achivement";
import Award from "./Type/Award";
import Activate from "./Type/Activate";
import Experience from "./Type/Experience";
import Hobby from "./Type/Hobby";
import Study from "./Type/Study";
import InfoMore from "./Type/InfoMore";
import Target from "./Type/Target";

type Props = {
  data: any;
  funcLibrary: any;
};

const CheckType = (props: Props) => {
  const { data, funcLibrary } = props;
  const handleCheckType = (data: any) => {
    switch (data?.type) {
      case "info_project":
        return <Project data={data} funcLibrary={funcLibrary} />;
        break;
      case "info_person":
        return <Persional data={data} />;
        break;
      case "info_skill":
        return <Skill data={data} />;
        break;
      case "info_achivement":
        return <Achivement data={data} />;
        break;
      case "info_award":
        return <Award data={data} />;
        break;
      case "info_activate":
        return <Activate data={data} funcLibrary={funcLibrary} />;
        break;
      case "info_experience":
        return <Experience data={data} funcLibrary={funcLibrary} />;
        break;
      case "info_hobby":
        return <Hobby data={data} />;
        break;
      case "info_study":
        return <Study data={data} funcLibrary={funcLibrary} />;
        break;
      case "info_more":
        return <InfoMore data={data} />;
        break;
      case "info_target":
        return <Target data={data} />;
        break;
    }
  };
  return <>{handleCheckType(data)}</>;
};

export default CheckType;
