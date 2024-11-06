export function csvJSON(csv){

    var lines=csv.split("\r\n");
  
    var result = [];
  
   
    var headers=lines[0].split("\t").map(e => e.trim());
  
    for(var i=1;i<lines.length;i++){
  
        var obj = {};
        var currentline=lines[i].split("\t");
  
        for(var j=0;j<headers.length;j++){
            obj[headers[j]] = currentline[j];
        }
  
        result.push(obj);
  
    }
  
    return result; //JSON
}

export function hasLongLat(value, index, array) {
    return value['longitude'] != '' && value['latitude']!= ''
}
