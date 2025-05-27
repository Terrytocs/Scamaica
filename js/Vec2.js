('use strict');

export default class Vec2{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
  get mag(){
    return Math.sqrt(this.x*this.x+this.y*this.y);
  }
  get dir(){
    return Math.atan2(this.y,this.x);
  }
  get norm() {
    var len = this.mag;
    len = (len > 0) && (1 / len);
    return this.scale(len);
  }
  add(v){
    return new Vec2(this.x+v.x,this.y+v.y);
  }
  sub(v){
    return new Vec2(this.x-v.x,this.y-v.y);
  }
  scale(s){
    return new Vec2(this.x*s,this.y*s);
  }
  scale2(s1,s2){
    return new Vec2(this.x*s1,this.y*s2);
  }
  dot(v){
    return (this.x*v.x+this.y*v.y);
  }
  rotate(c,a){
    var x,y,r;
    x=this.x-c.x;
    y=this.y-c.y;
    r=new Vec2(
      x*Math.cos(a)-y*Math.sin(a),
      x*Math.sin(a)+y*Math.cos(a)
    );
    return c.add(r);
  }
  intersection(b,c,d){
    var aToB,dToC,aToC,det,con,s,t;
    
    aToB=b.sub(this);
    dToC=c.sub(d);
    aToC=c.sub(this);
    
    det=(aToB.y*dToC.x-aToB.x*dToC.y);
    
    if (det===0) {
      return null;
    }
    
    con=(aToB.y*aToC.x-aToB.x*aToC.y);
    s=(con/det);
    
    if (s<0||s>1) {
      return null;
    }
    
    if (aToB.x!==0) {
      t=((aToC.x-s*dToC.x)/aToB.x);
    }else{
      t=((aToC.y-s*dToC.y)/aToB.y);
    }
    if(t>=0&&t<=1){
      return {
        point:this.lerp(b,t),
        time:t,
      };
    }
    return null;
  }
  lerp(b,t){
    return new Vec2(lerp(this.x,b.x,t),lerp(this.y,b.y,t));
  }
}