import Joi from "@hapi/joi";

const RegisterValidationMasyarakat = (data) => {
    const schema = Joi.object({
        nik: Joi.string()
            .min(16)
            .required(),
        nama: Joi.string()
            .min(3)
            .required(),
        username: Joi.string()
            .min(3)
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        telp: Joi.string()
            .min(10)
            .required(),
    })

    return schema.validate(data)
}
export default RegisterValidationMasyarakat;