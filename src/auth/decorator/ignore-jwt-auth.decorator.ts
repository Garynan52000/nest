import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { JWT_CONSTANTS } from '../const';

export const IgnoreJWT = (): CustomDecorator => SetMetadata(JWT_CONSTANTS.metaKey, true);