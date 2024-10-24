import { SetMetadata } from "@nestjs/common";
import { Role } from "src/Auths/rolesEnum";

export const RolesDecorator=(...roles:Role[])=> SetMetadata('roles',roles)
