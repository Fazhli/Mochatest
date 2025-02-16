var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

class MyClass {
    constructor () {
        console.log("initiate");
    }

    sayHello (str) {
        console.log(str);
    }

    add (arg1 , arg2) {
        var result ;
        result = arg1 + arg2;
        return result;
    }

    callAnotherFn (arg1 , arg2) {
        this.sayHello("Hello world");
        var result = this.add(arg1, arg2);
        return result;
    }

    callTheCallback(callback) {
        callback();
    }

    testPromise () {
        return new Promise(function (resolve, reject){
            setTimeout(() => resolve(3), 6000);
        }).then(function (result) {
            return result * 2;
        });
    }

    xhrFn() {
        return new Promise((resolve, reject) => {
          var xhr = new XMLHttpRequest();
          xhr.open("post", "https://postman-echo.com/post", true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
              } else {
                reject(xhr.status);
              }
            }
          };
          xhr.send();
        })
        .then(function(result) {
            return result;
        })}

}

module.exports = MyClass;

// .skip (skip describe)
// .only (only test this descibe)
// .retry(4) (retrying describe)