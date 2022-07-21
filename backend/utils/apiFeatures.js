class ApiFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }

   search() {
      const abbos = this.queryStr.abbos
         ? {
              name: { $regex: this.queryStr.abbos },
              $options: "i",
           }
         : {};
      console.log(abbos);
      this.query = this.query.find({ ...abbos });
      return this;
   }
}

module.exports = ApiFeatures;
