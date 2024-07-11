const TimeStamp = () => {
    const handleConvertToTimestamp = (time:any)=>{
      //console.log(time)
      const newTime =  time.toString()?.split(":")
      const timestamp = new Date(
        1970,
        0,
        2,
        Number(newTime[0]),
        Number(newTime[1])
      ).getTime()
      return timestamp
    }
    const handleConvertTimestampToTime = (timestamp:any)=>{
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    const time = formattedTime;
    return time
    }
    const handleConvertDateToTimestamp = (time:any)=>{
      const newTime =  time.toString()?.split("-")
      const timestamp = new Date()
      timestamp.setFullYear(Number(newTime[0]))
      timestamp.setMonth(Number(newTime[1]))
      timestamp.setDate(Number(newTime[2]))
      return timestamp.getTime()
    }
    const handleConvertToDate = (time:any)=>{
      const date = new Date(time)
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
    let fixedDateStr =  day.toString()+'/'+month.toString()+'/'+year.toString();
    return fixedDateStr
    }
    const handleConvertToDateCus = (time:any,cus="-")=>{
      const date = new Date(time)
      let year = date.getFullYear();
      let month = (date.getMonth() + 1).toString().padStart(2, '0');
      let day = date.getDate().toString().padStart(2, '0');
    let fixedDateStr =  day.toString()+cus+month.toString()+cus+year.toString();
    console.log(fixedDateStr)
    return fixedDateStr
    }
    const handleDecodingDescription = (data:any) => {
       const arrayData = data.split('/$/')
       return arrayData
    }
    return {handleDecodingDescription,handleConvertToTimestamp,handleConvertToDate,handleConvertToDateCus,handleConvertDateToTimestamp,handleConvertTimestampToTime}
  }
  
  export default TimeStamp