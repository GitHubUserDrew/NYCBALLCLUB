export default (e,setImg)=>{
    let file = e.target.files[0];
   if(!file) return;
    if(!file.type.split("/")[0] =="image")return;

    let reader = new FileReader();
reader.onloadend= function(){
    setImg(reader.result)
}
    reader.readAsDataURL(file)
}