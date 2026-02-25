import { commonSchemas } from './common.schemas';
import { userSchemas } from './user.schemas';

export const schemas = {
  ...commonSchemas,
  ...userSchemas,
};
