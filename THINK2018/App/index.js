const rp = require('request-promise');
var express = require('express')
var app = express()
var ibmdb = require('ibm_db');
const db_url = "DRIVER={DB2};DATABASE=dbname;UID=uid;PWD=pwd;HOSTNAME=1.1.1.1.1;port=1";
console.log("Test program to access DB2 sample database");
const router = express.Router();
var cors = require('cors');
app.use(cors());
var path = require('path');
var request = require('request');
var bearerToken = '';
// working code for connecting to database
app.get('/getuserdetails', function (req, res) {
    var personaldetails = undefined;
    var interest = undefined;
    var request = require('request');
    var personalDetailsArrayObj = undefined;
    console.log("in get user details",+req.query.user_id);
    ibmdb.open(db_url, function(err, conn)
    {
        if(err) {
            console.error("error: ", err.message);
        } else {
            conn.query("select * from  TRAVEL.PIITABLE where userid = "+req.query.user_id, function(err, result, moreResultSets) {
            this.personaldetails= result[0];
            console.log(result[0]);
            conn.close(function(){
                console.log("Connection Closed");
            }); 
        });
        conn.query("select * from  travel.interestTable where userid = "+req.query.user_id, function(err, result1, moreResultSets) {
            this.interest = result1[0];
            console.log(this.interest);
            conn.close(function(){
                console.log("Connection Closed");

            }); 
        });
    }
    });    
})

// for getting discount
app.get('/getdiscount', function (req, res){
	
	var headers = {
    	'authorization': 'Bearer '+bearerToken,
    	'content-type': 'application/json'
	};
    var dataString =undefined;
    console.log("printing user id"+req.query.user_id);
    if(req.query.user_id == 302){
        console.log("in 302");
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[22,0.8334109463412005,"Student","Museum","Music","History"]]}';
    }
    else if(req.query.user_id == 295){
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[45,0.6745019876851721,"accountant","Family","Travel","New York"]]}';
    }
    else{
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[62,0.564405806552872,"retired","Architecture","Walking","Travel"]]}';
    }
	var options = {
    	url: 'https://1.1.1.1/discountscoring',
    	method: 'POST',
    	headers: headers,
    	rejectUnauthorized: false,
    	requestCert: true,
    	body: this.dataString,
        cache : false
	};
	function callback(error, response, body) {
    	if (!error && response.statusCode == 200) {
    		console.log('status is 200')
        	console.log(response.body);
            res.send(response.body);
    	}
    	else
    	{
    		console.log('error'+error);
    	}
	}
	request(options, callback);
})


// for getting background color
app.get('/getbackgroundcolor', function (req, res){
    var request = require('request');

    var headers = {
        'authorization': 'Bearer '+bearerToken,
        'content-type': 'application/json'
    };

    if(req.query.user_id == '302'){
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[22,0.8334109463412005,"Student","Museum","Music","History"]]}';
    }
    else if(req.query.user_id == 295){
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[45,0.6745019876851721,"accountant","Family","Travel","New York"]]}';
    }
    else{
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[62,0.564405806552872,"retired","Architecture","Walking","Travel"]]}';
    }
    var options = {
        url: 'https://1.1.1.1/backgroundscoring',
        method: 'POST',
        headers: headers,
        rejectUnauthorized: false,
        requestCert: true,
        body: this.dataString
    };
    var userinfo = undefined;
    function callback(error, response, body) {
        response1 = JSON.stringify(response);
        console.log(error);
        if (!error && response.statusCode == 200) {
            console.log('status is 200')
            console.log(response.body);
            res.send(response.body);
        }
        else
        {
            console.log('error'+error);
        }
    }
    request(options, callback);
})


