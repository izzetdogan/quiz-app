import { SetMetadata } from '@nestjs/common/decorators';

export const PublicGuard = () => SetMetadata('isPublic', true);
//export const PublicRole = () => SetMetadata('role', [UserRole.NORMALü]);
