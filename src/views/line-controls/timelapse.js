import { useCallback, useEffect, useState } from "react";

const Timelapse = (props) => {
    const {object,durationColumn,type,classes} = props;
    const [time,setTime]=useState('');


    const mSecondsToStamp = useCallback(() =>{
        let mSeconds;
        if(object.createdAt === object.updatedAt){
            const start = new Date(object.createdAt);
            const end = Date.now();
              mSeconds = end-start;
        }else{
             mSeconds=object[durationColumn];
        }
        let fullHours,fullMinutes,fullSeconds,remainingMinutes;
        const seconds = Math.floor(Number(mSeconds/1000));
        fullHours = Math.floor(Number(seconds/(60*60)));
        if(fullHours<1){
            fullHours=0;
            
        }
        remainingMinutes = seconds % (60*60);
         fullMinutes = Math.floor(remainingMinutes/60);
         fullSeconds = Math.floor(remainingMinutes%60);


        setTime(`${fullHours}:${fullMinutes}:${fullSeconds}`) ;
    },[object,durationColumn]);

    

    useEffect(()=>{
        if(type==='open'){
           const interval =  setInterval(mSecondsToStamp,1000);
           return () => clearInterval(interval);
        }else{
            mSecondsToStamp();
        }

    },[mSecondsToStamp,type]);

    
    return (<p className={classes}>{time}</p>);
}

export default Timelapse;