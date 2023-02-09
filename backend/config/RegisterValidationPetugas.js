import Joi from "@hapi/joi";

const RegisterValidationPetugas = (data) => {
    const schema = Joi.object({
        id_petugas: Joi.number()
            .required(),
        nama_petugas: Joi.string()
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
export default RegisterValidationPetugas;