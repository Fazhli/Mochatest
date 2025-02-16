var MyClass = require("../src/myClass");
var sinon = require("sinon");
var myObj = new MyClass();
var chai = require("chai");
var expect = chai.expect;
const chaiaspromise = require("chai-as-promised");
chai.use(chaiaspromise);
const nock = require("nock");

describe("Test suit", function() {
    afterEach(function() {
        sinon.restore();
    });

    it("Test the add method", function() {
        expect(myObj.add(1, 2)).to.be.equal(3);
    });

    it("spy the add method", function() {
        var spy = sinon.spy(myObj, "add");
        var arg1 = 10,
            arg2 = 20;
        myObj.callAnotherFn(arg1, arg2);
        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith(10, 20)).to.be.true;
    });

    it("spy the callback method", function() {
        var callback = sinon.spy();
        myObj.callTheCallback(callback);
        expect(callback.calledOnce).to.be.true;
    });

    it("mock the sayHello method", function() {
        var mock = sinon.mock(myObj);
        var expectation = mock.expects("sayHello");
        expectation.exactly(1);
        expectation.withArgs("Hello world");
        myObj.callAnotherFn(10, 20);
        mock.verify();
    });
});

describe("Test suit for stub", function() {
    afterEach(function() {
        sinon.restore();
    });

    it("Stub the add method", function() {
        var stub = sinon.stub(myObj, "add");
        stub.withArgs(10, 20)
            .onFirstCall()
            .returns(100)
            .onSecondCall()
            .returns(200);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(100);
        expect(myObj.callAnotherFn(10, 20)).to.be.equal(200);
    });
});

describe("Test the promise", function() {
    it("Promise test case", function() {
        this.timeout(7000);
        return expect(myObj.testPromise()).to.eventually.equal(6);
    });
});

describe("XHR test suit", function() {
    it("Mock and stub xhr call", function(done) {
        this.timeout(0);
        const scope = nock("https://postman-echo.com")
            .post("/post")
            .reply(200, { success: true, message: "Post berhasil" });

        myObj
            .xhrFn()
            .then(function(result) {
                console.log(result);
                done();
            })
            .catch(function(err) {
                done(err);
            });
    });
});
