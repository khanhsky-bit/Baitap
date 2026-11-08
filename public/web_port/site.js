(function(){
  var b=document.querySelector('.burger'),n=document.querySelector('nav');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
  var boxes=document.querySelectorAll('.check input');
  boxes.forEach(function(x){
    try{x.checked=localStorage.getItem('chk-'+x.dataset.k)==='1'}catch(e){}
    x.addEventListener('change',function(){try{localStorage.setItem('chk-'+x.dataset.k,x.checked?'1':'0')}catch(e){}})
  });
})();
