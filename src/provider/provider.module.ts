import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { CommonProviderModule } from 'src/common';

@Module({
  imports: [
    CommonProviderModule
  ],
  controllers: [ProviderController]
})
export class ProviderModule {}
