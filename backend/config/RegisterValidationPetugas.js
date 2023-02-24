import Joi from "@hapi/joi";

const RegisterValidationPetugas = (data) => {
    const schema = Joi.object({
        nama_petugas: Joi.string()
            .required(),
        username: Joi.string()
            .required(),
        password: Joi.string()
            .min(6)
            .required(),
        telp: Joi.number()
            .required(),
        level: Joi.string()
            .required(),
    })

    return schema.validate(data)
}
export default RegisterValidationPetugas;