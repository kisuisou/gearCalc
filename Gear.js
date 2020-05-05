      var Gear = {
	  degrad: Math.PI/180,
	  inv:  function(x){
	      return Math.tan(x)-x;
	  },
	  u:{
	      calc:function(z1,z2){
		  return z1/z2;
	      },
	      name:"速比",
	      unit:"-",
	  },
	  d:{
	      calc:function(m,z){
		  return m*z;
	      },
	      name:"基準ピッチ円直径",
	      unit:"mm",
	  },
	  db:{
	      calc:function(z,z1,z2,dis){
	  	  return 2.0*z*dis/(z1+z2);
	      },
	      name:"噛み合いピッチ円直径",
	      unit:"mm"
	  },
	  ab:{
	      calc:function(m,z1,z2,dis){
		  return (Math.acos((z1+z2)*m/(2*dis)*Math.cos(20*Gear.degrad)))/Gear.degrad;
	      },
	      name:"噛み合い圧力角",
	      unit:"deg",
	  },
	  W:{
	      calc:function(m,z){
		  return Math.cbrt(Gear.d.calc(m,z))+0.65*m;
	      },
	      name:"公差単位",
	      unit:"μm",
	  },
	  cmax:{
	      calc:function(m,z1,z2){
		  return 35.5*(Gear.W.calc(m,z1)+Gear.W.calc(m,z2))/1000;
	      },
	      name:"最大バックラッシ",
	      unit:"mm",
	  },
	  cmin:{
	      calc:function(m,z1,z2){
		  return 10.0*(Gear.W.calc(m,z1)+Gear.W.calc(m,z2))/1000;
	      },
	      name:"最小バックラッシ",
	      unit:"mm",
	  },
	  cn:{
	      calc:function(m,z1,z2,dis){
		  return (m*(z1+z2)*Math.cos(20*Gear.degrad))*(Gear.inv(Gear.ab.calc(m,z1,z2,dis)*Gear.degrad)-Gear.inv(20*Gear.degrad))/Math.cos(Gear.ab.calc(m,z1,z2,dis)*Gear.degrad);
	      },
	      name:"ピッチ円上バックラッシ",
	      unit:"mm",
	  },
	  y:{
	      calc:function(m,z1,z2,dis){
		  return dis/m-((z1+z2)/2);
	      },
	      name:"中心距離増加係数",
	      unit:"-",
	  },
	  dk:{
	      calc:function(m,z,z1,z2,dis){
		  return (z+2)*m+2*Gear.y.calc(m,z1,z2,dis)*m;
	      },
	      name:"歯先円直径",
	      unit:"mm",
	  },
	  rg:{
	      calc:function(m,z){
		  return Gear.d.calc(m,z)/2*Math.cos(20*Gear.degrad);
	      },
	      name:"基礎円半径",
	      unit:"mm",
	  },
	  L:{
	      calc:function(m,z1,z2,dis){
		  return Math.sqrt(Math.pow(Gear.dk.calc(m,z1,z1,z2,dis)/2,2)-Math.pow(Gear.rg.calc(m,z1),2))+Math.sqrt(Math.pow(Gear.dk.calc(m,z2,z1,z2,dis)/2,2)-Math.pow(Gear.rg.calc(m,z2),2))-dis*Math.sin(Gear.ab.calc(m,z1,z2,dis)*Gear.degrad);
	      },
	      name:"噛み合い長さ",
	      unit:"mm",
	  },
	  te:{
	      calc:function(m){
		  return Math.PI*m*Math.cos(20*Gear.degrad);
	      },
	      name:"法線ピッチ",
	      unit:"mm",
	  },
	  mrt:{
	      calc:function(m,z1,z2,dis){
		  return Gear.L.calc(m,z1,z2,dis)/Gear.te.calc(m);
	      },
	      name:"噛み合い率",
	      unit:"-",
	  },
	  isCnNG: function(m,z1,z2,dis){
	      var Cn = this.cn.calc(m,z1,z2,dis);
	      var Cmax = this.cmax.calc(m,z1,z2);
	      var Cmin = this.cmin.calc(m,z1,z2);
	      if(!(Cn<=Cmax && Cn>=Cmin)){
		  return true;
	      }
	      else{
		  return false;
	      }
	  },

	  exec:function(m,z1,z2,dis){
	      var results = {
		  0:{
		      name:Gear.u.name,
		      value:Gear.u.calc(z1,z2),
		      unit:Gear.u.unit,
		  },

		  1:{
		      name:"原動車の"+Gear.d.name,
		      value:Gear.d.calc(m,z1),
		      unit:Gear.d.unit,
		  },

		  2:{
		      name:"従動車の"+Gear.d.name,
		      value:Gear.d.calc(m,z2),
		      unit:Gear.d.unit,
		  },

		  3:{
		      name:"原動車の"+Gear.db.name,
		      value:Gear.db.calc(z1,z1,z2,dis),
		      unit:Gear.db.unit,
		  },
		  
		  4:{
		      name:"従動車の"+Gear.db.name,
		      value:Gear.db.calc(z2,z1,z2,dis),
		      unit:Gear.db.unit,
		  },

		  5:{
		      name:Gear.ab.name,
		      value:Gear.ab.calc(m,z1,z2,dis),
		      unit:Gear.ab.unit,
		  },

		  6:{
		      name:"原動車の"+Gear.W.name,
		      value:Gear.W.calc(m,z1),
		      unit:Gear.W.unit,
		  },

		  7:{
		      name:"従動車の"+Gear.W.name,
		      value:Gear.W.calc(m,z2),
		      unit:Gear.W.unit,
		  },

		  8:{
		      name:Gear.cmax.name,
		      value:Gear.cmax.calc(m,z1,z2),
		      unit:Gear.cmax.unit,
		  },

		  9:{
		      name:Gear.cmin.name,
		      value:Gear.cmin.calc(m,z1,z2),
		      unit:Gear.cmin.unit,
		  },

		  10:{
		      name:Gear.cn.name,
		      value:Gear.cn.calc(m,z1,z2,dis),
		      unit:Gear.cn.unit,
		  },

		  11:{
		      name:Gear.y.name,
		      value:Gear.y.calc(m,z1,z2,dis),
		      unit:Gear.y.unit,
		  },

		  12:{
		      name:"原動車の"+Gear.dk.name,
		      value:Gear.dk.calc(m,z1,z1,z2,dis),
		      unit:Gear.dk.unit,
		  },

		  13:{
		      name:"従動車の"+Gear.dk.name,
		      value:Gear.dk.calc(m,z2,z1,z2,dis),
		      unit:Gear.dk.unit,
		  },

		  14:{
		      name:"原動車の"+Gear.rg.name,
		      value:Gear.rg.calc(m,z1),
		      unit:Gear.rg.unit,
		  },

		  15:{
		      name:"従動車の"+Gear.rg.name,
		      value:Gear.rg.calc(m,z2),
		      unit:Gear.rg.unit,
		  },

		  16:{
		      name:Gear.L.name,
		      value:Gear.L.calc(m,z1,z2,dis),
		      unit:Gear.L.unit,
		  },

		  17:{
		      name:Gear.te.name,
		      value:Gear.te.calc(m),
		      unit:Gear.te.unit,
		  },

		  18:{
		      name:Gear.mrt.name,
		      value:Gear.mrt.calc(m,z1,z2,dis),
		      unit:Gear.mrt.unit,
		  },
	      };

	      return results;
	  }
	  
      }
