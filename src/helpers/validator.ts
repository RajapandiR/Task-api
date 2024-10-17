import * as validate from "yup";

class ValidateClass {
  constructor() {}

  CommonValidtor = (...options: Array<String>) => {
    let returnVal = {};
    options.map((item, i) => {
  
      if (item === "title")
        returnVal["title"] = validate.string().required();
      else returnVal[item.toString()] = validate.string().required();
    });
    return validate.object(returnVal).required();
  };
}



export const Validator = new ValidateClass();
