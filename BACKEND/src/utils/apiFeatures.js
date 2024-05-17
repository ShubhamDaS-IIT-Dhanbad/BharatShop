class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        if (this.queryStr.keyword) {
            const keyword = this.queryStr.keyword.trim(); // Remove extra spaces
            const regex = new RegExp(keyword, 'i'); // Construct case-insensitive regex
            this.query = this.query.find({ name: { $regex: regex } });
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
    // Method to filter products by pincode
    filterByPincode() {
        const pincode = this.queryStr.pincode;
        if (pincode) {
            this.query = this.query.find({ pincode: pincode });
        }
        return this;
    }


}

export { ApiFeatures };

