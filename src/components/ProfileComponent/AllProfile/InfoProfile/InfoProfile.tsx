import { useSrollContext } from "@/context/AppProvider";
import React from "react";
import AvatarProfile from "../../AvatarProfile/AvatarProfile";
import InfoPerson from "../../InfoPerson/InfoPerson";
import AchivementProfile from "../../AchivementProfile/AchivementProfile";
import ContactProfile from "../../ContactProfile/ContactProfile";
import EducationProfile from "../../EducationProfile/EducationProfile";
import ExperienceProfile from "../../ExperienceProfile/ExperienceProfile";
import JobProfile from "../../JobProfile/JobProfile";
import LanguageProfile from "../../LanguageProfile/LanguageProfile";
import SkillProfile from "../../SkillProfile/SkillProfile";

type Props = {
  dataInfo: any;
  handleUpdateApi: any;
};

const InfoProfile = (props: Props) => {
  const { reponsiveMobile } = useSrollContext();
  const { dataInfo, handleUpdateApi } = props;
  return (
    <>
      {reponsiveMobile < 990 && (
        <div className="flex justify-center">
          <AvatarProfile
            dataInfo={dataInfo}
            handleUpdateApi={handleUpdateApi}
            checkUpdate={false}
          />
        </div>
      )}

      <div>
        <InfoPerson
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <ContactProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <JobProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <EducationProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <ExperienceProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <AchivementProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <SkillProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
      <div>
        <LanguageProfile
          dataInfo={dataInfo}
          handleUpdateApi={handleUpdateApi}
          checkUpdate={false}
        />
      </div>
    </>
  );
};

export default InfoProfile;
