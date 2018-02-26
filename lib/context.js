// Persist user context during sessions
// handles "question & answer" abilities
// Also logs usage telemetry for UX/VX evaluation & improvements

var AWS = require('aws-sdk');
const tableUser = {
	    TableName : "sonar-bot-db",
	    KeySchema: [       
	        { AttributeName: "UserID", KeyType: "HASH"},  //Partition key
	        { AttributeName: "State", KeyType: "RANGE" }  //Sort key
	    ],
	    AttributeDefinitions: [       
	        { AttributeName: "UserID", AttributeType: "S" },
	        { AttributeName: "State", AttributeType: "S" }
	    ],
	    ProvisionedThroughput: {       
	        ReadCapacityUnits: 10, 
	        WriteCapacityUnits: 10
	    }
	};
const tableLog = {
	    TableName : "sonar-bot-log",
	    KeySchema: [       
	        { AttributeName: "UserID+Timestamp", KeyType: "HASH"},  //Partition key
	        { AttributeName: "Time", KeyType: "RANGE" }  //Sort key
	    ],
	    AttributeDefinitions: [       
	        { AttributeName: "UserID+Timestamp", AttributeType: "S" },
	        { AttributeName: "Time", AttributeType: "N" }
	    ],
	    ProvisionedThroughput: {       
	        ReadCapacityUnits: 10, 
	        WriteCapacityUnits: 10
	    }
	};;




const dynamodb = new AWS.DynamoDB.DocumentClient();

// Useful for local development
function setupDB() {
	const db = new AWS.DynamoDB;
	
	AWS.config.update({
	  region: "us-west-2",
	  endpoint: "http://localhost:8000"
	});

	db.createTable(tableUser, function(err, data) {
	    if (err) {
	        console.error("Unable to create " + tableUser.TableName + " . Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("Created table " + tableUser.TableName + ". Table description JSON:", JSON.stringify(data, null, 2));
	    }
	});	

	db.createTable(tableLog, function(err, data) {
	    if (err) {
	        console.error("Unable to create table " + tableLog.TableName + ". Error JSON:", JSON.stringify(err, null, 2));
	    } else {
	        console.log("Created table " + tableLog.TableName + ". Table description JSON:", JSON.stringify(data, null, 2));
	    }
	});	
}

function restoreCtx(sender)//Function will be used later to restore database information for the user that accesses the bot.
{
  console.log("Trying to restore context for sender", sender);

  var params = {
    TableName: tableUser.TableName,
    Key: {
      'UserID': sender
    }
  };

  return dynamodb.get(params).promise();
}

function persistCtx(sender, state) // This is used later to repopulate the database with user information
{
  console.log("Persisting context for sender", sender);

  var params = {
      TableName: tableUser.TableName,
      Item:{
          'UserID': sender,
          'State': state // this is used for persistence. The bot interacts differently with users depending on whether their state is start or fire/trash/map
      }
  };

  return dynamodb.put(params).promise();
}

function trackUsage(timeInMs, senderTime, sender, state, request, response, platform) //Very similar to the persist function, but used to log each user interaction
{
  var params = {
      TableName: tableLog.TableName,
      Item:{
          'UserID+Timestamp': senderTime,
          'Time': timeInMs,
          'UserID': timeInMs,
          'State': state,
          'Request': request,
          'Response': response,
          'Platform': platform
      }
  };

  return dynamodb.put(params).promise();
}


module.exports = {setupDB, persistCtx, restoreCtx, trackUsage}