      var Gear = {
	  degrad: Math.PI/180,
	  inv: function(x){
	      return Math.tan(x)-x;
	  },
	  u: function(z1,z2){
	      return z1/z2;
	  },
	  d: function(m,z){
	      return m*z;
	  },
	  db: function(z,z1,z2,dis){
	  	  return 2.0*z*dis/(z1+z2);          
	  },
	  ab: function(m,z1,z2,dis){
	      return (Math.acos((z1+z2)*m/(2*dis)*Math.cos(20*this.degrad)))/this.degrad;
	  },
	  W: function(m,z){
	      return Math.cbrt(this.d(m,z))+0.65*m;
	  },
	  cmax: function(m,z1,z2){
	      return 35.5*(this.W(m,z1)+this.W(m,z2))/1000;
	  },
	  cmin: function(m,z1,z2){
	      return 10.0*(this.W(m,z1)+this.W(m,z2))/1000;
	  },
	  cn: function(m,z1,z2,dis){
	      return (m*(z1+z2)*Math.cos(20*this.degrad))*(this.inv(this.ab(m,z1,z2,dis)*this.degrad)-this.inv(20*this.degrad))/Math.cos(this.ab(m,z1,z2,dis)*this.degrad);
	  },
	  y: function(m,z1,z2,dis){
	      return dis/m-((z1+z2)/2);
	  },
	  dk: function(m,z,z1,z2,dis){
	      return (z+2)*m+2*this.y(m,z1,z2,dis)*m;
	  },
	  rg: function(m,z){
	      return this.d(m,z)/2*Math.cos(20*this.degrad);
	  },
	  L: function(m,z1,z2,dis){
	      return Math.sqrt(Math.pow(this.dk(m,z1,z1,z2,dis)/2,2)-Math.pow(this.rg(m,z1),2))+Math.sqrt(Math.pow(this.dk(m,z2,z1,z2,dis)/2,2)-Math.pow(this.rg(m,z2),2))-dis*Math.sin(this.ab(m,z1,z2,dis)*this.degrad);
	  },
	  te: function(m){
	      return Math.PI*m*Math.cos(20*this.degrad);
	  },
	  mrt: function(m,z1,z2,dis){
	      return this.L(m,z1,z2,dis)/this.te(m);
	  }
	  
      }
