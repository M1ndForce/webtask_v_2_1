function getArrayDepth(value) {
  if
  return Array.isArray(value) ?
    1 + Math.max(...value.map(getArrayDepth)) :
    0;
}
function maxDepth(object) {
    if (typeof object !== "object" || object === null) {
        return 0;
    }
    let values = Object.values(object);
    return (values.length && Math.max(...values.map(value => maxDepth(value)))) + 1;
}
let obj = {foo:{bar:{baz : 'baa'}}}
let testRy = [1,2,[3,4,[5,6],7],11,12]
console.log(maxDepth(obj));
console.log(getArrayDepth(obj))