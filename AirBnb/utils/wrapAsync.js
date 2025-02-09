// Better way to write  a try{}.catch logic.


/* WrapAsync fn is a fn that return a function having a parameters(fn) 
The return function having parameters (req,res,next)
and the fn is use to executed the main function having same parameters (req,res,next).cathc(next);
*/

//That how we implement wrapAsync function 
// function WrapAsync (fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// }



//In this using arrow functions and direct exports it using module.exports
module.exports = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}