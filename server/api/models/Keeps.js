"use strict";

/**
 * Keeps
 * @description :: Model for storing Keeps records
 */

module.exports = {
  schema: true,

  attributes: {

    title : {
    	type : 'string',
    	required : true
    },

    desc : {
    	type : 'string',
    	required : true
    },

    color : {
      type : 'string',
      required : true
    },

    toJSON() {
      return this.toObject();
    }
  },

  beforeUpdate: (values, next) => next(),
  beforeCreate: (values, next) => next()
};
