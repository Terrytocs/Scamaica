("use strict");

export default class Utils{
    static clamp=(val,min,max)=>{
        Math.max(min,Math.min(max,val));
    };

    static dist=(a,b)=>{
        return a.sub(b).mag;
    }
}