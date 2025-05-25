const Joi = require("joi");
const { Article } = require("../models");
const fs = require("fs");
const path = require("path");
const { Op } = require("sequelize");
const { create } = require("domain");

module.exports = {
  getAll: async (req, h) => {
    try {
      const articles = await Article.findAll();
      return h
        .response({
          status: "Success",
          message: "Article Has Been Loaded",
          data: articles,
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
      const article = await Article.findByPk(req.params.id, {
        attributes: { exclude: ["password"] },
      });
      if (!article)
        return h
          .response({
            status: "Success",
            message: { errors: "Article not found" },
          })
          .code(404);
      return h
        .response({
          status: "Success",
          message: "Article Successfully Found",
          data: article,
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
        description: Joi.string().min(5).required(),
        keyword: Joi.string().min(2).required(),
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
      const existing = await Article.findOne({ where: { name: value.name } });
      if (existing) {
        return h
          .response({
            status: "Failed",
            message: { errors: "Article already exists" },
          })
          .code(409);
      }
      const article = await Article.create({
        name: value.name,
        description: value.description,
        keyword: value.keyword,
        content: value.content,
      });
      return h
        .response({
          status: "Success",
          message: "Article Created Successfully",
          data: article,
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
        description: Joi.string().min(5).required(),
        keyword: Joi.string().min(2).required(),
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
      const article = await Article.findByPk(req.params.id);
      if (!article)
        return h
          .response({
            status: "Failed",
            message: { errors: "Article not found" },
          })
          .code(404);
      const existing = await Article.findOne({
        where: {
          name: value.name,
          id: { [Op.ne]: req.params.id },
        },
      });
      if (existing)
        return h
          .response({
            status: "Failed",
            message: { errors: "Article already exists" },
          })
          .code(409);
      await article.update(value);
      return h
        .response({
          status: "Success",
          message: "Article Updated Successfully",
          data: article,
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
      const article = await Article.findByPk(req.params.id);
      if (!article)
        return h
          .response({
            status: "Failed",
            message: { errors: "Article not found" },
          })
          .code(404);
      await article.destroy();
      return h
        .response({
          status: "Success",
          message: "Article Deleted Successfully",
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
