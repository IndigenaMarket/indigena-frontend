export const FormatDate1 = (dateString) => {
    let newFormat = new Date(dateString).toString().substring(4, 15).split(" ");
    return newFormat[1] + " " + newFormat[0] + " " + newFormat[2];
  };

  export const RoundValue = (data) => {
    var data1 = parseFloat(data);
    var roundOfValue = Math.round(data1 * 1e12) / 1e12;
    return roundOfValue;
  };    

  export const RoundValue2 = (data) => {
    var data1 = parseFloat(data);
    var roundOfValue4 = Math.round((data1 + Number.EPSILON) * 1000) / 1000;
    return roundOfValue4;
  };

  export const Slicer = (address) => {
    if (address.length < 9) {
      return address;
    } else {
      let front = address.slice(0, 4);
      let back = address.substr(address.length - 4);
      return front + "...." + back;
    }
  };
  export const BackSlicer = (word,length) => {
    if(isNaN(length)){
      return word;
    }
    if (word.length < length) {
      return word;
    } else {
      let front = word.slice(0, length);
      return front + "..." ;
    }
  };