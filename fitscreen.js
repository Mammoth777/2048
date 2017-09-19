function calc(){
	var width = window.innerWidth;
	var html = document.documentElement;
	if(width<=640){
		html.style.fontSize = width/7 + "px";
	}else{
		html.style.fontSize = 100 + "px";
	}
}
window.addEventListener('resize',function(){calc()});
calc();
