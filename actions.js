/*****************************************
 * company routes for BigCo, Inc.
 * 2019-01 mamund
 *****************************************/

var component = require('./simple-component');
var properties = require('./properties');

/*****************************************
 * event handlers for company
 *****************************************/

 module.exports.home = function(req,res) {
  return new Promise(function(resolve,reject) {
    var body = [{
      name:"company",
      rel:"collection",
      href:"http://" + req.headers.host + "/list/"
    }];
    if(body) {
      resolve(body);
    }
    else {
      reject({error:"invalid body"});
    }
  });
}

module.exports.create = function(req,res) {
  return new Promise(function(resolve,reject) {
    if(req.body) {
     var body = req.body;
     resolve(
      component(
        { 
          name:'company',
          action:'add',
          item:body,
          props:properties.props,
          reqd:properties.reqd, 
          enums:properties.enums
        }
       )
     );
    }
    else {
      reject({error:"invalid body"});
    }
  });
};

module.exports.list = function(req,res) {
  return new Promise(function(resolve,reject) {
    resolve(component({name:'company',action:'list'}));
  });
}

module.exports.filter = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.query && req.query.length!==0) {
      resolve(component({name:'company',action:'filter',filter:req.query}));
    }
    else {
      reject({error:"invalid query string"});
    }
  })
}

module.exports.read = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.companyId && req.params.companyId!==null) {
      var id = req.params.companyId;
      resolve(component({name:'company',action:'item',id:id}));
    } 
    else {
      reject({error:"missing id"});
    }
  });
}

module.exports.update = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.companyId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'company',
          action:'update',
          id:id,
          item:body,
          props:properties.props,
          reqd:properties.reqd,
          enums:properties.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.status = function(req,res) {
  var id,body;
  return new Promise(function(resolve,reject){
    id = req.params.companyId||null;
    body = req.body||null;
    if(id!==null && body!==null) {
       resolve(component(
         {name:'company',
          action:'update',
          id:id,
          item:body,
          props:properties.props,
          reqd:properties.reqd,
          enums:properties.enums}));
     }
     else {
       reject({error:"missing id and/or body"});
     }
  });
}

module.exports.remove = function(req,res) {
  return new Promise(function(resolve,reject){
    if(req.params.companyId && req.params.companyId!==null) {
      var id = req.params.companyId;
      resolve(component({name:'company',action:'delete', id:id}));
    }
    else {
      reject({error:"invalid id"});
    }
  });
}
