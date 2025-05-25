const Joi = require("joi");
const { Contact } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  getAll: async (req, h) => {
    try {
      const contacts = await Contact.findAll();
      return h
        .response({
          status: "Success",
          message: "Contact Has Been Loaded",
          data: contacts,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  getById: async (req, h) => {
    try {
      const contact = await Contact.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });
      if (!contact)
        return h
          .response({
            status: "Success",
            message: { errors: "Contcat not found" },
          })
          .code(404);
      return h
        .response({
          status: "Success",
          message: "Contcat Successfully Found",
          data: contact,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  create: async (req, h) => {
    try {
      const { payload } = req;
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        content: Joi.string().min(10).required(),
      });
      const { error, value } = schema.validate(payload, {
        abortEarly: false,
        allowUnknown: true,
      });
      if (error) {
        const messages = error.details.map((err) =>
          err.message.replace(/\"/g, "")
        );
        return h
          .response({ status: "Failed", message: { errors: messages } })
          .code(422);
      }
      const contact = await Contact.create({
        name: value.name,
        email: value.email,
        content: value.content,
      });
      return h
        .response({
          status: "Success",
          message: "Contact Created Successfully",
          data: contact,
        })
        .code(201);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },

  update: async (req, h) => {
    try {
      const { payload } = req;
      const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        content: Joi.string().min(10).required(),
      });
      const { error, value } = schema.validate(payload, {
        abortEarly: false,
        allowUnknown: true,
      });
      if (error) {
        const messages = error.details.map((err) =>
          err.message.replace(/\"/g, "")
        );
        return h
          .response({ status: "Failed", message: { errors: messages } })
          .code(422);
      }

      const contact = await Contact.findByPk(req.params.id);
      if (!contact)
        return h
          .response({
            status: "Failed",
            message: { errors: "Contact not found" },
          })
          .code(404);

    //   if (value.email !== contact.email) {
    //     const existing = await Contact.findOne({ where: { email: value.email } });
    //     if (existing) {
    //       return h
    //         .response({
    //           status: "Failed",
    //           message: { error: "Email already used by another data" },
    //         })
    //         .code(409);
    //     }
    //   }

      await contact.update(value);
      return h
        .response({
          status: "Success",
          message: "Contact Updated Successfully",
          data: contact,
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },
  delete: async (req, h) => {
    try {
      const contact = await Contact.findByPk(req.params.id);
      if (!contact)
        return h
          .response({
            status: "Failed",
            message: { errors: "Contact not found" },
          })
          .code(404);
      await contact.destroy();
      return h
        .response({
          status: "Success",
          message: "Contact Deleted Successfully",
        })
        .code(200);
    } catch (err) {
      return h
        .response({
          status: "Failed",
          message: { error: "Internal server error" },
        })
        .code(500);
    }
  },
};