// for getting image code
app.get('/getimagecode', function (req, res){
    var request = require('request');
    console.log("in get image code");
    var headers = {
        'authorization': 'Bearer '+bearerToken,
        'content-type': 'application/json'
    };

    if(req.query.user_id == 302){
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[22,0.8334109463412005,"Student","Museum","Music","History"]]}';
    }
    else if(req.query.user_id == 295){
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[45,0.6745019876851721,"accountant","Family","Travel","New York"]]}';
    }
    else{
        this.dataString = '{"fields": ["age", "ActivityScore", "Occupation", "interest1", "interest2", "interest3"],"records":[[62,0.564405806552872,"retired","Architecture","Walking","Travel"]]}';
    }
    var options = {
        url: 'https://1.1.1.1/imagescoring',
        method: 'POST',
        headers: headers,
        rejectUnauthorized: false,
        requestCert: true,
        body: this.dataString
    };
    var userinfo = undefined;
    function callback(error, response, body) {
        response1 = JSON.stringify(response);
        console.log(error);
        if (!error && response.statusCode == 200) {
            console.log('status is 200')
            console.log(response.body);
            res.send(response.body);
        }
        else
        {
            console.log('error'+error);
        }
    }
    request(options, callback);
})
const rp1 = require('request-promise-native');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var url1 = require('url');
function getBearerToken()
{
    return new Promise((resolve,reject) => {
            var optionsbearertoken = {
            method : 'GET',
            url: 'https://1.1.1.1/v1/preauth/validateAuth', //Used to get access token
            auth: {
                'user': '',
                'pass': ''
            },
            //insecure: true,
            rejectAuthorized: false,
            //ecdhCurve: 'auto',
            //strictSSL: false, 
            //requestCert: false
        };

    rp(optionsbearertoken).then(body => {
        
        
        var data = JSON.parse(body);
        // console.log(JSON.stringify(data));
        bearerToken = data.accessToken;

        resolve(bearerToken);
    })
    .catch(err=>{
        console.log(err);
    })
    });
    
}

var http = require('http');
app.get('/', function (req, res) {
    getBearerToken().then( bearTok => {
        // console.log(JSON.stringify(bearTok));
        res.sendFile(path.join(__dirname+'/index.html'));
    });
    //console.log("printing bearTok" +bearerToken);
  
})

app.get('/techinfo.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/techinfo.html'));
})
app.get('/ad_landing_page.html', function (req, res) {
  res.sendFile(path.join(__dirname+'/ad_landing_page.html'));
})
app.get('/sample.js', function (req, res) {
  res.sendFile(path.join(__dirname+'/sample.js'));
})

app.get('/images/IBM_SarahProfile.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/IBM_SarahProfile.png'));
})

app.get('/images/IBM_GordonProfile.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/IBM_GordonProfile.png'));
})
app.get('/images/IBM_MichaelProfile.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/IBM_MichaelProfile.png'));
})

app.get('/styles/main.css', function (req, res) {
  res.sendFile(path.join(__dirname+'/styles/main.css'));
})

app.get('/images/IBM_BG.jpg', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/IBM_BG.jpg'));
})

app.get('/images/buildbg.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/buildbg.png'));
})
app.get('/images/cloud.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/cloud.png'));
})
app.get('/images/DSX_logo.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/DSX_logo.png'));
})
app.get('/images/IBM_EventStore.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/IBM_EventStore.png'));
})
app.get('/images/Image_code1.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/Image_code1.png'));
})
app.get('/images/Image_code2.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/Image_code2.png'));
})
app.get('/images/Image_code3.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/Image_code3.png'));
})
app.get('/images/login_user.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/login_user.png'));
})

app.get('/images/seq1.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/seq1.png'));
})

app.get('/images/seq2.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/seq2.png'));
})
app.get('/images/seq3.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/seq3.png'));
})
app.get('/images/seq5arrow.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/seq5arrow.png'));
})
app.get('/images/seq6.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/seq6.png'));
})
app.get('/images/Step1.png', function (req, res) {
  res.sendFile(path.join(__dirname+'/images/Step1.png'));
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
})

