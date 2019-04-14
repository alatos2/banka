import joi from 'joi';

exports.validateAccount = (account) => {
  const accountSchema = {
    accountNumber: joi.number(),
    type: joi.string().valid('saving', 'current'),
    openingBalance: joi.number(),
    status: joi.string().valid('draft', 'activate', 'dormant'),
  };

  return joi.validate(account, accountSchema);
};

exports.validateUpdate = (update) => {
  const updateSchema = {
    status: joi.string().valid('draft', 'activate', 'dormant'),
  };

  return joi.validate(update, updateSchema);
};