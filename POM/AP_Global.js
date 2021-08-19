let globalObjects = function (){

    let until = protractor.ExpectedConditions;
    let random = Math.random().toString(36).substring(2, 7);

     this.getAP = async function (){
        await browser.get("http://automationpractice.com/index.php?controller=authentication&back=my-account");
     }
     
     this.email = function (email){
        return email = "arslanahmed" + random + "@yopmail.com";
     }
    }
module.exports = new globalObjects();
