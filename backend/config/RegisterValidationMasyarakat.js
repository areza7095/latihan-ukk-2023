import Joi from "@hapi/joi";

const RegisterValidationMasyarakat = (data) => {
    const schema = Joi.object({
        nik: Joi.number()
            .required(),
        nama: Joi.string()
            .required(),
        username: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        telp: Joi.number()
            .required(),
    })

    return schema.validate(data)
}
export default RegisterValidationMasyarakat;