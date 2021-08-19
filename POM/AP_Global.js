let globalObjects = function (){

    let until = protractor.ExpectedConditions;

    this.randomNumber = function (length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJK LMNOPQR STUVWXYZabc defgh ijklmnop qrstuvw xyz0123456789#$%^&*()_+';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
    }
module.exports = new globalObjects();
