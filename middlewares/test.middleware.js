function testmiddleware (req, res, next){
    console.log("I am now in the test middleware")
    next()
}

module.exports = testmiddleware; 