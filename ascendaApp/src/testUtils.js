export function randString(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+`[]\\;\',./_+{}|:"<>?~';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
 return result;
}

export function randIntRange(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randDoubleRange(min, max) { // min and max included 
  return Math.random() * (max - min + 1) + min
}

export function randDate() {
  let start = new Date();
  let end = new Date(start.getFullYear(), 12-1, 31);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

export function randBoolean() {
  return Math.random() < 0.5;
}