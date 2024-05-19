
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr && this.queryStr.keyword) {
          const keyword = this.queryStr.keyword.trim();
          const regex = new RegExp(keyword, 'i');
          this.query = this.query.find({
            $or: [
              { title: { $regex: regex } },
              { description: { $regex: regex } },
              { categories: { $in: [keyword] } }
            ]
          });
        }
        return this;
      }
      
      

    filter() {
        const queryCopy = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        for (const key in queryCopy) {
            if (!isNaN(parseInt(queryCopy[key]))) {
                queryCopy[key] = parseInt(queryCopy[key]);
            }
        }
        return this;
    }
    pagination(resultPerPage) {
        const currentPage = parseInt(this.queryStr.page) || 1;
        const limit = parseInt(this.queryStr.limit) || resultPerPage;
        const skip = (currentPage - 1) * limit;

        this.query = this.query.skip(skip).limit(limit);

        return this;
    }
    // filter by category
    filterByCategory() {
        const categories = this.queryStr.categories;
        if (categories) {
            const categoryArray = categories.split(',').map(category => category.trim());
            this.query = this.query.find({ category: { $elemMatch: { $in: categoryArray } } });
        }
        return this;
    }
    
    //filter by pincode
    filterByPincode() {
        const pincodes = this.queryStr.pincode;
        if (pincodes) {
            const pincodeArray = pincodes.split(',').map(pin => pin.trim());
            this.query = this.query.find({ pinCodes: { $elemMatch: { $in: pincodeArray } } });
        }
        return this;
    } 

    //filter by shop id
    filterByShop(shop) {
        const shopId = this.queryStr.shop;
        if (shopId) {
            this.query = this.query.find({ shop: shopId });
        }
        return this;
    }
}
export { ApiFeatures };

