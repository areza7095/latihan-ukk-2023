import Joi from "@hapi/joi";

const UserLoginValidation = (data) => {
    const schema = Joi.object({
        username: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data)
}
export default UserLoginValidation;