import { mongoose } from "./path"
import { Validator } from "./validator"

class ModelClass {
    findOne = async<T>(schemaModel: mongoose.Model<T>, filterQuery: any, projection: any = {}) => {
        try {
            let data = await schemaModel.findOne(filterQuery, projection)
            if (data) return data
            return null
        }
        catch (err) {
            return null;
        }
    }

    /**
    * Create model of model class
    * //use await using this method
    * @param schemaModel Eg: UserModel || OrderModel
    * @param data req.body
    * @param res
    */

    createModel = async (schemaModel: any, data: object) => {
        try {
            let value = new schemaModel(data);
            await value.save();
            return {
                success: true,
                value
            }
        }
        catch (err) {
            console.log(err);

            if (err.name === "ValidationError") {
                return {
                    success: false,
                    message: Object.values(err.errors)[0]['message'],
                }
            }
        }
    }

    countDocuments = async (schemaModel: any, filterQuery: any) => {
        try {
            let result = await schemaModel.countDocuments(filterQuery,)
            if (result) return result
            return null
        }
        catch (err) {
            return null;
        }
    }

    find = async <T>(schemaModel: any, query: any, projection: any, options: mongoose.QueryOptions<T> = {}) => {
        let { page, limit } = query;
        page = Number(page) || 0;
        limit = Number(limit) || 10;
        const skipLimit = (page > 1 ? page - 1 : 0) * limit;
        delete query.page
        delete query.limit


        let result = await schemaModel.find(query, projection, {
            ...options,
            skip: skipLimit,
            limit: limit,
            // sort: options,
        })
        const total = await this.countDocuments(schemaModel, query);

        return {
            data: result ?? [],
            total: total ?? 0,
        };
    }

     /**
     * Validate model of model class
     @param data req.body
     @param validator Eg: ["phone", "name"] // fields 
     @param res
     */
     validateModel = (data: object, options: Array<String>,) => {
        try {
            Validator.CommonValidtor(...options).validateSync(data, { abortEarly: false, stripUnknown: true });
            return null
        }
        catch (err) {
            let splitVal = err?.errors![0].split(" ")[0]
            return err?.errors![0].replace(splitVal, splitVal)
        }
    }

}

export const Model = new ModelClass()