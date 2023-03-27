const getColorSisben = (sisben)=>{
    if(sisben == '')return '';
    const splited = sisben.split(':');
    if(splited.length <=1)return '';
    if(splited[0].toUpperCase().includes('A')){
        return "red darken-4"
    }
    if(splited[0].toUpperCase().includes('B')){
        return "red"
    }
    if(splited[0].toUpperCase().includes('C')){
        return "orange"
    } 
    if(splited[0].toUpperCase().includes('D')){
        return "teal"
    } 
    return "";
}
export default getColorSisben;